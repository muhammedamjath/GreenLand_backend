const { default: mongoose } = require("mongoose");
const componyRegCollection = require("../models/componyRegister");
const clientSignupSchema = require("../models/userSignup");
const deleteImageFromS3 = require("../middleware/multer");
const notificationCollection = require("../models/notification");
const { GetBucketLoggingCommand } = require("@aws-sdk/client-s3");
const emailContent = require("../utilities/emailContent");
const nodemailer = require("../utilities/otp");
const workHistoryCollections = require("../models/workHistory");
const { assign } = require("nodemailer/lib/shared");

// get user detailes
exports.getUser = async (req, res) => {
  userId = req.user;
  const userData = await clientSignupSchema
    .findById(userId.id)
    .select("-password");
  if (userData) {
    const messages = await notificationCollection.find({
      contractorId: new mongoose.Types.ObjectId(userId),
    });
    res.status(200).json({ userData: userData, messages: messages });
  } else {
    res.status(401).json({ message: "no userData fount" });
  }
};

// compony registration post
exports.componyReg = async (req, res) => {
  const userId = req.user;
  const file = req.file;
  const { componyName, location, category, discription } = req.body;

  let componyReg = new componyRegCollection({
    componyName: componyName,
    location: location,
    category: category,
    discription: discription,
    image: file.location,
    imageKey: file.key,
    contractorId: new mongoose.Types.ObjectId(userId),
  });

  await componyReg.save();

  res.status(200).json("success");
};

// registerd compony detailes get in
exports.componyDetailesGet = async (req, res) => {
  const userId = req.user;
  const componys = await componyRegCollection.find({
    contractorId: new mongoose.Types.ObjectId(userId),
  });
  res.status(200).json({ datas: componys });
};

// single compony detailes get
exports.singleComponyDetailes = async (req, res) => {
  const componyId = req.params.id;
  const componyData = await componyRegCollection.findById(componyId);
  if (componyData) {
    res.status(200).json(componyData);
  }
};

// update compony
exports.updatecompony = async (req, res) => {

  const id = req.query.id;
  const file = req.file;
  const { componyName, location, category, discription } = req.body;
  const userId = req.user;

  const componyDetailes = await componyRegCollection.findById(id);
  if (componyDetailes) {
    if (!file) {
      const update = await componyRegCollection.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $set: {
            componyName: componyName,
            location: location,
            category: category,
            discription: discription,
          },
        },
        { new: true }
      );
      if (update) {
        res.status(200).json("updated successfully without photo");
      }
    } else {
      if (componyDetailes.imageKey) {
        deleteImageFromS3.deleteImageFromS3(
          file.bucket,
          componyDetailes.imageKey
        );
      }
      const update = await componyRegCollection.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $set: {
            image: file.location,
            imageKey: file.key,
            componyName: componyName,
            location: location,
            category: category,
            discription: discription,
          },
        },
        { new: true }
      );
      if (update) {
        res.status(200).json("updated successfully");
      }
    }
  }
};

// profile image update
exports.changeProfileImage = async (req, res) => {
  const userId = req.user.id;
  const file = req.file;
  const user = await clientSignupSchema.findById(userId);
  if (user) {
    if (user.imageKey) {
      deleteImageFromS3.deleteImageFromS3(file.bucket, user.imageKey);
    }
    const updatedData = await clientSignupSchema.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      {
        $set: {
          image: file.location,
          imageKey: file.key,
        },
      },
      { new: true }
    );

    if (updatedData) {
      res.status(200).json(updatedData);
    }
  }
};

// single notification get
exports.singleNotificationGet = async (req, res) => {
  const notificatioId = req.query.id;
  const notificationData = await notificationCollection.findById(notificatioId);
  const userData = await clientSignupSchema.findById(notificationData.userId);
  const componyData = await componyRegCollection.findById(
    notificationData.componyId
  );

  res
    .status(200)
    .json({
      userData: userData,
      componyData: componyData,
      notificationData: notificationData,
    });
};

// sent email when the connection reaqust has been acceptrd
exports.connectedEmailSent = async (req, res) => {
  const { notificationId, custemerData, componyData } = req.body;
  const userName = custemerData.name;
  const companyName = componyData.componyName;
  const workCategory = componyData.category;
  try {
    const notificationUpdate = await notificationCollection.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(notificationId) },
      {
        $set: {
          status: "mailed",
        },
      },
      { new: true }
    );

    // change the status in workHistory
    const workHistoryData = await workHistoryCollections.findOneAndUpdate(
      {
        userId: new mongoose.Types.ObjectId(custemerData._id),
        componyId: new mongoose.Types.ObjectId(componyData._id),
      },
      {
        $set: {
          status: "Accepted",
        },
      }
    );

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: custemerData.email,
      subject: "Request accepted",
      html: emailContent.connectionApprovalMail(
        userName,
        companyName,
        workCategory
      ),
    };
    nodemailer.sentEmailOtp(mailOptions);
    if (notificationUpdate) {
      res.status(200).json(notificationUpdate);
    }
  } catch (err) {
    console.log(err);
  }
};

// task update
exports.taskUpdate = async (req, res) => {
  const { id, date, discription } = req.body;
  try {
    const updatedatask = await workHistoryCollections.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          workUpdates: {
            date: date,
            discription: discription,
          },
        },
      },
      { new: true }
    );
    if (updatedatask) {
      const taskCheck = await workHistoryCollections.findById(id);
      if (taskCheck.workUpdates.length > 0 && taskCheck.status != "started") {
        // status updating
        const statusUpdate = await workHistoryCollections.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              status: "started",
            },
          }
        );
      }
      res.status(200).json(updatedatask);
    } else {
      res.status(200).json("pls try again");
    }
  } catch (err) {
    console.log(err);
  }
};

// delete task
exports.deleteTask = async (req, res) => {
  const { id, objectId } = req.body;

  try {
    const deleteData = await workHistoryCollections.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(objectId) },
      {
        $pull: {
          workUpdates: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
      },
      { new: true }
    );
    if (deleteData) {
      res.status(200).json("deleted");
    }
  } catch (err) {
    console.log(err);
  }
};

// contract detailes update
exports.contrctDetailes = async (req, res) => {
  const { id, totalArea, contractAmount, workDuration, startDate } = req.body;
  try {
    const addDetailes = await workHistoryCollections.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          area: totalArea,
          amount: contractAmount,
          duration: workDuration,
          startDate: startDate,
        },
      },
      { new: true }
    );
    if (addDetailes) {
      res.status(200).json("updated");
    }
  } catch (err) {
    console.log(err);
  }
};

// cinfirmation emailsent from full work view
exports.confirmEmailSent = async (req, res) => {
  const { userData, componyData } = req.body;
  try {
    const notificationUpdate = await notificationCollection.findOneAndUpdate(
      {
        userId: new mongoose.Types.ObjectId(userData._id),
        componyId: new mongoose.Types.ObjectId(componyData._id),
      },
      {
        $set: {
          status: "mailed",
        },
      },
      { new: true }
    );

    // change the status in workHistory
    const workHistoryData = await workHistoryCollections.findOneAndUpdate(
      {
        userId: new mongoose.Types.ObjectId(userData._id),
        componyId: new mongoose.Types.ObjectId(componyData._id),
        status: "requsted",
      },
      {
        $set: {
          status: "Accepted",
        },
      }
    );

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userData.email,
      subject: "Request accepted",
      html: emailContent.connectionApprovalMail(
        userData.name,
        componyData.componyName,
        componyData.category
      ),
    };
    nodemailer.sentEmailOtp(mailOptions);
    if (notificationUpdate) {
      res.status(200).json("mailed");
    }
  } catch (err) {}
};

// project completed update
exports.projectCompleted = async (req,res)=>{
  const projectId = req.body.id
  try{
    const updatedatask = await workHistoryCollections.findOneAndUpdate(
      {_id:new mongoose.Types.ObjectId(projectId)},
      {
        $set:{
          status:'completed'
        }
      },{new:true}
    )

    if(updatedatask){
      res.status(200).json('work completed')
    }
  }
  catch(err){
    console.log(err);
  }
}
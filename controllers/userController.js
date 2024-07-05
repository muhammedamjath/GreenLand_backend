const componyRegCollection = require("../models/componyRegister");
const clientSignupSchema = require("../models/userSignup");
const deleteImageFromS3 = require("../middleware/multer");
const notificationCollection = require("../models/notification");
const { default: mongoose } = require("mongoose");
const emailContent = require("../utilities/emailContent");
const moment = require("moment");
const nodemailer = require("../utilities/otp");
const workHistoryCollections = require ('../models/workHistory')

exports.getAllComponys = async (req, res) => {
  const componys = await componyRegCollection.find();
  if (componys) {
    res.status(200).json(componys);
  } else {
    res.status(403).json({ message: "data not found" });
  }
};

// notification saving
exports.notification = async (req, res) => {
  const componyId = req.query.id;
  const userId = req.user.id;
  let contractorId;
  let userName;
  let componyName;
  let contractorName;
  let requestDate;
  let email;

  const user = await clientSignupSchema.findById(userId);
  if (user) {
    userName = user.name;
  }

  const componyDetailes = await componyRegCollection.findById(componyId);
  if (componyDetailes) {
    contractorId = componyDetailes.contractorId;
    componyName = componyDetailes.componyName;
  }

  const contractor = await clientSignupSchema.findById(contractorId);
  if (contractor) {
    contractorName = contractor.name;
    email = contractor.email;
  }

  const saveNotification = new notificationCollection({
    userId: new mongoose.Types.ObjectId(userId),
    contractorId: new mongoose.Types.ObjectId(contractorId),
    componyId: new mongoose.Types.ObjectId(componyId),
  });

  const toHistory = new workHistoryCollections({
    userId: new mongoose.Types.ObjectId(userId),
    contractorId: new mongoose.Types.ObjectId(contractorId),
    componyId: new mongoose.Types.ObjectId(componyId),
  });

  await toHistory.save()

  if (saveNotification) {
    await saveNotification.save();
    const date = saveNotification.createdAt;
    requestDate = moment(date).format("Do MMMM YYYY");

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Connection requist",
      html: emailContent.connectionRequestMail(
        contractorName,
        userName,
        componyName,
        requestDate
      ),
    };

    nodemailer.sentEmailOtp(mailOptions);
    res.status(200).json(saveNotification);
  } else {
    res.status(403).json({ message: "pls try again" });
  }
};

// notification detailes  get for user side and contractor side
exports.notificationGet = async (req, res) => {
  const componyId = req.query.id;
  const userId = req.user.id;
  if (componyId == "false") {
    const notificationData = await notificationCollection.find({
      contractorId: new mongoose.Types.ObjectId(userId),
    });
    if (notificationData.length != 0) {
      const notificationWithUser = await notificationCollection.aggregate([
        {
        $match:{contractorId:new mongoose.Types.ObjectId(userId),status: { $ne: "messaged" }},
        },
        {
            $lookup : {
                from:'clientsignups',
                localField:"userId",
                foreignField:"_id",
                as:'userData'
            }   
        },
        {
          $sort: {
            status: -1,
          },
        },
      ])
      let obj = []
      for (let data of notificationWithUser){
        let object ={
            date:moment(data.createdAt).format("Do MMMM YYYY"),
            ...data
        }
        obj.push(object)
      }
      res.status(200).json(obj);
    } else {
      res.status(200).json(null);
    }
  }
  // for user side
  else {
    const notificationData = await notificationCollection.find({
      userId: new mongoose.Types.ObjectId(userId),
      componyId: new mongoose.Types.ObjectId(componyId),
    });
    if (notificationData.length != 0) {
      res.status(200).json(notificationData[0]);
    } else {
      res.status(200).json(null);
    }
  }
};

// history get in contractor side and user side
exports.workhistory = async (req,res)=>{
  const userId = req.user.id
  const user = await clientSignupSchema.findById(userId)
  if(user.category == 'contractor'){
    const history = await workHistoryCollections.aggregate([
      {
        $match:{contractorId:new mongoose.Types.ObjectId(userId)},
      },
      {
        $lookup:{
          from:'clientsignups',
          localField:"userId",
          foreignField:"_id",
          as:'userData'
        }
      },
      {
        $lookup:{
          from:'registeredcomponys',
          localField:"componyId",
          foreignField:"_id",
          as:'componyData'
        }
      }
    ])
    console.log(history);
    res.status(200).json(history)
  }else if(user.category == 'user'){
    const history = await workHistoryCollections.aggregate([
      {
        $match:{userId:new mongoose.Types.ObjectId(userId)},
      },
      {
        $lookup:{
          from:'registeredcomponys',
          localField:"componyId",
          foreignField:"_id",
          as:'componyData'
        }
      }
    ])
    res.status(200).json(history)
  }
}
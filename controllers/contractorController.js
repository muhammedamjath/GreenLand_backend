const { default: mongoose } = require("mongoose");
const componyRegCollection = require("../models/componyRegister");
const clientSignupSchema = require("../models/userSignup");
const deleteImageFromS3=require('../middleware/multer')
const notificationCollection= require('../models/notification');


// get user detailes
exports.getUser = async (req, res) => {
  userId = req.user;
  const userData = await clientSignupSchema.findById(userId.id);
  if (userData) {
    const messages= await notificationCollection.find({contractorId:new mongoose.Types.ObjectId(userId)})
    res.status(200).json({userData:userData,messages:messages});
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
    imageKey:file.key,
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
      if(componyDetailes.imageKey){
      deleteImageFromS3.deleteImageFromS3(file.bucket,componyDetailes.imageKey)
      }
      const update = await componyRegCollection.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        {
          $set: {
            image: file.location,
            imageKey:file.key,
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
  console.log(req.file);
  const user = await clientSignupSchema.findById(userId);
  if (user) {
    if(user.imageKey){
      deleteImageFromS3.deleteImageFromS3(file.bucket,user.imageKey)
    }
    const updatedData = await clientSignupSchema.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      {
        $set: {
          image: file.location,
          imageKey:file.key
        },
      },
      { new: true }
    );

    if (updatedData) {

      res.status(200).json(updatedData);
    }
  
  }
};

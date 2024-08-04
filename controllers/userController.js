
const { default: mongoose } = require("mongoose");
const moment = require("moment");

// user defined modules
const deleteImageFromS3 = require("../middleware/multer");
const clientSignupSchema = require("../models/userSignup");
const componyRegCollection = require("../models/componyRegister");
const notificationCollection = require("../models/notification");
const emailContent = require("../utilities/emailContent");
const nodemailer = require("../utilities/otp");
const workHistoryCollections = require ('../models/workHistory')

// get all componys in user side
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
  console.log('helooooooooooo');
  
  const componyId = req.query.id;
  console.log('this is compony id:',componyId);
  
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

  // notification saving
  const saveNotification = new notificationCollection({
    userId: new mongoose.Types.ObjectId(userId),
    contractorId: new mongoose.Types.ObjectId(contractorId),
    componyId: new mongoose.Types.ObjectId(componyId),
  });

  // history saving
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
      subject: "Connection request",
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
      },
      {
        $lookup:{
          from:'clientsignups',
          localField:"userId",
          foreignField:"_id",
          as:'userData'
        }
      }
    ])
    res.status(200).json(history)
  }
}

// location update
exports.locationUpdate = async (req,res)=>{
  const {componyId,district,placeOfWork,phoneNumber} = req.body

  const userId = req.user.id
  
 try{
  const workHistoryData = await workHistoryCollections.findOneAndUpdate(
    {userId:new mongoose.Types.ObjectId(userId),componyId:new mongoose.Types.ObjectId(componyId)},
    {
      $set:{
        district:district,
        place:placeOfWork,
        mobNo:phoneNumber
      }
    }
  )
  if(workHistoryData){
    res.status(200).json('saved')
  }
 }catch(err){
  console.log(err);
 }
}

// work history get 
exports.workhistoryGet= async (req,res)=>{
  const userId = req.user.id
  const ObjectId = req.query.id
  const user = await clientSignupSchema.findById(userId)
  try{
    const history = await workHistoryCollections.aggregate([
      {
        $match:{_id:new mongoose.Types.ObjectId(ObjectId)},
      },
      {
        $lookup:{
          from:'registeredcomponys',
          localField:"componyId",
          foreignField:"_id",
          as:'componyData'
        }
      },
      {
        $lookup:{
          from:'clientsignups',
          localField:"userId",
          foreignField:"_id",
          as:'userData'
        }
      }
    ])
    if(history){
      res.status(200).json(history)
    }else{
      res.status(401).json('userd data not fount')
    }
  }
  catch(err){
    console.log(err);
  }

}

// generate  project  pdf
exports.generateInvoice = async (req,res)=>{
  const projectDetailes  = await workHistoryCollections.findById(req.query.id)
   
  const contractorData = await clientSignupSchema.findById(projectDetailes.contractorId)

  res.status(200).json(contractorData)

}

// reviwe post
exports.reviewPost = async (req,res)=>{
  console.log(req.body);
  const {userId,componyId,review,projectId}=req.body
  try{
    const reviewUpdate = await componyRegCollection.findOneAndUpdate(
      {_id:new mongoose.Types.ObjectId(componyId)},
      {
        $push:{
          reviews:{
            projectId:new mongoose.Types.ObjectId(projectId),
            userId:new mongoose.Types.ObjectId(userId),
            starCount:review.rating,
            discription:review.comment
          }
        }
      }
    )
    if(reviewUpdate){
      res.status(200).json()
    }
  }
  catch(err){
    console.log(err);
  }
  
}

// reviews get 
exports.reviewsGet =async (req,res)=>{
  const id = req.query.id
  console.log(id);
  const componyReviews = await componyRegCollection.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) }
    },
    {
      $unwind: '$reviews' // Deconstructs the reviews array
    },
    {
      $lookup: {
        from: 'clientsignups',
        localField: 'reviews.userId',
        foreignField: '_id',
        as: 'userData'
      }
    },
    {
      $unwind: '$userData' // Deconstructs the userData array to a single document
    },
    {
      $project: {
        _id: 0, // Exclude the default _id field
        reviewId: '$reviews._id',
        userId: '$reviews.userId',
        starCount: '$reviews.starCount',
        reviewDescription: '$reviews.discription',
        'userData.name': 1,
        'userData.image': 1,
      }
    }
  ]);
  
  if(componyReviews){
    res.status(200).json(componyReviews)
  }

}


// get all compony data to home page
exports.getAllComponysToHome = async (req,res)=>{
  const componyData = await componyRegCollection.find({},{discription:0,contractorId:0,imageKey:0,reviews:0})
  res.status(200).json(componyData)
}
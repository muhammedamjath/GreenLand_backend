const componyRegCollection = require("../models/componyRegister");
const clientSignupSchema = require("../models/userSignup");
const deleteImageFromS3=require('../middleware/multer')
const notificationCollection= require('../models/notification');
const { default: mongoose } = require("mongoose");


exports.getAllComponys=async(req,res)=>{
    const componys= await componyRegCollection.find()
    if(componys){
        res.status(200).json(componys)
    }else{
        res.status(403).json({message:'data not found'})
    }
}

// notification saving
exports.notification = async(req,res)=>{
    const componyId=req.query.id;
    const userId=req.user
    let contractorId;

    const componyDetailes= await componyRegCollection.findById(componyId)
    if(componyDetailes){
        contractorId=componyDetailes.contractorId
    }

    const saveNotification= new  notificationCollection({
        userId:new mongoose.Types.ObjectId(userId),
        contractorId:new mongoose.Types.ObjectId(contractorId),
        componyId:new mongoose.Types.ObjectId(componyId),
    })

    if(saveNotification){
        await saveNotification.save()
        res.status(200).json(saveNotification)
    }else{
        res.status(403).json({message:'pls try again'})
    }
}

// notification get
exports.notificationGet=async(req,res)=>{
    const componyId=req.query.id
    const userId=req.user
    const notificationData =  await notificationCollection.find({userId:new mongoose.Types.ObjectId(userId),componyId:new mongoose.Types.ObjectId(componyId)})
    if(notificationData.length != 0){
        res.status(200).json(notificationData[0])
    }else{
       res.status(200).json(null)
    }
}
const { default: mongoose } = require('mongoose');
const chatModel= require('../models/chat')
const clientSignupSchema = require("../models/userSignup");
const notificationCollection = require('../models/notification');


// chat post
exports.chatPost=async (req,res)=>{
   const {sender,receiver,message,componyId}=req.body
   const userId=req.user.id
   const userData= await clientSignupSchema.findById(userId)
   const notificationUpdate = await notificationCollection.findOneAndUpdate(
    {contractorId:new mongoose.Types.ObjectId(sender),userId:new mongoose.Types.ObjectId(receiver),componyId:new mongoose.Types.ObjectId(componyId)},
    {
        $set:{
            status:'messaged'
        }
    }
   )
   if(userData.category == 'contractor'){

    const chatUpdate = await chatModel.findOneAndUpdate(
        {contractorId:new mongoose.Types.ObjectId(sender),userId:new mongoose.Types.ObjectId(receiver),componyId:new mongoose.Types.ObjectId(componyId)},
        {
            $push:{
                messages:{
                    sender:new mongoose.Types.ObjectId(sender),
                    receiver: new mongoose.Types.ObjectId(receiver),
                    message:message
                }
            }
        },
        {new:true , upsert:true}
    )
   }else if(userData.category == 'user'){
    const chatUpdate = await chatModel.findOneAndUpdate(
        {contractorId:new mongoose.Types.ObjectId(receiver),userId:new mongoose.Types.ObjectId(sender),componyId:new mongoose.Types.ObjectId(componyId)},
        {
            $push:{
                messages:{
                    sender:new mongoose.Types.ObjectId(sender),
                    receiver: new mongoose.Types.ObjectId(receiver),
                    message:message
                }
            }
        },
        {new:true , upsert:true}
    )
   }
} 


// chat userList get
exports.getChatList= async(req,res)=>{

    const userId =req.user.id
   const userData= await clientSignupSchema.findById(userId)
   if(userData.category == 'user'){
    const chatList = await chatModel.aggregate([
        {
            $match:{userId:new mongoose.Types.ObjectId(userId)}
        },
        {
            $lookup:{
                from:'registeredcomponys',
                localField:'componyId',
                foreignField:'_id',
                as:'senderData'
            }
        },
        {
            $project: {
                messages: 0 
            }
        }
    ])
        res.status(200).json(chatList)
   }else if (userData.category == 'contractor'){
    const chatList = await chatModel.aggregate([
        {
            $match:{contractorId:new mongoose.Types.ObjectId(userId)}
        },
        {
            $lookup:{
                from:'clientsignups',
                localField:'userId',
                foreignField:'_id',
                as:'senderData'
            }
        },
        {
            $project: {
                messages: 0 
            }
        }
    ])
        res.status(200).json(chatList)
   }

} 

// chat history get
exports.chatHistoryGet=async(req,res)=>{
    const userId= req.user.id
    const {componyId , sender , receiver} = req.body

    const user = await clientSignupSchema.findById(userId)

    if(user.category == 'contractor'){
        const chatHitory = await chatModel.find({
            componyId:new mongoose.Types.ObjectId(componyId),
            userId:new mongoose.Types.ObjectId(receiver),
            contractorId:new mongoose.Types.ObjectId(sender)
            })
            if(chatHitory){
                res.status(200).json(chatHitory)
            }
            
    }else if (user.category == 'user'){
        const chatHitory = await chatModel.find({
            componyId:new mongoose.Types.ObjectId(componyId),
            userId:new mongoose.Types.ObjectId(sender),
            contractorId:new mongoose.Types.ObjectId(receiver)
            })
            if(chatHitory){
                res.status(200).json(chatHitory)
            }
    }else{
        res.status(401).json({message:'user not fount'})
    }
}

// receiver data
exports.receiverData = async (req,res)=>{
    const receiverId = req.query.id
    const receiverData = await clientSignupSchema.findById(receiverId,{ password:0});
    if(receiverData){
        res.status(200).json(receiverData)
    }
}
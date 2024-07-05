const express = require('express')
const clientRouter=express.Router()
const jwtAuthentication=require('../middleware/jwtAuthentication')

const contractorController=require('../controllers/contractorController')
const multer=require('../middleware/multer')
const userController=require('../controllers/userController')
const chatController= require('../controllers/chatController')


clientRouter.post('/componyRegistration',jwtAuthentication,multer.upload.single('image'),contractorController.componyReg)
clientRouter.get('/registeredCompnys',jwtAuthentication,contractorController.componyDetailesGet)
clientRouter.get('/getSigleComponyDetailes/:id',jwtAuthentication,contractorController.singleComponyDetailes)
clientRouter.post('/updateCompony',jwtAuthentication,multer.upload.single('image'),contractorController.updatecompony)
clientRouter.get('/getUser',jwtAuthentication,contractorController.getUser)
clientRouter.post('/profilePhotoUpdate',jwtAuthentication,multer.upload.single('image'),contractorController.changeProfileImage)
clientRouter.get('/getAllCompony',jwtAuthentication,userController.getAllComponys)
clientRouter.post('/notification',jwtAuthentication,userController.notification)
clientRouter.get('/notificationGet',jwtAuthentication,userController.notificationGet)
clientRouter.get('/singleNotificationGet',jwtAuthentication,contractorController.singleNotificationGet)
clientRouter.post('/approvedEmail',jwtAuthentication,contractorController.connectedEmailSent)
clientRouter.post('/chatPost',jwtAuthentication,chatController.chatPost)
clientRouter.get('/chatList',jwtAuthentication,chatController.getChatList)
clientRouter.post('/chatHistory',jwtAuthentication,chatController.chatHistoryGet)
clientRouter.get('/receiverData',jwtAuthentication,chatController.receiverData)
clientRouter.get('/workHistory',jwtAuthentication,userController.workhistory)


module.exports=clientRouter
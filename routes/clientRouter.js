const express = require('express')
const clientRouter=express.Router()

// authentication module
const jwtAuthentication=require('../middleware/jwtAuthentication')

// multer module
const multer=require('../middleware/multer')

// controllers
const contractorController=require('../controllers/contractorController')
const userController=require('../controllers/userController')
const chatController= require('../controllers/chatController')

// contractor controller
clientRouter.get('/singleNotificationGet',jwtAuthentication,contractorController.singleNotificationGet)
clientRouter.get('/registeredCompnys',jwtAuthentication,contractorController.componyDetailesGet)
clientRouter.get('/getSigleComponyDetailes/:id',jwtAuthentication,contractorController.singleComponyDetailes)
clientRouter.get('/getUser',jwtAuthentication,contractorController.getUser)
clientRouter.post('/componyRegistration',jwtAuthentication,multer.upload.single('image'),contractorController.componyReg)
clientRouter.post('/updateCompony',jwtAuthentication,multer.upload.single('image'),contractorController.updatecompony)
clientRouter.post('/profilePhotoUpdate',jwtAuthentication,multer.upload.single('image'),contractorController.changeProfileImage)
clientRouter.post('/approvedEmail',jwtAuthentication,contractorController.connectedEmailSent)
clientRouter.post('/taskUpdate',jwtAuthentication,contractorController.taskUpdate)
clientRouter.post('/projectDetailes',jwtAuthentication,contractorController.contrctDetailes)
clientRouter.post('/deleteTaskUpdate',jwtAuthentication,contractorController.deleteTask)
clientRouter.post('/confirmationEmail',jwtAuthentication,contractorController.confirmEmailSent)

// user controller
clientRouter.get('/getAllCompony',jwtAuthentication,userController.getAllComponys)
clientRouter.get('/notificationGet',jwtAuthentication,userController.notificationGet)
clientRouter.get('/workHistory',jwtAuthentication,userController.workhistory)
clientRouter.get('/singleHisGet',jwtAuthentication,userController.workhistoryGet)
clientRouter.post('/notification',jwtAuthentication,userController.notification)
clientRouter.post('/locationSave',jwtAuthentication,userController.locationUpdate)

// chat controller
clientRouter.get('/chatList',jwtAuthentication,chatController.getChatList)
clientRouter.get('/receiverData',jwtAuthentication,chatController.receiverData)
clientRouter.post('/chatPost',jwtAuthentication,chatController.chatPost)
clientRouter.post('/chatHistory',jwtAuthentication,chatController.chatHistoryGet)



module.exports=clientRouter
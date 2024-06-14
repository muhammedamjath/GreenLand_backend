const express = require('express')
const clientRouter=express.Router()
const jwtAuthentication=require('../middleware/jwtAuthentication')

const contractorController=require('../controllers/contractorController')
const multer=require('../middleware/multer')


clientRouter.post('/componyRegistration',jwtAuthentication,multer.single('image'),contractorController.componyReg)
clientRouter.get('/registeredCompnys',jwtAuthentication,contractorController.componyDetailesGet)
clientRouter.get('/getSigleComponyDetailes/:id',jwtAuthentication,contractorController.singleComponyDetailes)
clientRouter.post('/updateCompony',jwtAuthentication,multer.single('image'),contractorController.updatecompony)
clientRouter.get('/getUser',jwtAuthentication,contractorController.getUser)



module.exports=clientRouter
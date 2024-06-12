const express = require('express')
const clientRouter=express.Router()
const jwtAuthentication=require('../middleware/jwtAuthentication')

const contractorController=require('../controllers/contractorController')
const multer=require('../middleware/multer')


clientRouter.post('/componyRegistration',jwtAuthentication,multer.single('image'),contractorController.componyReg)



module.exports=clientRouter
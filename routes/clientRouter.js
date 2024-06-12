const express = require('express')
const clientRouter=express.Router()

const contractorController=require('../controllers/contractorController')
const multer=require('../middleware/multer')


clientRouter.post('/componyRegistration',multer.single('image'),contractorController.componyReg)



module.exports=clientRouter
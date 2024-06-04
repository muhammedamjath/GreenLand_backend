const express=require('express')
const clientRouter=express.Router()

const authController=require('../controllers/authController')

clientRouter.post('/userSignup',authController.userSignup)
clientRouter.post('/contractorSignup',authController.contractorSignup)

module.exports=clientRouter
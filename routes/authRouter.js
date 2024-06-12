const express=require('express')
const authRouter=express.Router()

const authController=require('../controllers/authController')

authRouter.post('/userSignup',authController.userSignup)
authRouter.post('/contractorSignup',authController.contractorSignup)
authRouter.post('/signupOtp',authController.signupOtp)
authRouter.post('/forgetPassword',authController.resetPassEmail)
authRouter.post('/resetPassword',authController.resetPasswordOtp)
authRouter.post('/login',authController.loginPost)

module.exports=authRouter
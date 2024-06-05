const clientSignupSchema=require('../models/userSignup')
const nodemailer=require('../utilities/otp')
const otpGenerator = require('otp-generator')

exports.userSignup=async(req,res)=>{

    const {name,email,mobNo,password}=req.body
    const otp=otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false , lowerCaseAlphabets :false });  

    let userSignup=new clientSignupSchema({
        name:name,
        email:email,
        mobNo:mobNo,
        password:password,
        category:'user',
        otp:otp
    })

    if(userSignup){
        await userSignup.save()

              
            const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'OTP Verification',
    
            text: `OTP message from GreenLand
            Your OTP for signup is: ${otp}`,
        };
 
        nodemailer.sentEmailOtp(mailOptions)

        res.status(200).json('recived ')

    }
}

exports.contractorSignup=async(req,res)=>{
    console.log(req.body);
    const {name,email,mobNo,password}=req.body



    let contractorSignup=new clientSignupSchema({
        name:name,
        email:email,
        mobNo:mobNo,
        password:password,
        category:'contractor'
    })

    await contractorSignup.save()
    res.status(200).json('recived ')
}

exports.signupOtp=async(req,res)=>{
    const otp=req.body
    console.log(otp);
}
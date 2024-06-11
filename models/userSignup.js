const mongoose=require('mongoose')

const clientSignup=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobNo:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    image:{
        type:String
    },
    otp:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const clientSignupCollection=new mongoose.model('clientSignup',clientSignup)

module.exports=clientSignupCollection
const mongoose=require('mongoose')

const schema= new mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    contractorId:{
        type: mongoose.Types.ObjectId,
        required:true
    },
    componyId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        default:'unread'
    },
    work:{
        type:String,
        default:'not started'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const notificationCollection=new mongoose.model('notification',schema)

module.exports=notificationCollection
const mongoose=require('mongoose')

const Schema=new mongoose.Schema({
    componyName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    imageKey:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Active'
    },
    discription:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    contractorId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const componyRegCollection= new mongoose.model('registeredComponys',Schema)

module.exports=componyRegCollection
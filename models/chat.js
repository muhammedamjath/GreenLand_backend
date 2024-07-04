const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    contractorId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    componyId:{
        type:mongoose.Types.ObjectId
    },
    messages:{
        type:[{
            sender:{
                type:mongoose.Types.ObjectId,
            },
            receiver:{
                type:mongoose.Types.ObjectId
            },
            message:{
                type:String
            },
            time:{
                type:Date,
                default:Date.now
            }
        }]
    }
})

const chatCollection= new mongoose.model('chat',schema)

module.exports=chatCollection
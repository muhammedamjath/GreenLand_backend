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
    messages:{
        type:[{
            senter:{
                type:String,
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
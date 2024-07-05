const mongoose=require('mongoose')


const Schema = new mongoose.Schema({
    componyId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    contractorId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        default:'requsted'
    }
})

const workHistorySchema = new mongoose.model('workHistory',Schema)
module.exports=workHistorySchema
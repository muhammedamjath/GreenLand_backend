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
    },
    district:{
        type:String,
        default:''
    },
    state:{
        type:String,
        default:'Kerala'
    },
    place:{
        type:String,
        default:''
    },
    amount:{
        type:Number,
        default:0
    },
    area:{
        type:Number,
        default:0
    },
    duration:{
        type:String,
        default:''
    },
    startDate:{
        type:String,
        default:''
    },
    workUpdates:{
        type:[{
            date:{
                type:String
            },
            discription:{
                type:String
            }
        }],
        default:[]
    },
    mobNo:{
        type:Number,
        default:0
    }

})

const workHistorySchema = new mongoose.model('workHistory',Schema)
module.exports=workHistorySchema
const mongoose=require('mongoose')

async function dbConnect(){
    await mongoose.connect(process.env.MONGOOSEURL,{
        dbName:'GreenLand'
    })
    .then(()=>{
        console.log('mondoDb connected successfully');
    })
    .catch((err)=>{
        console.log('mongoDb not connected');
    })
        
}

module.exports=dbConnect
const express= require ('express')
require('dotenv').config()
const dbConnect=require('./config/connection')


const authRouter=require('./routes/authRouter')
const clientRouter=require('./routes/clientRouter')


const app=express()
const port=process.env.PORT
const cors=require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))


app.use('/auth',authRouter)
app.use('/client',clientRouter)



dbConnect().then(()=>{
    app.listen(port,()=>{ 
        console.log(`GreenLand connected in ${port}` );
    })
    
})

 
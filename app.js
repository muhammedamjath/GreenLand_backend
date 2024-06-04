const express= require ('express')
require('dotenv').config()
const dbConnect=require('./config/connection')

const client=require('./routes/clientRouter')


const app=express()
const port=process.env.PORT
const cors=require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))


app.use('/client',client)



dbConnect().then(()=>{
    app.listen(port,()=>{ 
        console.log(`GreenLand connected in ${port}` );
    })
    
})

 
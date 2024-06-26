const express= require ('express')
const {Server} = require('socket.io')
require('dotenv').config()
const dbConnect=require('./config/connection')
const cors=require('cors')
const app=express()
const server =require('http').createServer(app)


const io = new Server(server,{
    cors:{
        origin:'*',
    },
})

const port=process.env.PORT

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

const authRouter=require('./routes/authRouter')
const clientRouter=require('./routes/clientRouter')
const socket= require('./utilities/socketIo')


app.use('/auth',authRouter)
app.use('/client',clientRouter)

socket.socket(io)





dbConnect().then(()=>{
    server.listen(port,()=>{ 
        console.log(`GreenLand connected in ${port}` );
    })
    
})

 
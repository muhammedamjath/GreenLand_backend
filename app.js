const express= require ('express')
require('dotenv').config()
const http =require('http')
const dbConnect=require('./config/connection')
const {Server} = require('socket.io')
const cors=require('cors')




const authRouter=require('./routes/authRouter')
const clientRouter=require('./routes/clientRouter')


const app=express()
app.use(cors( {
    origin: 'http://localhost:4200' // Allow CORS from your Angular app
  }))
const port=process.env.PORT

const server= http.createServer(app)
const io = new Server(server,{
    
});

io.on('connection',(socket) => {
    console.log('connected');
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/auth',authRouter)
app.use('/client',clientRouter)



dbConnect().then(()=>{
    app.listen(port,()=>{ 
        console.log(`GreenLand connected in ${port}` );
    })
    
})

 
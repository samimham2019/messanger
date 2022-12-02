import express from "express";
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'
const app = express()
const PORT = process.env.PORT || 5000

const dev = false;
const Local = 'http://localhost:3000'
const Shared = 'http://192.168.43.107:3000'


// importing routes
import users from './Routes/User.js'


// create server

const server = http.createServer(app)
const io = new Server(server,{
    cors: {origin: dev ? Local : Shared}
})

io.on('connection',(socket)=>{
   
    socket.on('join-room',(msg)=>{
        console.log(msg)
    })
    socket.on('send-message',(id, msg,res)=>{
        socket.broadcast.emit('send-all',msg)
        console.log(id)
    })

    
})


//middlewares
app.use(cors())
app.use(express.json())
app.use(cors({credentials: true, origin: dev ? Local : Shared}))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    next()
})
app.use('/user/',users)


server.listen(5000,()=>console.log(`server is running ${PORT}`))

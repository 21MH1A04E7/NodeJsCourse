import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import cors from 'cors'

const app=express();

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
})

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true
}))

app.get('/',(req,res)=>{
    res.send('<h1>hello world</h1>')
})

io.on('connection',(socket)=>{
    // console.log("User connected");
    // console.log("Id",socket.id)
    socket.emit('welcome',"welcome to the server")
    // socket.broadcast.emit('welcome',`${socket.id} join the server`)
    
    //event
    socket.on("message",(data)=>{
        // console.log(data)
        // io.emit("message",`${data} -${socket.id}`)
        //it will send this message every user except
        // socket.broadcast.emit("get-message",data)
        io.to(data.roomId).emit("get-message",data)
    })
    socket.on("join-room",(roomName)=>{
        // console.log(roomName)
        socket.join(roomName)
        
    })
    //disconnect the code
    socket.on("disconnect",()=>{
        console.log(`${socket.id} left the server`)
    })
})

const port=3000

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
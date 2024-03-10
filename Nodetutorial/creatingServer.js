//creating server using express
const express=require('express')
const app=express()

app.get('/',(req,res)=>{
    res.send('hello, how can i help you')
})

app.get('/water',(req,res)=>{
    res.send("may you give me a glass of water")
})

app.get('/hello',(req,res)=>{
    res.send("i don't wnat nay help")
})

app.get('/api',(req,res)=>{
    res.send({name:"hariom",rollno:"21mh1a04e7"})
})

//port number
app.listen(8080,()=>{
    console.log('server is started')
})
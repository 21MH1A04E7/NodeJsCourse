const express = require('express');
const mongoose=require('mongoose');
require('dotenv').config()

const bodyParser = require('body-parser')
const fs=require('fs')

const app = express();

//Connecting with MongoDB
const MONGOURL=process.env.MOGOLOCAURL

mongoose.connect(MONGOURL)
.then(()=>{
    console.log('connect to Mongoose')
})
.catch((err)=>{
    console.log('error connecting to Mongoose'+err)
})

//Creating Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String
    },
    gender:{
        type:String,
        enum:['male','female']
    }
},{timestamps:true})//to track the database

const User=mongoose.model('User',userSchema);

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

//log middle ware
app.use((req,res,next)=>{
    fs.appendFile('MongoDB1\\log.txt',`\n${Date.now()} url is ${req.url} and ip address is ${req.ip}`,(err,data)=>{
        next()
    })
})


app.post('/api/users',async (req,res)=>{
    try{
        const data=req.body;
        const newUser=await User.create(data);
        if(!newUser){
            res.status(404).json({message:'User not created'})
        }
        res.status(201).json(newUser)
    }
    catch(err){
        console.log('Internal Sever error '+err)
        res.status(500).json({error:`${err}`})
    }
})


app.get('/users',async (req,res)=>{
    const data=await User.find()
    const html=`
        <ul>
           ${data.map((user)=>`<li>${user.firstName} ${user.lastName}</li> `).join("")}
        </ul>
    `
    //html server side rendering
    res.send(html)
})

app.get('/users/:id',async (req,res)=>{
    try{
        const userId=req.params.id
        const data=await User.findById(userId)
        if(!data){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json(data)
    }catch(err){
        console.log('Internal Sever error '+err)
        res.status(500).json({error:`${err}`})
    }
})

app.delete('/users/:id',async (req,res)=>{
    try{
        const userId=req.params.id
        const data=await User.deleteOne({_id:userId})
        if(!data){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json(data)
    }catch(err){
        console.log('Internal Sever error '+err)
        res.status(500).json({error:`${err}`})
    }
})

const port=process.env.PORTNO
app.listen(port||8080,()=>{
    console.log('server is listening on port '+port)
});


/*

*/
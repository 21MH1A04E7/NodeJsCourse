const express=require('express')
const User=require('./user')
const db=require('./db')
const cors=require('cors')
const bodyParser=require('body-parser')

const app=express()
app.use(bodyParser.json())
app.use(cors())

app.post('/api/data',async (req,res)=>{
  try{
    const data=req.body;
    console.log(data)
    const newUser=new User(data);
    const response=await newUser.save();
    res.status(200).json(response);
  }catch(error){
    console.log('internal server error')
    res.status(500).json({error:`${error}`})
  }
})

app.listen(8777,()=>{
  console.log('server is running on port 8777')
})
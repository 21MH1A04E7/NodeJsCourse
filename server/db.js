const mongoose=require('mongoose')
require('dotenv').config()

const url=process.env.MOGOLOCAURL;

mongoose.connect(url)
const db=mongoose.connection
db.on('connected',()=>{
    console.log('Connected to MongoDB');
})

db.on('error',(err)=>{
    console.log(err);
})

db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB');
})

module.exports=db;
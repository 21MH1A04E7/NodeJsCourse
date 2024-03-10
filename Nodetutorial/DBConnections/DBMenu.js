const mongoose=require('mongoose');
require('dotenv').config()
const DBURL=process.env.MOGOLOCAURL//test database name
mongoose.connect(DBURL)

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('Connected')
})
db.on('error',(err)=>{
    console.log(err)
})
db.on('disconnected',()=>{
    console.log('Disconnected')
})

module.exports=db;
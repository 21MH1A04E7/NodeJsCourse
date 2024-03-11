const express=require('express');
const bodyParser=require('body-parser');
const {connectMongodb}=require('./db')
const urlRoute=require('./routes/url')
require('dotenv').config()

const app=express();

connectMongodb(process.env.MOGOLOCAURL)
.then(()=>{
    console.log('connect to MongoDB')
})
.catch((err)=>{
    console.log(err)
})

app.use(bodyParser.json())
app.use('/url', urlRoute)


app.listen(8001,()=>{
    console.log('server is listening on port 8001')
})
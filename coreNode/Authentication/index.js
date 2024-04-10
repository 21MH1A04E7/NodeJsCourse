const express=require('express');
const {connectMongodb}=require('./db')
require('dotenv').config()
const path=require('path')
const bodyParser=require('body-parser');
const userRouter=require('./router/user')
const staticRouter=require('./router/staticRouter')
const urlRouter=require('./router/url')
const cookieParser=require('cookie-parser')
const app=express();

connectMongodb(process.env.MOGOLOCAURL)
.then(()=>{
    console.log('connect to MongoDB')
})
.catch((err)=>{
    console.log(err)
})

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended:true }))

app.use('/user',userRouter)
app.use('/',staticRouter)
app.use('/url',urlRouter)

app.listen(8088,()=>{
    console.log("listening on 8088")
})
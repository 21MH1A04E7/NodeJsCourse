const express=require('express')
const staticRouter=require('./routes/staticRouter')
const userRouter=require('./routes/user')
const path=require('path')
const mongoose= require('mongoose')
require('dotenv').config()
const cookieParser = require("cookie-parser");


const verifytoken=require('./services/authentication')
const app=express()

const url=process.env.MOGOLOCAURL

mongoose.connect(url)
.then(()=>{
    console.log('database is connected')
})
.catch((err)=>{
    console.log(err)
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser());

app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))

app.get('/',verifytoken,(req,res)=>{
    // console.log(req.user)
    res.render('home',{
        user:req.user,
    })
})

app.use('/user',staticRouter)
app.use('/user',userRouter)

const port=process.env.PORT ||8888
app.listen(port,()=>{
    console.log('server is started on port 8888')
})
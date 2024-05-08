const express=require('express')
const staticRouter=require('./routes/staticRouter')
const userRouter=require('./routes/user')
const blogRouter=require('./routes/blog')
const path=require('path')
const Blog=require('./models/vlog')
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
//serving the static route
app.use(express.static(path.resolve('./public')))

app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))

app.get('/',verifytoken,async(req,res)=>{
    const blog=await Blog.find({})
    // console.log(req.user)
    res.render('home',{
        user:req.user,
        blog:blog,
    })
})

app.use('/user',staticRouter)
app.use('/user',userRouter)
app.use('/blog',blogRouter)

const port=process.env.PORT ||8888
app.listen(port,()=>{
    console.log('server is started on port 8888')
})
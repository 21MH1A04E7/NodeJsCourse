const express=require('express')
const path=require('path')
require('dotenv').config
const app=express()

app.set('view engine', 'ejs')
app.set('views',path.resolve('./views'))

app.get('/',(req,res)=>{
    res.render('home')
})

const port=process.env.PORT ||8888
app.listen(port,()=>{
    console.log('server is started on port 8888')
})
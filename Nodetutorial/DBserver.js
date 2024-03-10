const express=require('express')
const db=require('./db')
const bodyParser=require('body-parser')//body parser
const app=express()
const Person=require('./models/Person')
const passport=require('./Auth/auth.js')
require('dotenv').config();
//using medileware the parse the data in json formate
app.use(bodyParser.json())

app.use(passport.initialize())
const localAuthMiddleWare=passport.authenticate('local',{session:false})

//Middelware
const logRequest=(req,res,next)=>{
    console.log(`date is [${new Date().toLocaleTimeString()}]url:${req.originalUrl} `)
    next()//Move to next phase
}
//for all router
app.use(logRequest)
// app.use(passport.initialize())
//imporing the router
const PersonRouter=require('./routes/personRoutes');


//router 
//applying meddleware for single router
// app.use('/Person',logRequest,PersonRouter)
app.use('/Person',PersonRouter)

//password local authentication
app.get('/',localAuthMiddleWare,(req,res)=>{
    res.send('hello, how can i help you!.')
})
app.get('/help',(req,res)=>{
    res.send("pls help me")
})

const Port=process.env.PORT ||7777
app.listen(Port,()=>{
    console.log('server is started')
})
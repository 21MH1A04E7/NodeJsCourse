const express = require('express');
const {connectMongodb}=require('./db')
const userRouter=require('./routes/userRouter')
const {logReqRes}=require('./MiddleWare/index')//middleware
require('dotenv').config()

const bodyParser = require('body-parser')


const app = express();

//Connecting with MongoDB
const MONGOURL=process.env.MOGOLOCAURL
connectMongodb(MONGOURL)
.then(()=>{
    console.log('connect to Mongoose')
})
.catch((err)=>{
    console.log('error connecting to Mongoose'+err)
})

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(logReqRes('MVC\\log1.txt'))

app.use('/api/users', userRouter)

const port=process.env.PORTNO
app.listen(port||8080,()=>{
    console.log('server is listening on port '+port)
});


/*

*/
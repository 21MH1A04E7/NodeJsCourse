const express=require('express');
const db=require('../DBConnections/DBMenu')
const bodyParse=require('body-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app=express();
app.use(bodyParser.json())

const menuRouter=require('../routes/menuRouter')
app.use('/', menuRouter)
const Port=process.env.MenuPort||4040
app.listen(Port,()=>{
    console.log('server is started for menu')
})
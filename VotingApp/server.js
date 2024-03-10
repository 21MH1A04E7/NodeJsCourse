const express=require('express');
const bodyParse=require('body-parser');
const db=require('./db.js');
require('dotenv').config();

const app = express();
app.use(bodyParse.json());

const userRouter=require('./routes/userRoutes')
app.use('/user',userRouter)

const candidateRouter=require('./routes/candidateRoutes.js')
app.use('/',candidateRouter)

const voteRotuer=require('./routes/vote.js')
app.use('/',voteRotuer)

app.get('/hello',(req,res)=>{
    res.status(200).json({message:"hello how are you!"});
})

const port=process.env.PORTNO;
app.listen(port,()=>{
    console.log('listening on port 9898');
})
const express = require('express');
const users=require("./MOCK_DATA.json")
const bodyParser = require('body-parser')
const fs=require('fs')

const app = express();
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/users',(req,res)=>{
    const html=`
        <ul>
           ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    //html server side rendering
    res.send(html)
})

app.get('/api/users',(req,res)=>{
    return res.status(200).json(users)
})

app.get('/api/users/:userId',(req,res)=>{
    const id=Number(req.params.userId);
    const data=users.find((user)=>user.id==id)
    res.json(data)
})

app.post('/api/users',(req,res)=>{
    const data=req.body;
    users.push({...data,id:users.length+1});
    fs.writeFile('RestApi1\\MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        res.json({message:"success"})
    })
})

app.patch('/api/users/:userId',(req,res)=>{
    const data=req.body
    const id=Number(req.params.userId);
    const user=users.find((user)=>user.id==id)
    user.first_name=data.first_name
    user.last_name=data.last_name
    res.json(user)
})

const port=8080
app.listen(port||8080,()=>{
    console.log('server is listening on port 8080')
});
const express = require('express');
const users=require("./MOCK_DATA.json")
const bodyParser = require('body-parser')
const fs=require('fs')

const app = express();
//middleware
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.use((req,res,next)=>{
    fs.appendFile('MiddleWare\\log.txt',`\n${Date.now()} url is ${req.url} and ip address is ${req.ip}`,(err,data)=>{
        next()
    })
})

//middleware
app.use((req,res,next)=>{
    console.log('middle ware 1')
    req.name="middle ware 1"
    next()
})

app.use((req,res,next)=>{
    console.log('middle ware 2 '+req.name)
    next()
})

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
    console.log("api/ueers/ "+req.name)
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


const port=8080
app.listen(port||8080,()=>{
    console.log('server is listening on port 8080')
});


/*
Middleware
Middleware functions are functions that have access to the request object (req),
the response object (res), and the next middleware function in the application’s 
request-response cycle. The next middleware function is commonly denoted by a variable named next.

app.use((req, res, next)=>{
    console.log(`date is [${new Date().toLocaleTimeString()}]url:${req.originalUrl} `)
    next()//Move to next phase of request/response cycle
})

*/
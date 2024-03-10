console.log('hi')
const http=require('http')
const fs=require('fs')
//creating server using node js

const app=http.createServer((req,res)=>{
    console.log("new server")
    let log=`${Date.now().toLocaleString()}:New req Recived and URl Path ${req.url}\n`;
    fs.appendFile('HttpServer\\serverData.txt',log,(err,data)=>{
        res.end('hello')
    });
    // res.end("hellow From Server!")
});

app.listen(8000,()=>{
    console.log("server is running")
})
const http=require('http');
const url=require('url')
const fs=require('fs')
const os=require('os')

const app=http.createServer((req,res)=>{
    if(req.url=="/favicon.ico") return res.end()
    const log=`Date ${Date.now()} : Url ${req.url} : Request Method ${req.method}\n`
    const myUrl=url.parse(req.url,true)
    console.log(myUrl)
    fs.appendFile('HttpMethod\\log1.txt',log,(err,data)=>{
        switch(myUrl.pathname){
            case '/':
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write('<h1>Hello World On Home Page</h1>')
                res.end()
                break;
            case '/about':
                res.writeHead(200,{'Content-type':'application/json'})
                res.write(JSON.stringify({name:'<NAME>',age:25}))
                res.end()
                break;
            case '/singup':
                if(req.method === 'GET'){
                    res.end('you singup this form')
                }else if(req.method === 'POST'){
                    res.writeHead(201)
                    res.end("success")
                }
                break;
            default:
                res.end("error 404")
        }
    })
})
const port=3000
app.listen(port||3000,()=>{
    console.log("server is listening on port "+port)
})

/*
GET
POST 
PUT 
DELETE
PATCH
*/
const fs=require('fs');
const http=require('http')
const url=require('url')

const app=http.createServer((req,res)=>{
    if(req.url=="/favicon.ico") return res.end()

    const myUrl=url.parse(req.url,true)
    console.log(myUrl)

    const log=`now Data =>${Date.now()} URL => ${req.url}\n`
    fs.appendFile('HandlingUrl\\log1.txt',log,(err,data)=>{
        if(req.url=="/"){
            res.end("Home page")
        }else if(myUrl.pathname=="/about"){//path name
            res.end(`i am on about page and my name is ${myUrl.query.name}`)
        }else{
            const temp1=myUrl.pathname
            const temp2=myUrl.query.search
            res.end(`your url is ${temp1} and your qurery paramter is ${temp2}`)
        }
    })
    // res.end("handling")
})

app.listen(3000,()=>{
    console.log("server is running")
})
/*
external package
npm i url

URL=>uniform Resource Locator

1.http://www.google.com/search?q=hello+world&hl
//protocal/Domain(user Frendly Name of IP Address)/Path?QueryParameter

https->Hypertext Transfer Protocol Secure
www.google.com->Domain
search  -> Path
search/api/v1 -> Nested Path
?q=hello+world&hl -> Query Parameter

QP: Key Value Pair
Key : q , Value : hello world & hl


*/
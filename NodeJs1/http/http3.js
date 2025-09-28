const http=require('http')
const fs=require('fs')

const server=http.createServer((req,res)=>{
    // const html=fs.readFileSync('http/index.html','utf-8')
    // res.writeHead(200,{"Content-type":"text/html"})
    // res.end(html)

    res.writeHead(200,{"Content-type":"text/html"})
    fs.createReadStream(__dirname+'/index.html').pipe(res)
})
server.listen(3000,()=>{
    console.log('server running ',3000)
})

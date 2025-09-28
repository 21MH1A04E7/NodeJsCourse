const http=require('http')

const server=http.createServer('/',(req,res)=>{
    res.writeHead(200,{"Content-type":"text/html"})
    res.end('<h1>hariom</h1>')
})
server.listen(4000,()=>{
    console.log('server running ',4000)
})

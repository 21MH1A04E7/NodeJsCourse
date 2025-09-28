const http=require('http')
const fs=require('fs')

const server=http.createServer((req,res)=>{
    let name='hariom'
    let html=fs.readFileSync(__dirname+'/index2.html','utf-8')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    html=html.replace('{{name}}',name)
    res.end(html)
})

server.listen(3000,()=>{
    console.log('Server is running on port 3000')
})
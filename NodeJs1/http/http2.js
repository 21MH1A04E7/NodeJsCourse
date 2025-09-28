const http=require('http')

const server=http.createServer((req,res)=>{
    const data={
        hariom:'Kumar',
        age:25,
        city:'Pune'
    }
    res.writeHead(200,{"Content-type":"application/json"})
    res.end(JSON.stringify(data))
})
server.listen(3000,()=>{
    console.log('server running ',3000)
})

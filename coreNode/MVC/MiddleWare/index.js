const fs=require('fs')
function logReqRes(filename){
    return (req,res,next)=>{
        fs.appendFile(filename,`\n${Date.now()} url is ${req.url} and ip address is ${req.ip} and methode is ${req.method}`,(err,data)=>{
            next()
        })
    }
}
module.exports={
    logReqRes
}
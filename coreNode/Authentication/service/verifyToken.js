const jwt=require('jsonwebtoken')
function verifyToken(req,res,next){
    const token=req.cookies.access_cookie
    if(!token){
        return res.redirect('/login')
    }
    jwt.verify(token,'hariom',(err,decode)=>{
        if(err){
            return res.redirect('/login')
        }
        req.user=decode
        next()
    })
}


module.exports={
    verifyToken,
}
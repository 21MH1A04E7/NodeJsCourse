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

function restrictTo(roles=[]){
    return function (req,res,next){
        if(!req.user) return res.redirect('/login')
        // console.log(req.user)
        if(!roles.includes(req.user.role)){
            return res.end("unAuthorized")
        }
        return next()
    }
}

module.exports={
    verifyToken,
    restrictTo,
}
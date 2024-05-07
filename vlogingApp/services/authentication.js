const jwt=require('jsonwebtoken');
require('dotenv').config();


function verifytoken(req,res,next){
    const token=req.cookies.access_cookie
    if(!token){
        return res.redirect('/user/signin')
    }
    jwt.verify(token,process.env.SECRET,(err,decode)=>{
        if(err){
            return res.redirect('/user/signin')
        }
        req.user=decode
        next()
    })
}

module.exports = verifytoken
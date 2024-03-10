const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware=(req,res,next)=>{
    const authorization=req.headers.authorization;
    if(!authorization){
        return res.status(404).json({error:'invalid token'});
    }
    const token=authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:'unauthorized'});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //req.name=decodedvalue
        req.user=decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({error:'invalid token'});
    }
}

//function to get the jwt token

const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:1000})
}
module.exports = {
    jwtAuthMiddleware,
    generateToken
};
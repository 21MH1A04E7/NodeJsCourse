//improting jsonwebtoken
const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtAuthMiddleware=(req,res,next)=>{
    const authorization=req.headers.authorization;
    if(!authorization){
        return res.status(404).json({error:'invalid token'});
    }
    //extract the jwt token from the headers
    const token=authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:'unauthorized'});
    }

    try{
        //verifing the jwt token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        //attach user information to the request object
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
    //generating the token using user data
    //setting expires time of token
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:300})
}
module.exports = {
    jwtAuthMiddleware,
    generateToken
};
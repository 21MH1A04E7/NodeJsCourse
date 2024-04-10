const User=require('../models/user')
const jwt=require('jsonwebtoken')

async function handleuserSingup(req,res){
    try{
        const {name,email,password}=req.body;
        await User.create({
            name,
            email,
            password
        })
        return res.redirect("/")
    }catch(err){
        res.status(500).json({message:'Interval server error'})
    }
}

async function handleuserLogin(req,res){
    try{
        const {email,password}=req.body;
        // console.log(email,password)
        if(!email || !password) return res.status(404).json({message:'inter user id or password'})
        const user=await User.findOne({email,password})
        if(!user){
            return res.render("login",{error:"invalid user name or password!"})
        }
        const payload={
            id:user._id,
            email:user.email,
        }
        const token=jwt.sign(payload,'hariom')
        res.cookie('access_cookie',token)
        return res.redirect("/")
    }catch(error){
        res.status(500).json({message:'Interval server error'});
    }
}
module.exports={
    handleuserSingup,
    handleuserLogin,
}
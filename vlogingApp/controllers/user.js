const User=require('../models/user')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const bcryptjs=require('bcryptjs')

async function handleSignup(req,res){
    try{
        const {fullName,email,password}=req.body
        const response=await User.create({fullName:fullName,email:email,password:password});
        return res.redirect("/")
    }catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
}

async function handleSignin(req,res){
    try{
        const {email,password}=req.body
        const user=await User.findOne({email:email})
        if(!user){
            return res.render('signin',{
                error:"Incorrect username or password"
            })
        }
        const isMatch=bcryptjs.compareSync(password,user.password)

        if(!isMatch){
            return res.render('signin',{error:"Incorrect username or password"})
        }
        // const {password:pass,...rest}=user._doc
        const payload={
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            avatar:user.avatar,
            role:user.role
        }
        const token=jwt.sign(payload,process.env.SECRET)
        // console.log(token)
        return res.cookie("access_cookie",token).redirect("/")
    }catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
}

async function handleSignout(req, res){
    try{
        res.clearCookie("access_cookie")
        return res.redirect("/user/signin")
    }catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
}

module.exports ={
    handleSignup,
    handleSignin,
    handleSignout,
}
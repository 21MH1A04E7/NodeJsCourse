const express=require('express')
const Url=require('../models/url')
const {verifyToken,restrictTo}=require('../service/verifyToken')
const router=express.Router();

router.get('/admin',verifyToken,restrictTo(["admin"]),async function (req,res){
    const allurls=await Url.find()
    return res.render('index',{urls:allurls})
})

router.get('/',verifyToken,restrictTo(["user","admin"]),async (req,res)=>{
    // console.log(req.user.id)
    const allurls=await Url.find({createBy:req.user.id})
    return res.render('index',{urls:allurls})
})

router.get('/signup',async (req,res)=>{
    return res.render('signup')
})
router.get('/login',async (req,res)=>{
    return res.render('login')
})
module.exports=router;
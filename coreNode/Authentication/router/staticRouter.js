const express=require('express')
const Url=require('../models/url')
const {verifyToken}=require('../service/verifyToken')
const router=express.Router();

router.get('/',verifyToken,async (req,res)=>{
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
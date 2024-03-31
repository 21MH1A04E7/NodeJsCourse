const express=require('express')
const Url=require('../models/url')
const router=express.Router();

router.get('/',async (req,res)=>{
    const allurls=await Url.find()
    return res.render('index',{urls:allurls})
})

router.get('/signup',async (req,res)=>{
    return res.render('signup')
})
router.get('/login',async (req,res)=>{
    return res.render('login')
})
module.exports=router;
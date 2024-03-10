const express=require('express');
const User=require('../model/user')//exported the person model
const {jwtAuthMiddleware,generateToken}=require('../jwt')

//creating router to handel the endpoint
const router=express.Router();

router.post('/singup',async (req,res)=>{
   try{
    const data=req.body
    const adminCount=await User.find({role:'admin'}).count()
    if(adminCount>=1&&data.role=='admin'){
        return res.status(400).json({error:'only 1 admins allowed'});
    }
    const newUser=new User(data)
    const response=await newUser.save();
    //passing payload
    const payload={
        id:response.id
    }
    console.log('payload',payload);
    //generating the token
    const token=generateToken(payload);
    console.log("token is",token);
    res.status(200).json({response:response,token:token});
   }catch(err){
    console.log('internal server error')
    res.status(500).json({error:`${err}`})
   }
})

router.get('/login',async (req,res)=>{
    try{
        const {aadharNumber,password}=req.body;
        const user=await User.findOne({aadharNumber:aadharNumber})
        if(!user){
            res.status(404).json({message:"invalid aadharNumber"});
        }
        if(!(await user.comparePassword(password))){
            return res.status(401).json({message:"invalid password"});
        }
        const payload={
            id:user.id,
        }
        const token=generateToken(payload);
        res.json({token:token})
    }catch(err){
        console.log('internal server error',err)
        res.status(500).json({error:`${err}`})
    }
})

router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData=req.user;
        const userId=userData.id;
        const userProfile = await User.findById(userId);
        if(!userProfile){
            return res.status(404).json({error:'user profile not found'})
        }
        res.status(200).json(userProfile)
    }catch(error){
        console.log('internal server error')
        res.status(500).json({error:`${error}`})
    }
})

router.put('/profile/password',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData=req.user;
        const userId=userData.id;
        //fetching the current and new password from the body
        const {currentPassword,newPassword}=req.body;
        //finding the id 
        const response=await User.findById(userId)
        console.log(response)
        if(!(await response.comparePassword(currentPassword))){
            return res.status(401).json({message:"invalid password"});
        }
        //updating the password
        response.password=newPassword;
        await response.save();
        res.status(200).json({message:"password updated"})
    }catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})

module.exports=router
const express=require('express');
const Person=require('../models/Person')//exported the person model
const {jwtAuthMiddleware,generateToken}=require('../jwt')

//creating router to handel the endpoint
const router=express.Router();

router.post('/singup',async (req,res)=>{
   try{
    const data=req.body//assuming the request body contains the person data
    //create a new instance of the person class with the received data
    const newPerson=new Person(data)

    //save the new person in the database
    const response=await newPerson.save();
    console.log('data saved');
    //passing payload
    const payload={
        id:response.id,
        username:response.username,
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
        const {username,password}=req.body;
        const user=await Person.findOne({username:username})
        if(!user||!user.comparePassword(password)){
            return res.status(401).json({message:"invalid password"});
        }
        const payload={
            id:user.id,
            username:user.username
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
        console.log("user data",userData);
        const userId=userData.id;
        const userProfile = await Person.findById(userId);
        if(!userProfile){
            return res.status(404).json({error:'user profile not found'})
        }
        res.status(200).json(userProfile)
    }catch(error){
        console.log('internal server error')
        res.status(500).json({error:`${error}`})
    }
})
router.get('/',jwtAuthMiddleware,async (req,res)=>{
    try{
        const data=await Person.find()
        console.log('data fetch')
        res.status(200).json(data)
    }catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})

//param

router.get('/:work', async (req,res)=>{
    try{
        //get the parameter from url(variable)
        const workType=req.params.work
        if(workType=='chef'||workType=='waiter'||workType=='manager'){
            const response=await Person.find({work:workType})
            console.log('data fetch')
            res.status(200).json(response)
        }else{
            res.status(404).json({page:"not found"})
        }

    }
    catch(err){
        console.log('inter server error')
        res.status(500).json({error:`${err}`})
    }
})

//update
router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const personData=req.body;
        //finding the id and updating the file
        const response=await Person.findByIdAndUpdate(personId,personData,{
            new:true,//returning the updated data
            runValidators:true,//run mongoose validators
        })
        //if response is null
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }
        console.log("data updated")
        res.status(200).json(response)
    }catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId)
        if(!response){
            console.log('person not found')
            return res.status(404).json({error:'Person not found'})
        }
        console.log('person deleted')
        res.status(200).json(response)
    }catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})
//exported
module.exports=router
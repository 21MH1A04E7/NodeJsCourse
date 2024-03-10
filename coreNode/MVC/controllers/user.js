const User=require('../models/user')

async function handleGetAllUsers(req,res){
    try{
        const data=await User.find();
        if(!data){
            return res.status(404).json({message:'User not found'})
        }
        return res.status(200).json(data)
    }catch(err){
        console.log('Internal Sever error '+err)
        return res.status(500).json({error:`${err}`})
    }
}


async function handleCreateUser(req,res){
    try{
        const data=req.body;
        const newUser=await User.create(data);
        if(!newUser){
            return res.status(404).json({message:'User not created'})
        }
        return res.status(201).json(newUser)
    }
    catch(err){
        console.log('Internal Sever error '+err)
        return res.status(500).json({error:`${err}`})
    }
}

async function handleGetUserById(req,res){
    try{
        const userId=req.params.id
        const data=await User.findById(userId)
        if(!data){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json(data)
    }catch(err){
        console.log('Internal Sever error '+err)
        return res.status(500).json({error:`${err}`})
    }
}

async function handleDeleteUserById(req,res){
    try{
        const userId=req.params.id
        const data=await User.deleteOne({_id:userId})
        if(!data){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(200).json(data)
    }catch(err){
        console.log('Internal Sever error '+err)
        return res.status(500).json({error:`${err}`})
    }
}

module.exports={
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleDeleteUserById,
}
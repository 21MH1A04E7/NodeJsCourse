const express=require('express');
const Menu=require('../models/Menu')
const router=express.Router();

router.post('/Menu',async (req,res)=>{
    try{
        const data=req.body;
        const newMenu=new Menu(data);
        const  response=await newMenu.save();
        res.status(200).json(response);
    }
    catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})

router.get('/Menu',async (req,res)=>{
    try{
        const menus=await Menu.find()
        res.status(200).json(menus)
    }
    catch(err){
        console.log('not able to patch the data')
        res.status(500).json({error:`${err}`})
    }
})

router.get('/Menu/:ingredients',async (req,res)=>{
    try{
        const findIngre=req.params.ingredients
        console.log(findIngre)
        if(findIngre=='chicken wings'||findIngre=='spices'||findIngre=='sauce'){
            const response=await Menu.find({ingredients:findIngre})
            console.log('find result: '+response)
            res.status(200).json(response)
        }else{
            console.log('sorry this type of ingredient is not available')
            res.status(404).json({error:'not available'})
        }
    }catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})
//update

router.put('/Menu/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const updateMenu=await Menu.findByIdAndUpdate(id,data,{
            new:true,
            runValidators:true,
        })
        if(!updateMenu){
            console.log("page not found")
            res.status(404).json({error:'page not found'})
        }
        console.log("update")
        res.status(200).json(updateMenu)
    }catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})
//delete

router.delete('/Menu/:id',async (req,res)=>{
    try{
        const id=req.params.id;
        const deleteMenu=await Menu.findByIdAndDelete(id)
        if(!deleteMenu){
            console.log("page not found")
            res.status(404).json({error:'page not found'})
        }
        console.log("delete")
        res.status(200).json(deleteMenu)
    }catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})

//exporting router
module.exports=router;
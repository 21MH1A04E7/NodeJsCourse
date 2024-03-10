const express=require('express')
const db1=require('./db1')
const Product=require('./models/Product')
const bodyParser=require('body-parser')
const app=express()
require('dotenv').config()
app.use(bodyParser.json())

app.post('/Product',async (req,res)=>{
    try{
        const data=req.body
        const newProduct=new Product(data)
        const response=await newProduct.save()
        res.status(200).json(response)

    }
    catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})
app.get('/Product',async (req,res)=>{
    try{
        const products=await Product.find()
        console.log('products found')
        res.status(200).json(products)
    }catch(err){
        console.log('internal server error')
        res.status(500).json({error:`${err}`})
    }
})
const Port=process.env.ProductPort
app.listen(Port,()=>{
    console.log('server is started1')
})
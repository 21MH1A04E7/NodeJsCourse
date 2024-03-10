const mongoose=require('mongoose');

const MenuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        required:true
    },
    is_drink:{
        type:String
    },
    ingredients:{
        type:String,
        enum:['chicken wings','spices','sauce'],
        required:true
    },
    num_sales:{
        type:Number,
        unique:true
    }
})

const Menu=mongoose.model('Menu',MenuSchema)

module.exports=Menu;
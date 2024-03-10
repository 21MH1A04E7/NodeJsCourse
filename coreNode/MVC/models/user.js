const mongoose=require('mongoose');

//Creating Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String
    },
    gender:{
        type:String,
        enum:['male','female']
    }
},{timestamps:true})//to track the database

const User=mongoose.model('User',userSchema);

module.exports=User;









/*

*/
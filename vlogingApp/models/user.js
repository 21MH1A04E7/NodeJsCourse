const mongoose=require('mongoose')
const bcryptjs=require('bcryptjs')

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"./public/images/default.png"
    },
    role:{
        type:String,
        enum:["User","Admine"],
        default:"User"
    }
},{timestamps:true})


userSchema.pre('save',async function (next){
    const user=this;
    if(!user.isModified('password')){
        next()
    }
    const salt=await bcryptjs.genSalt(10)
    const hashedPassword=bcryptjs.hashSync(user.password,salt)
    user.password=hashedPassword
    next()
})

const User=mongoose.model('User',userSchema)
module.exports = User;

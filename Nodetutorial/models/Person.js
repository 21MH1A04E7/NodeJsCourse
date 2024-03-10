const mongoose=require('mongoose')
//importing bcrypt
const bcrypt=require('bcrypt')
//define schema 
const PersonSchema=new mongoose.Schema({
    name:{
        type:String,
        //mandatory
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        //optional field
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//pre is meddileware which execute before save operation

PersonSchema.pre('save',async function(next){
    const person=this;//storing all date in person
    //Hash the password only if it has been modified for is new
    if(!person.isModified('password')) return next();

    try{
        //hash password generation
        //generating the salt
        const salt=await bcrypt.genSalt(10);//10 is round figure number

        //hashing the password
        const hashedPassword=await bcrypt.hash(person.password,salt)
        person.password=hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

PersonSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};
//fist argument is collection name and second is the schema
//should be sigular
const Person=mongoose.model('Person',PersonSchema);
module.exports = Person;

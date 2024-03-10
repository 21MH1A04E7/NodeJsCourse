const passport=require('passport')
const LocalStrategy = require('passport-local').Strategy
const Person=require('../models/Person');


//username,password,doneCallback
passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try {
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
            return done(null, false, { message: "Incorrect Username" });
        }
        const isPasswordMatch=await user.comparePassword(password,user.password)
        if(isPasswordMatch) {
            return done(null,user)
        }else{
            return done(null,false,{message: "Incorrect Password"});
        }
    } catch (err) {
        return done(err);
    }
}));
//done(err,true/false,messa)

module.exports=passport
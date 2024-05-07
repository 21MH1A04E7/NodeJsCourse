const express=require('express');
const { handleSignup,handleSignin,handleSignout } = require('../controllers/user');
const router= express.Router();

router.post('/signup', handleSignup)
.post('/signin', handleSignin)
.get('/logout',handleSignout)

module.exports = router
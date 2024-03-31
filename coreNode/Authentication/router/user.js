const express=require('express');
const { handleuserSingup,handleuserLogin} = require('../controllers/user');

const router= express.Router();

router.post('/',handleuserSingup);
router.post('/login',handleuserLogin);

module.exports=router;
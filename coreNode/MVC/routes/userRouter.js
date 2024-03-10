const express = require('express')
const User=require('../models/user')

//improting the controllers
const {handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleDeleteUserById}=require('../controllers/user')
const router=express.Router()

router.route('/')
.post(handleCreateUser)
.get(handleGetAllUsers)

router.route('/:id')
.get(handleGetUserById)
.delete(handleDeleteUserById)

module.exports =router;
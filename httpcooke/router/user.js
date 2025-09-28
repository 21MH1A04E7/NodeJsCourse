const express = require('express')

const router=express.Router()

// GET request

router.get('/user', (req, res) => {
    console.log(req.session)
    console.log(req.sessionID)
    // res.cookie('token','cookie-secret',{maxAge:1000*10})
    res.cookie('token','cookie-secret',{maxAge:1000*60*5,signed:true})
    //modify session object
    req.session.visited=true
    res.json({
        message: 'User data retrieved successfully',
        user: {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com'
        }
    })
})

// POST request
module.exports =router
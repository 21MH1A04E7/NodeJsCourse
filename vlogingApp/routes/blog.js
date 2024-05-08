const express=require('express');
const verifytoken=require('../services/authentication')
const multer=require('multer')
const path=require('path')
const Blog=require('../models/vlog')
const router=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/upload`))
    },
    filename: function (req, file, cb) {
      const filename=`${Date.now()}-${file.originalname}`;
      cb(null,filename)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/addblog',verifytoken,(req,res)=>{
    res.render('addblog',{user:req.user})
})

router.post('/',verifytoken,upload.single("coverImageUrl"),async (req,res)=>{
    const {title,description}=req.body;
    const blog=await Blog.create({
        title,
        description,
        coverImageUrl:`/upload/${req.file.filename}`,
        createdBy:req.user._id
    })
    // console.log(blog)
    return res.redirect(`/blog/${blog._id}`)
})

module.exports = router
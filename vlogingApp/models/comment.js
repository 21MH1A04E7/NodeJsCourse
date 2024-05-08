const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }
},{timeseries:true})

const Comment=mongoose.model('Comment',commentSchema)
module.exports=Comment;
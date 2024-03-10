const mongoose = require('mongoose')

const candidateSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    party:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,//id provieded by the mongodb
                ref:'User',
                required:true
            },
            votedate:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    }
});

const Candidate=mongoose.model('Candidate',candidateSchema)
module.exports = Candidate; 
const express=require('express')
const Candidate=require('../model/candidate')
const User=require('../model/user')
const {jwtAuthMiddleware,generateToken}=require('../jwt')

const router=express.Router();
const checkAdmin=async (id)=>{
    try{
        const response=await User.findById(id);
        return (response.role==='admin')
    }catch{
        return false;
    }
}
router.post('/candidate',jwtAuthMiddleware,async (req,res)=>{
    try{
         // verifying the admin role
        if(!await checkAdmin(req.user.id)){
            return res.status(403).json({message:"you don't have admin role"})
        }
        const candidateData=req.body;
        const newCandidate=new Candidate(candidateData);
        const response=await newCandidate.save();
        res.status(201).json(response)
    }catch{
        console.log('internal server error')
        res.status(500).json({error:'internal server error'})
    }
})
router.put('/candidate/:candidateID', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(!await checkAdmin(req.user.id)){
            return res.status(403).json({message:"you don't have admin role"})
        }
        
        const candidateID = req.params.candidateID; // Extract the id from the URL parameter
        const updatedCandidateData = req.body; // Updated data for the person

        const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('candidate data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})
router.delete('/candidate/:candidateID', jwtAuthMiddleware, async (req, res)=>{
    try{
        if(!await checkAdmin(req.user.id)){
            return res.status(403).json({message:"you don't have admin role"})
        }
        
        const candidateID = req.params.candidateID; // Extract the id from the URL parameter
        const updatedCandidateData = req.body; // Updated data for the person

        const response = await Candidate.findByIdAndDelete(candidateID)
        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('candidate data deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports=router

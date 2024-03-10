const express=require('express');
const {jwtAuthMiddleware}=require('../jwt')
const Candidate=require('../model/candidate')
const User=require('../model/user')

const router=express.Router();

router.get('/vote/candidate',async (req,res)=>{
    try{
        const candidates=await Candidate.find();
        if(!candidates){
            return res.status(404).json({error:'no candidates found'});
        }
        const response=candidates.map((val)=>{
            return {
                name:val.name,
                party:val.party
            };
        })
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({error:error.message});
    }
})
router.get('/vote/live',async (req,res)=>{
    try{
        const response=await Candidate.find().sort({voteCount:-1});
        if(!response){
            return res.status(404).json({error:'no candidates found'});
        }
        const data=response.map((val,index)=>{
            return {
                name:val.name,
                party:val.party,
                voteCount:val.voteCount
            }
        })
        res.status(200).json(data);
    }catch(err){
        console.log('internal server error' + err);
        res.status(500).json({ error: `${err}` });
    }
})

router.get('/vote/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        const candidateId = req.params.candidateId;
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'candidate not found' });
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ message: 'You are not allowed to vote as admin' });
        }
        if (user.isVoted) {
            return res.status(400).json({ message: 'You are not allowed to vote again' });
        }
        console.log('hi');
        candidate.votes.push({ user: userId });
        candidate.voteCount++;
        user.isVoted = true;
        await candidate.save();
        await user.save();
        res.status(200).json({ message: 'voted' });
    } catch (err) {
        console.log('internal server error' + err);
        res.status(500).json({ error: `${err}` });
    }
});

module.exports=router;


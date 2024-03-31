const Url=require('../models/url')
const shortid=require('shortid')
async function handelGenerateNewShortURL(req,res){
    try{
        const givenUrl=req.body.url;
        if(!givenUrl) return res.status(400).json({error:"url is required"})
        const shortID=shortid();
        await Url.create({
            shortId:shortID,
            redirectUrl:givenUrl,
            visitHistory:[]
        })
        return res.render("index",{id:shortID})
        res.status(200).json({id:shortID})
    }catch(err){
        console.log('Internal sever error', err);
        res.status(500).json({message: err});
    }
}

async function handelGetByShortId(req,res){
    try{
        const shortID=req.params.shortId;
        const response = await Url.findOneAndUpdate({shortId:shortID},{
            $push:{
                visitHistory:{
                    timestamp:Date.now()
                }
            }
        })
        if(!response)  return res.status(404).json({msg:"not found"})
        res.redirect(response.redirectUrl)
    }catch(err){
        console.log('Internal sever error', err);
        return res.status(500).json({message: err});
    }
}

async function handelGetAnalytics(req,res){
    try{
        const shortID=req.params.shortId;
        const response = await Url.findOne({shortId:shortID})
        if(!response)  return res.status(404).json({msg:"not found"})
        return res.status(200).json({totalClicks:response.visitHistory.length,
            analytics:response.visitHistory
        })
    }catch(err){
        console.log('Internal sever error', err);
        return res.status(500).json({message: err});
    }
}

module.exports={
    handelGenerateNewShortURL,
    handelGetByShortId,
    handelGetAnalytics,
}
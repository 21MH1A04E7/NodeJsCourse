const express=require('express');
const {verifyToken}=require('../service/verifyToken')
const {handelGenerateNewShortURL,handelGetByShortId, handelGetAnalytics,handelGetAllUrlForSSR}=require('../controllers/url')

const router=express.Router();

router.post('/',verifyToken,handelGenerateNewShortURL)
router.get('/:shortId',handelGetByShortId)
router.get('/analytics/:shortId',handelGetAnalytics)

module.exports=router;
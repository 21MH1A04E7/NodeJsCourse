const express=require('express');
const {handelGenerateNewShortURL,handelGetByShortId, handelGetAnalytics,handelGetAllUrlForSSR}=require('../controllers/url')

const router=express.Router();

router.post('/',handelGenerateNewShortURL)
router.get('/:shortId',handelGetByShortId)
router.get('/analytics/:shortId',handelGetAnalytics)

module.exports=router;
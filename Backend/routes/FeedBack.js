const express=require('express')

const router=express.Router();

const {PostRating,getAllFeedback}=require('../controller/RatingAndFeed')

router.post('/FeedBack',PostRating);
router.get('/FeedBack/:id',getAllFeedback);


module.exports=router;


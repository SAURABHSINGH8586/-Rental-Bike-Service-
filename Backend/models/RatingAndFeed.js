const mongoose=require('mongoose');

const ratingSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    bike_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"bikess",
        required:true,
    },
    rating:{
        type:Number,
        required:true,

    },
    comment:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    }
    
})


const rating=mongoose.model("rating",ratingSchema);
module.exports=rating;
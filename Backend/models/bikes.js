const mongoose=require('mongoose');

const bikeSchema=new mongoose.Schema({
    image_url:{
        type:String,
        required:true,
        
    },
    pricePerHour:{
       type:Number,
       required:true,
    },
    milege:{
        type:String,
        required:true,
    },
    

})

const bikes=mongoose.model("bikes",bikeSchema);
module.exports=bikes;


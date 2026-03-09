const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
    },
    bike_id:{
        type:String,
        required:true,
    },
    pickup_time:{
        type:Date,
        required:true,
    },
    return_time:{
        type:Date,
        required:true,
    },
    total_price:{
        type:String,
        required:true,
    },
    status: {
     type: String,
     enum: ["Active", "Completed", "Cancelled"],
     default: "Active"
}
})

const book=mongoose.model("book",bookingSchema);
module.exports=book;

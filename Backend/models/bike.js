const mongoose=require('mongoose');

const bikesSchema=new mongoose.Schema({
    model:{
        type:String,
        required:true,
    },
    number_plate:{
        type:String,
        required:true,
    },
    bike_type:{
        enum:["scooter","sports","cruiser"],
        required:true,
        type:String
    },
    State:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pricePerHour:{
        type:String,
        required:true,
    },
    availability_status:{
        enum:["Availble","Not Availble"],
        required:true,
        type:String,
    },
    image_url: {
    type: String,
    required: true
   },
    milege:{
        type:String,
        required:true,
    },

})

const bikess=mongoose.model("bikess",bikesSchema);
module.exports=bikess;






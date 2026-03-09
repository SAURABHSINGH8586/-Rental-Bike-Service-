const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
  
   phone:{
    type:Number,
    required:true,
   },

   licenceNumber:{
    type:Number,
    required:true,
   },

   firstName : {
        type : String,
        required : true  ,
        trim : true , 
    },
    lastName: {
         type : String ,
         trim : true ,
    } ,
    email: {
         type : String ,
        required : true  ,
        trim : true ,

    },
    password: {
         type : String ,
        required : true  ,
    },
    accountType : {
        type : String ,
        enum : ["Admin" , "Biker" ,] ,
        required : true ,   
    },

    token:{
        type: String ,
    },
    image:{
        type : String  ,
        required : true ,
    },
  

    

})

const User=mongoose.model("User",userSchema);
module.exports=User;






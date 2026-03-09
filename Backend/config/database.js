const mongoose =require('mongoose');
require("dotenv").config();
const connectwithDb=()=>{
      mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
      })
      .then(console.log("DB CONNECTED SUCCCESFULLY"))
      .catch((error)=>{
        console.log("DB facing issue");
        console.log(error)
        process.exit(1);
      })
}

module.exports=connectwithDb

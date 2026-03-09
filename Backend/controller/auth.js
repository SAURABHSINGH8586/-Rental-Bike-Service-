const User = require("../models/user") ;

const Profile = require("../models/Profile");
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const { link } = require("../routes/User");
require("dotenv").config() ; 

exports.signUp = async(req , res) => {
    try{
    const { 
        firstName ,
        lastName ,
        email,
        password , 
        confirmPassword , 
        accountType ,  
        phone,
        licenceNumber,
    
    } = req.body ;

console.log("1st")

    if(!firstName || !lastName || !email || !password || !confirmPassword || !phone || !licenceNumber)
        {
        return res.status(403).json({
            success : false ,
            message : "All fields are required" ,
        })
    }

    if(password != confirmPassword) {
        return res.status(400).json({
            success: false ,
            message : "password & confirmPassword didnt matched" ,
        });
    }

    const existingUser = await User.findOne({email}) ;
    if(existingUser) {
        return res.status(400).json({
            succes: false, 
            message : 'User is already Registered' ,
        })  ;
    }
    
console.log("2nd")
   
    const hashedpassword = await bcrypt.hash(password , 10) ;

const profileDetails =  await Profile.create({
    gender : null ,
    dateOfBirth : null ,
    about : null ,
    contactNumber : null ,
}) ;


     const user  = await User.create({
        firstName , 
        lastName ,
        email,
        password : hashedpassword ,
        accountType ,
        image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}` ,
        licenceNumber,
        phone,


     })
    console.log("5th")
     return res.status(200).json({
        success : true ,
        message :'User is Registered ',
        user ,

     }) ;
     console.log("6th")
    }
    catch(error){
        console.log(error) ; 
        return res.status(500).json({
            success : false ,
            message : "User cannot be registered  !!!  please try again " ,
        }) ;

    }
}










exports.login = async(req , res) => {
    try{
        const {email , password} = req.body ;
        if(!email || !password){
            return res.status(403).json({
                success : false ,
                message : "All fields are Required" ,
            }) ;
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                 success: false ,
                 message : "NO Account found . Please Create a New Account " ,
            }) ;
        }

        if(await bcrypt.compare(password , user.password)) {
            const payload  = {
                email : user.email ,
                id : user.id ,
                accountType : user.accountType,
                
            }

            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn : "2h" ,
            }) ;

            user.token = token ;
            user.password = undefined ;


            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true ,
	            secure: true  ,       
               sameSite: "None",   
            }


           return res.cookie("token" , token  , options).status(200).json({
                success : true ,
                token , 
                user,
                message : "Logged In Successfully !!" ,
            }) ;
        }
        else{
            return res.status(401).json({
                success : false ,
                message : "Password not Matched" ,
            }) ;

        }


    }
    catch(error){
        console.log(error) ;
        return res.status(500).json({
            success : true ,
            message : "Login Failure ...try Again !!"
        }); 

    }
}





exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate();
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
      alldata
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch profile. Please try again later.",
    });
  }
};







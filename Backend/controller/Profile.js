const Profile  = require("../models/Profile");
const User  = require("../models/user") ;
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.updateprofile = async (req , res) =>{
try{
    const {dateOfBirth ="" , about="" , contactNumber , gender} = req.body ;
    const id = req.user.id ;

    if(!contactNumber || !gender || !id){
        return res.status(400).json({
            success : false ,
            message : "All firlds are required !!" ,
        });
    }
    const userDetails = await User.findById(id) ;
    const profileId = userDetails.additionalDetails ;
    const profileDetails = await Profile.findById(profileId) ;

    
    profileDetails.dateOfBirth = dateOfBirth ;
    profileDetails.about = about ;
    profileDetails.gender = gender ;
    profileDetails.contactNumber = contactNumber ;
    await profileDetails.save() ;

    const updatedUser = await User.findById(id).populate("additionalDetails");
    return res.status(200).json({
        success : true ,
        message : "profile updated successfully" ,
        profileDetails ,
    }) ;

}
catch(error){
    console.log(error) ;
    return res.status(500).json({
        success : false ,
        message : "can not update profile "

})
}

}


exports.deleteAccount = async (req ,res) => {
    try{
        const id  = req.user.id ;
        const userDetails = await User.findById(id) ;
        if(!userDetails){
            return res.status(404).json({
                success : false ,
                message : "User not found !"  ,
            });
        }



        await Profile.findByIdAndDelete({_id :userDetails.additionalDetails} ) ;


        await User.findByIdAndDelete({_id : id});

        return res.status(200).json({
            success : true ,
            message  : "account deleted successfully " ,
        }) ;

    }
    catch(error){
        console.log(error) ;
        return res.status(500).json({
            success : false ,
            message : "can not delete account" ,
        })
    }
}




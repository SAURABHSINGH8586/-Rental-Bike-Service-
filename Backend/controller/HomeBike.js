const Bike=require('../models/bikes');
const mongoose=require('mongoose');
const User=require('../models/user');

const HomeBike=async (req,res)=>{
    try{
     const {image_url,pricePerHour,milege}=req.body;
     if(!image_url || !pricePerHour || !milege){
        return res.status(400).json({
            success:false,
            message:"All field are required",
        })
     }
     const checkisAdmin = await User.find({ accountType: 'Admin' });
     if(!checkisAdmin){
        return res.status(400).json({
            success:false,
            message:"You are not admin and you can not create bike collection"
        })
     }
    const createBike=Bike.create({
        image_url,
        pricePerHour,
        milege,
    })

    const BikeId=createBike._id;
    return res.status(200).json({
        success:true,
        message:"Bike colllection successfully created",
        BikeId,
    })

    }
    catch(error){
       return res.status(400).json({
        success:false,
        message:error.message,
       })
    }
}


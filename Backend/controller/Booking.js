const SingleBikes=require('../models/bike');
const User=require('../models/user');
const booking=require('../models/booking');
const bikess=require('../models/bike');
const { mongoose } = require('mongoose');

exports.Booking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid Bike ID"
    });
  }



  try {
    const bike = await SingleBikes.findById(id);
    if (!bike) {
      return res.status(404).json({ success: false, message: "Bike not found" });
    }

    let { user_id, pickup_time, return_time, total_price, status } = req.body;

    if (!user_id) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    user_id = user_id.trim();

    const booki = await booking.create({
      user_id,
      bike_id: id,
      pickup_time,
      return_time,
      total_price,
      status
    });

    

    return res.status(200).json({
      success: true,
      message: "Booking created",
      booking: booki
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Booking creation failed"
    });
  }
};




exports.AllBooking=async(req,res)=>{
     try{
       const allBikes=await booking.find({});
       return res.status(200).json({
         success:true,
         message:"Mil gya",
         allBikes
       }) 
     }
     catch(error){
        return res.status(400).json({
            success:false,
            message:"ALl bike booking are failed"
        })
    }
}


exports.forUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID"
    });
  }

  console.log(id);
  
  try {
    const userBookings = await booking.find({ user_id: id });
    let ids = [];
    for(let i = 0;i<userBookings.length;i++){
      userBookings[i].bike_id;
      console.log(userBookings[i].bike_id);
      ids.push(userBookings[i].bike_id);
    }

    const bikeBookings = await bikess.find({
      _id:{$in:ids}
    })

    
    
    








    if (userBookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this user"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User bookings fetched successfully",
      bookings: userBookings,
      bikeBookings
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user bookings"
    });
  }
};



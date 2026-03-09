const User = require('../models/user');
const Bikes = require('../models/bike');
const Rating = require('../models/RatingAndFeed'); 

exports.PostRating = async (req, res) => {
  try {
    const { user_id, bike_id, rating, comment, date } = req.body;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ 
        status: false,
         message: "User not found" 
        });
    }

    const bike = await Bikes.findById(bike_id);
    if (!bike) {
      return res.status(404).json({ 
        status: false, 
        message: "Bike not found" 
    });
    }

    const newRating = Rating.create({
      user_id,
      bike_id,
      rating,
      comment,
      date
    });


    res.status(201).json({
      status: true,
      message: "Rating submitted successfully",
      data: newRating
    });

  } catch (error) {
    console.error("Error in PostRating:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};


exports.getAllFeedback=async (req,res)=>{
    try{
    const bike_id=req.body; 
    const bike = await Bikes.findById(bike_id);
    if (!bike) {
      return res.status(404).json({ 
        status: false, 
         message: "Bike not found" 
      });
    }
     const getallfeedback=await Rating.find({});
     if(!getallfeedback){
        return res.status(400).json({
            success:false,
            message:"Not any feedback",
        })
     }
     return res.status(200).json({
        success:true,
        message:"true",
        data:getallfeedback,
     })
    }
    catch(error){
       return res.status(404).json({
        success:false,
        message:"Something Error",
       })
    }
}
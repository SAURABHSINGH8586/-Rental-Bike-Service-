const User = require('../models/user');
const Bikes= require('../models/bike')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2;

function isfiletypesupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadfilecloudinary(file, folder,quality) {
    const options = { folder };
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options)

}

exports.createSingleBike = async (req, res) => {
    try {
        console.log("Form data:", req.body);
        console.log("File uploaded:", req.files);

        const {
            model,
            number_plate,
            bike_type,
            State,
            city,
            pricePerHour,
            availability_status,
            milege
        } = req.body;

        const uploadedImage = req.files.imagefile;
        console.log(uploadedImage);

        const supportedFiles = ["jpeg", "jpg", "png"];
       const filetype = uploadedImage.name.split('.').pop().toLowerCase();
        if (!isfiletypesupported(filetype, supportedFiles)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }

        const response = await uploadfilecloudinary(uploadedImage, "uploadnew");
        console.log(response);

        
        const checkIsAdmin = await User.findOne({ accountType: 'Admin' }); 

 
        if (!checkIsAdmin) {
            return res.status(403).json({
                success: false,
                message: "Only admin can create bike collection"
            });
        }

        await Bikes.create({
            model,
            number_plate,
            bike_type,
            State,
            city,
            pricePerHour,
            availability_status,
            image_url:response.secure_url,
            milege, 
        });

        return res.status(200).json({
            success: true,
            message: "Bike Collection successfully created"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Bike collection creation failed"
        });
    }
};




exports.GetAllBikes=async(req,res)=>{
    try{
           const GetAlBikes= await Bikes.find({});

            return res.status(200).json({ 
                status:true,
                message:"Mil gya",
                GetAlBikes})
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"ALl bike collection are failed"
        })
    }
}



exports.getSingle = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Bike ID"
        });
    }

    try {
        const GetsingleBike = await Bikes.findById(id);

        if (!GetsingleBike) {
            return res.status(404).json({
                success: false,
                message: "Bike not found"
            });
        }

        return res.status(200).json({
            success: true,
            GetsingleBike
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching bike"
        });
    }
};



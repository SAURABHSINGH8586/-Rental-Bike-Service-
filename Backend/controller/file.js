const File = require('../models/file');
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

exports.imageupload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

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

        // Example DB Entry (uncomment and customize as needed)
        const filedata = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            message: "Image successfully uploaded"
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
};




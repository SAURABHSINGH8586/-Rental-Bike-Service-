const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
    imageUrl: {
        type: String, 
    }
});


module.exports = mongoose.model("File", fileSchema);


fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);
        //transpoter
         
        let info = await transpoter.sendMail({
            from:`Codehelp by Babbar`,
            to:doc.email,
            subject:"New file uploaded on cloudnary",
            html:`<h2>Hello ji kaise ho</h2> <p> File uoloase view here :<a href="${doc.imageurl}">${doc.imageurl}</a></p>`

           

        })
    }
    catch (error){
      console.error(error);
      
    }
})


const file=mongoose.model("File",fileSchema);
module.exports=file;


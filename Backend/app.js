const express=require('express');
const app=express();
require("dotenv").config();
const cors=require('cors');
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose=require('mongoose');

const user=require('./routes/User');
const bikes=require('./routes/bikes');
const feedback=require('./routes/FeedBack');
const stateRoutes = require('./routes/State');
const city=require('./routes/city');
const book=require('./routes/booking');



const connectwithDb=require("./config/database");
connectwithDb();
const PORT=process.env.PORT || 5000;
// app.listen(PORT,()=>{
//     console.log(`App is stated at ${PORT}`);
// })

app.get("/",(req,res)=>{
    res.send(`<h1> Desh ji kaise ho</h1>`);
})

const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
cloudinaryConnect();
app.use('/ap1/v1/auth',user);
app.use('/ap1/v1/bikes',bikes);
app.use('/ap1/v1/Feed',feedback);
app.use('/ap1/v1/State', stateRoutes);
app.use('/ap1/v1/city',city);
app.use('/ap1/v1/booking',book);

module.exports = app;










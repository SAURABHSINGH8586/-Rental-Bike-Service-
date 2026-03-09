const express=require('express');
const router=express.Router();
const {imageupload}=require("../controller/file");

router.post("/imageupload",imageupload);

module.exports=router;
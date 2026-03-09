const express = require('express');
const router = express.Router();

const { createSingleBike ,GetAllBikes, getSingle} = require('../controller/SingleBike');
const {auth,Biker,isAdmin}=require("../middlewares/auth");
router.post('/bike',auth,isAdmin,createSingleBike); 
router.get('/bike',  GetAllBikes);
router.get('/bike/:id',getSingle);

router.get('/verify',isAdmin);
module.exports = router;


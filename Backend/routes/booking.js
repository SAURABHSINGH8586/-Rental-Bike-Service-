const express = require('express');
const router = express.Router();

const {Booking,AllBooking,forUser} = require('../controller/Booking');

router.post('/book/:id', Booking); 
router.get('/book',  AllBooking);
router.get('/book/:id',forUser);
module.exports = router;

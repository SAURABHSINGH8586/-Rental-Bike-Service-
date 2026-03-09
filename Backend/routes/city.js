const express = require('express');
const router = express.Router();
const city = require('../controller/city');

router.get('/city', city.getAllcity);

router.post('/city', city.addCity);


module.exports = router;


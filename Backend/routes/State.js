const express = require('express');
const router = express.Router();
const stateController = require('../controller/State');

router.get('/states', stateController.getAllStates);

router.post('/states', stateController.addStates);


module.exports = router;

const express = require('express');
const router = express.Router();

const carInsuranceController = require('../controllers/car_insurance');

//Handle incoming POST requests for car insurance
router.post('/car-insurance', carInsuranceController.postInsuranceQuote);

module.exports = router;

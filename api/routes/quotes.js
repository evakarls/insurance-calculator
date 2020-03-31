const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const carInsuranceController = require('../controllers/car_insurance');
const CarInsurance = require('../models/car_insurance');

//Handle incoming POST requests for car insurance
router.post('/car-insurance', [
  //check validity of the input
  check('driver_birthdate', 'Driver bithday is required').exists(),
  check('car_value', 'Car value is required and must be a float').exists().isFloat({ gt: 0.0 })], carInsuranceController.postInsuranceQuote);

module.exports = router;

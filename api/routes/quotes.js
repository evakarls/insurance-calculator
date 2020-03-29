const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const carInsuranceController = require('../controllers/car_insurance');
const CarInsurance = require('../models/car_insurance');

//Handle incoming POST requests for car insurance
router.post('/car-insurance', [
  //check validity of the input
  check('driver_birthdate', 'Driver bithday is required').exists(),
  check('car_value', 'Car value is required and must be a float').exists().isFloat()],
  (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  console.log(req.body.car_value + ' line 5')
  console.log(req.body.driver_birthdate + ' line 6')
  let car_value = req.body.car_value
  console.log(car_value + ' line 8')
  let driver_birthdate = req.body.driver_birthdate
  console.log(driver_birthdate + ' line 10')

  //pass the input to the car insurance calculator
  const carInsurance = new CarInsurance;
  const results = carInsurance.calculateInsurance(driver_birthdate, car_value);
  console.log(JSON.stringify(results) + ' line 9 in controller')

  res.status(200).json({
    success: true,
    message: "quote successfully computed",
    data: results
  });
  return
  res.status(400).json({
    success: false,
    message: "parameters missing or incorrect values"
  });
  return
});

   // carInsuranceController.postInsuranceQuote);

module.exports = router;

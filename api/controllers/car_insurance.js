const CarInsurance = require('../models/car_insurance');
const { check, validationResult } = require('express-validator');

exports.postInsuranceQuote = (req, res, next) => {

  //display error message if input is missing or invalid
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false,
      message: "parameters missing or incorrect values" });
  }

  let car_value = req.body.car_value
  let driver_birthdate = req.body.driver_birthdate

  //pass the input to the car insurance calculator module
  const carInsurance = new CarInsurance;
  const results = carInsurance.calculateInsurance(driver_birthdate, car_value);
  const age = results.age

  //include results in response if quote successfully computed, else return an error message
  if (isNaN(age) ) { res.status(400).json({
    success: false,
    message: "parameters missing or incorrect values"
  });
    return
  } else {
    res.status(200).json({
      success: true,
      message: "quote successfully computed",
      data: results.data
    });
    return
  };
};

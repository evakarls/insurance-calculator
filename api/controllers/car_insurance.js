// const CarInsurance = require('../models/car_insurance');
// const { check, validationResult } = require('express-validator');

// exports.postInsuranceQuote = (req, res, next) => {
//   //check validity of the input
//   check('driver_birthdate', 'Driver bithday is required').exists()
//   check('car_value', 'Car value is requred and must be a float').exists().isFloat()

//   console.log(req.body.car_value + ' line 5')
//   console.log(req.body.driver_birthdate + ' line 6')
//   let car_value = req.body.car_value
//   console.log(car_value + ' line 8')
//   let driver_birthdate = req.body.driver_birthdate
//   console.log(driver_birthdate + ' line 10')
//   // let request = JSON.stringify(req.body);
//   // console.log(request + ' stringified line 8')
//   // let requestNew = JSON.parse(request);
//   // console.log(requestNew + ' parsed line 10');
//   // let driver_birthdate = requestNew["driver_birthdate"];
//   // let car_value = requestNew["car_value"];
//   // console.log(request + ' line 13')
//   // console.log(car_value + ' line 14')

//   //pass the input to the car insurance calculator
//   const carInsurance = new CarInsurance;
//   const results = carInsurance.calculateInsurance(driver_birthdate, car_value);
//   console.log(JSON.stringify(results) + ' line 9 in controller')

//   res.status(200).json({
//     success: true,
//     message: "quote successfully computed",
//     data: results
//   });
//   return
//   res.status(400).json({
//     success: false,
//     message: "parameters missing or incorrect values"
//   });
//   return
// };

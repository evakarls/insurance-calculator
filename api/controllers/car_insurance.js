const CarInsurance = require('../models/car_insurance');

exports.postInsuranceQuote = (req, res, next) => {
  const carInsurance = new CarInsurance;
  const data = carInsurance.calculateInsurance(req.body.driver_birthdate, req.body.car_value);
  console.log(JSON.stringify(data) + ' line 6 in controller')

  res.status(200).json({
    success: true,
    message: "quote successfully computed",
    data: data
  });
  return
  res.status(400).json({
    success: false,
    message: "parameters missing or incorrect values"
  });
  return
};

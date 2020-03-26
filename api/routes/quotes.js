const express = require('express');
const router = express.Router();

//Handle incoming POST requests for car insurance
router.post('/car-insurance', (req, res, next) => {
  const userDetails = {
    driver_birthdate: req.body.driver_birthdate,
    car_value: req.body.car_value
  };
  res.status(200).json({
    success: true,
    message: "quote successfully computed",
    data: {
      "eligible": "eligible-placeholder",
      "premiums": {
        "civil_liability": 1000.00,
        "omnium": 704.2
      }
    }
  });
  res.status(400).json({
    success: false,
    message: "parameters missing or incorrect values"
  });
});

module.exports = router;

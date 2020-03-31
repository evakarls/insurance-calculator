//Module for calculating the car insurance based on given parameters
const moment = require('moment');

module.exports = class CarInsurance {
    constructor() {};

  calculateInsurance(driver_birthdate, car_value) {

    let age = [];
    let driverLiability = [];
    let driverOmnium = [];
    let data = {};
    let value = car_value;

    //Caculates the age of the driver
    function getDriverAge(driver_birthdate) {
      const today = new Date();
      const dateMomentObject = moment(driver_birthdate, "DD/MM/YYYY");
      const birthday = dateMomentObject.toDate() //converting date into correct format
      age = today.getFullYear() - birthday.getFullYear();
      const month = today.getMonth() - birthday.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
          age--;
      };
      return age;
    };

    //Calculates civil liablity costs for the driver. Costs 1000/year for drivers
    //25 years and younger. Costs 500 for drivers 26 years and older.
    function calculateCivilLiability(age) {
      let civilLiability = []
      if (age <= 25) {
        civilLiability = 1000.00
      } else {
        civilLiability = 500.00
      };
      return civilLiability
    };

    //Calculates omnium (protects the car in case of damage). Costs 3% of car value.
    function calculateOmnium(value) {
      let omnium = (value * 0.03).toFixed(2)
      return omnium
    };

    //Function only calls calculateCivilLiability() and caclulateOmnium() if driver >== 18
    age = getDriverAge(driver_birthdate);
    if (age > 17) {
      driverLiability = calculateCivilLiability(age);
      driverOmnium = calculateOmnium(value);
      data = {"eligible": "true", "premiums": {"civil_liability": driverLiability, "omnium": driverOmnium}};
    } else {
      data = {"eligible": "false", "premiums": null}
    };
    return { data, age }
  };
};

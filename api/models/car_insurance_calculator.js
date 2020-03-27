//Module for calculating the car insurance based on given parameters

class CarInsuranceCalculator {
  constructor(driver_birthdate, car_value) {
    this.driver_birthdate = driver_birthdate
    this.car_value = car_value
  }

  calculateInsurance(driver_birthdate, car_value) {

    let age = [];
    let driverLiability = [];
    let driverOmnium = [];
    let data = {};

    getDriverAge(driver_birthdate) { //Cacluates the age of the driver
      const today = new Date()
      const birthday = new Date(driver_birthdate)
      age = today.getFullYear() - birthday.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    }

    //Calculates civil liablity costs for the driver. Costs 1000/year for drivers
    //25 years and younger. Costs 500 for drivers 26 years and older.
    calculateCivilLiability(age) {
      let civilLiability = []
      if age <= 25 {
        civilLiability = 1000.00
      }
      else  {
        civilLiability = 500.00
      }
      return civilLiability
    }

    //Calculates Omnium (protects the car in case of damage). Costs 3% of car value.
    calculateOmnium(car_value) {
      let omnium = (car_value * 0.03).toFixed(2)

      return omnium
    }

    //function only calls calculateCivilLiability() and caclulateOmnium() if driver > 18
    age = getDriverAge(driver_birthdate);
    if age > 18 {
      driverLiability = calculateCivilLiability(age);
      driverOmnium = calculateOmnium(carValue);
      data = {"eligible": "true", "premiums": {"civil_liability": driverLiability, "omnium": driverOmnium}};
    }
    else {
      data = {"eligible": "false", "premiums": null}
    }
    return data
  }
}

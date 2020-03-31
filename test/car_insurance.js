const chai = require("chai");
const should = chai.should;
const expect = chai.expect
const chaiAlmost = require('chai-almost');

chai.use(chaiAlmost(0.1));

const CarInsurance = require('../api/models/car_insurance');
const carInsurance = new CarInsurance

describe('Car insurance calculator test', function () {
  const stubValue = {
    car_value: 20000.0,
    driver_birthdate: "04/11/1987"
  };
  it("should find the driver's age", function (done) {
    results = carInsurance.calculateInsurance("04/11/1987", 20000.0)
    results.age.should.equal(32)
      done();
    });

  it("eligible should be false if driver is under 18", function (done) {
    results = carInsurance.calculateInsurance("01/01/2003", 20000.0)
    results.data.eligible.should.equal("false")
      done();
    });

  it('should calculate civil liability of 1000 eur if driver is between 18 and 25', function (done) {
    results = carInsurance.calculateInsurance("01/01/2002", 20000.0)
    results.data.eligible.should.equal("true")
    results.data.premiums.civil_liability.should.equal(1000)
      done();
    });

  it('should calculate civil liability of 500 eur if driver is over 25', function (done) {
    results = carInsurance.calculateInsurance("01/01/1992", 20000.0)
    results.data.eligible.should.equal("true")
    results.data.premiums.civil_liability.should.equal(500)
      done();
    });

  it('should calculate omnium if driver is 18 or older', function (done) {
    results = carInsurance.calculateInsurance("04/11/1987", 20000.0)
    results.data.eligible.should.equal("true")
    results.data.premiums.omnium.should.equal("600.00")
      done();
    })
});

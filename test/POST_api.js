const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
chai.use(chaiHttp);

chai.use(chaiHttp)

describe('/POST API test', function () {
  it('should fail if no input', function (done) {
    chai.request(server).post('/api/v1/quote/car-insurance').send({}).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('parameters missing or incorrect values');
      done();
    })
  })
  it('should fail if driver_birthdate is missing', function (done) {
    chai.request(server).post('/api/v1/quote/car-insurance').send({car_value: 20000.00}).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('parameters missing or incorrect values');
      done();
    })
  });

  it('should fail if car_value is missing', function (done) {
    chai.request(server).post('/api/v1/quote/car-insurance').send({driver_birthdate: "04/11/1987"}).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('parameters missing or incorrect values');
      done();
    })
  });

  it('should fail if car_value is not a float', function (done) {
    chai.request(server).post('/api/v1/quote/car-insurance').send({car_value: "test", driver_birthdate: "04/11/1987"}).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('parameters missing or incorrect values');
      done();
    })
  });

  it('should fail if driver_birthdate is not a string', function (done) {
    chai.request(server).post('/api/v1/quote/car-insurance').send({car_value: 20000.0, driver_birthdate: 2345 }).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('parameters missing or incorrect values');
      done();
    })
  });

  it('should fail if driver_birthdate is not "DD/MM/YYYY"', function (done) {
    chai.request(server).post('/api/v1/quote/car-insurance').send({car_value: 20000.0, driver_birthdate: "test" }).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('parameters missing or incorrect values');
      done();
    })
  });

  it('should return premiums if input is valid and driver is over 18 {car_value: 2000.00, driver_birthdate: "04/11/1987"}', function (done) {
    chai.request(server).post('/api/v1/quote/car-insurance').send({car_value: 20000.00, driver_birthdate: "04/11/1987"}).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('quote successfully computed');
      res.body.should.have.property('success');
      res.body.should.have.property('success').eql(true);
      res.body.should.have.property('data');
      res.body.should.have.property('data').eql({"eligible":"true","premiums":{"civil_liability":500,"omnium":"600.00"}});
      done();
    })
  });

  it('should return not eligible if input is valid and driver is 18 or younger {car_value: 2000.00, driver_birthdate: "04/11/2004"}', function (done) {
    chai.request(server).post('/api/v1/quote/car-insurance').send({car_value: 20000.00, driver_birthdate: "04/11/2004"}).end((err, res) => {
      should.not.exist(err);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('message').eql('quote successfully computed');
      res.body.should.have.property('success');
      res.body.should.have.property('success').eql(true);
      res.body.should.have.property('data');
      res.body.should.have.property('data').eql({"eligible":"false","premiums":null});
      done();
    })
  });

});

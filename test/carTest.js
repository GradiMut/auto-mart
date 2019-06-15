/* eslint-disable no-undef */
// jshint esversion : 6
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../app');

const id = 1;

// configure chai
chai.use(chaiHtpp);
chai.should();

// Everything dealing with cars
// Add a car sale ad
describe('Create a car sale ad', () => {
  it('should add car sale ad', (done) => {
    const car = {
      id: 1,
      owner: 5,
      state: 'new',
      status: 'available',
      createdOn: '2008-05-05',
      price: 100000,
      make: 'Toyota',
      model: '2009 Toyota',
      bodyType: 'Car',
      imgUrl: 'https://google.con',
      description: 'Lorem ipseum',
    };
    chai.request(app)
      .post('/api/v1/AddCar')
      .send(car)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});

// Get a single car
describe('get car by id', () => {
  it('should get a single cars', (done) => {
    chai.request(app)
      .get(`/api/v1/getCarById/${id}`)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});
// get body type car
describe('get car by body type', () => {
  it('should get cars by body car', (done) => {
    chai.request(app)
      .get('/api/v1/getCarByBodyType/toyota')
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});
// Search car within min price range
describe('Search car within price range and manufacture', () => {
  it('should get car within price range and manufacture', (done) => {
    chai.request(app)
      .get('/api/v1/searchCarBy/available/500/1000/toyota')
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});

// Get unsold car (available)
describe('get car by status', () => {
  it('should get a available cars', (done) => {
    chai.request(app)
      .get('/api/v1/getCarByStatus/available')
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});

// Mark car as sold
describe('Mark car as sold', () => {
  it('should mark car as sold', (done) => {
    const car = {
      id: 1,
      owner: 5,
      state: 'new',
      status: 'sold',
      createdOn: '2008-05-05',
      price: 100000,
      make: 'Toyota',
      model: '2009 Toyota',
      bodyType: 'Car',
      imgUrl: 'https://google.con',
      description: 'Lorem ipseum',
    };
    chai.request(app)
      .patch(`/api/v1/markAsSold/${id}`)
      .send(car)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});

// Update price of the car
describe('Update price of the posted car', () => {
  it('owner should be able to update price of his/her car', (done) => {
    const car = {
      id: 1,
      owner: 5,
      state: 'new',
      status: 'sold',
      createdOn: '2008-05-05',
      price: 100000,
      make: 'Toyota',
      model: '2009 Toyota',
      bodyType: 'Car',
      imgUrl: 'https://google.con',
      description: 'Lorem ipseum',
    };
    chai.request(app)
      .patch('/api/v1/updatePrice/1')
      .send(car)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});

// delete a car test
describe('delete a car', () => {
  it('should delete car record', (done) => {
    chai.request(app)
      .delete(`/api/v1/deleteCar/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});

// Get all car (sold, unsold)
describe('Get all car', () => {
  it('should get all car record', (done) => {
    chai.request(app)
      .get('/api/v1/getAllCar')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});

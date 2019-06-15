/* eslint-disable no-undef */
// jshint esversion : 6
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../app');

const id = 1;

// configure chai
chai.use(chaiHtpp);
chai.should();

// create a purchase order
describe('Create a purchase order', () => {
  it('user should purchase order', (done) => {
    const order = {
      id: 1,
      buyer: 5,
      carId: 3,
      price: 10000,
      priceOffered: 5000,
      status: 'pending',
      createdOn: '2008-05-09',
    };
    chai.request(app)
      .post('/api/v1/makeAnOffer')
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});

// update price
describe('Update price of the purchase order in pending', () => {
  it('buyer should be able to update the price of the order', (done) => {
    const order = {
      id: 1,
      buyer: 4,
      carId: 5,
      price: 10000,
      priceOffered: 1000,
      newPriceOffered: 500,
      status: 'pending',
      createdOn: '2008-06-09',
    };
    chai.request(app)
      .patch(`/api/v1/updateOrderPrice/${id}`)
      .send(order)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});

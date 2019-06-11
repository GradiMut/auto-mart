/* eslint-disable no-undef */
// jshint esversion : 6
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../app');

const id = 1;

// configure chai
chai.use(chaiHtpp);
chai.should();

describe('Get all user', () => {
  // Test to get all users
  it('should get all user record', (done) => {
    chai.request(app)
      .get('/api/v1/getAllUsers')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});
// Get a unique user user
describe('Get user by id', () => {
  it('should get all user record', (done) => {
    chai.request(app)
      .get(`/api/v1/getUserById/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});

//  add user
describe('Sign in a user', () => {
  it('user should be able to singin', (done) => {
    const user = {
      token: '45erkjherht45495783',
      id: `${id}`,
      email: 'johndoe@gmail.com',
      firstName: 'john',
      lastName: 'doe',
      password: 'johnpassword',
      address: 'Congo, DRC',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/singIn')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});
//  add user
describe('Sing up a user', () => {
  it('should add user record', (done) => {
    const user = {
      id: 1,
      email: 'johndoe@gmail.com',
      firstName: 'john',
      lastName: 'doe',
      password: 'johnpassword',
      address: 'Congo, DRC',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/singUp')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});
//  update user
describe('Update a user', () => {
  it('should update user record', (done) => {
    const user = {
      id: 1,
      email: 'johndoe@gmail.com',
      firstName: 'john',
      lastName: 'doe',
      password: 'johnpassword',
      address: 'Congo, DRC',
      isAdmin: true,
    };
    chai.request(app)
      .put(`/api/v1/updateUsers/${id}`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});
// delete user
describe('delete a user', () => {
  it('should delete user record', (done) => {
    chai.request(app)
      .delete(`/api/v1/deleteUsers/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});


// Everything dealing with cars
// Add a car sale ad
describe('Create a car sale ad', () => {
  it('should add car sale ad', (done) => {
    const car = {
      id: 1,
      owner: 5,
      state: 'New',
      status: 'Available',
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
        res.should.have.status(200);
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
        res.should.have.status(200);
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
        res.should.have.status(200);
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
        res.should.have.status(200);
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
        res.should.have.status(200);
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
        res.should.have.status(200);
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
        res.should.have.status(200);
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

//  Everything dealing with order
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
        res.should.have.status(200);
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
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});

// get all report
describe('Get all report', () => {
  it('should get all report record', (done) => {
    chai.request(app)
      .get('/api/v1/getAllFlag')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});


// Everything dealing wth flag
// Create a new report
describe('Create a report(flag)', () => {
  it('user should be able to report', (done) => {
    const flag = {
      id: 1,
      userId: 5,
      carId: 4,
      reason: 'Lorem ipesum',
      description: 'Description',
      createdOn: '06-05-2008',
    };

    chai.request(app)
      .post('/api/v1/addFlag')
      .send(flag)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        done(err);
      });
  });
});

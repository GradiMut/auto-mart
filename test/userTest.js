/* eslint-disable no-undef */
// jshint esversion : 6
// const jwt = require('jsonwebtoken');
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
// describe('Get user by id', () => {
//   it('should get all user record', (done) => {
//     chai.request(app)
//       .get(`/api/v1/getUserById/${id}`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.a('object');
//         done(err);
//       });
//   });
// });

//  add user
describe('Sign in a user', () => {
  it('user should be able to singin', (done) => {
    const user = {
      email: 'johndoe@gmail.com',
      password: 'johnpassword',
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
// add user
describe('Sing up a user', () => {
  it('should add user record', (done) => {
    const user = {
      id: 1,
      email: 'johndoe2@gmail.com',
      firstName: 'johnny',
      lastName: 'doe',
      password: 'johnpassword',
      address: 'Congo, DRC',
      isAdmin: true,
    };
    chai.request(app)
      .post('/api/v1/auth/singUp')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.a('object');
        done(err);
      });
  });
});
//  update user
describe('Update a user', () => {
  it('should update user record', (done) => {
    // email: Joi.string().email().required(),
    // firstName: Joi.string().min(3).required(),
    // lastName: Joi.string().min(3).required(),
    // password: Joi.string().min(6).max(12).required(),
    // address: Joi.string().required(),
    const user = {
      id: 1,
      email: 'johndoe@gmail.com',
      firstName: 'johns',
      lastName: 'does',
      password: 'johnpassword',
      address: 'Congo, DRC',
      isAdmin: true,
    };
    chai.request(app)
      .put(`/api/v1/updateUsers/${id}`)
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
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

/* eslint-disable no-undef */
// jshint esversion : 6
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../app');

// configure chai
chai.use(chaiHtpp);
chai.should();


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
// describe('Create a report(flag)', () => {
//   it('user should be able to report', (done) => {
//     const flag = {
//       id: 1,
//       userId: 5,
//       carId: 4,
//       reason: 'Lorem ipesum',
//       description: 'Description',
//       createdOn: '06-05-2018',
//     };

//     chai.request(app)
//       .post('/api/v1/addFlag')
//       .send(flag)
//       .end((err, res) => {
//         console.log(err);
//         res.should.have.status(201);
//         res.should.be.a('object');
//         done(err);
//       });
//   });
// });

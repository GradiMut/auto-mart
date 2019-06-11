/* eslint-disable class-methods-use-this */
// jshint esversion: 6
const flagDb = require('../data/flags');

class Report {
  // gett all offers
  getAllReport(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'Success',
      orders: flagDb,
    });
  }

  // make an order
  reportAd(req, res) {
    if (!req.body.userId) {
      return res.status(400).send({
        status: 400,
        message: 'Failled to post, You do not have an account!',
      });
    }
    if (!req.body.carId) {
      return res.status(400).send({
        status: 400,
        message: 'Failled to post, Car does not existe',
      });
    }
    if (!req.body.reason) {
      return res.status(400).send({
        status: 400,
        message: 'Failled to post, Reason is required',
      });
    }
    if (!req.body.description) {
      return res.status(400).send({
        status: 400,
        message: 'Failled to post, description is required',
      });
    }

    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const order = {
      id: flagDb.length + 1,
      userId: req.body.userId,
      carId: req.body.carId,
      reason: req.body.reason,
      description: req.body.description,
      createdOn: date,
    };

    flagDb.push(order);
    return res.status(201).send({
      status: 201,
      message: 'Your offer has been made',
      order,
    });
  }
}

const reportController = new Report();
module.exports = reportController;

/* eslint-disable class-methods-use-this */
// jshint esversion: 6
const flagDb = require('../data/flags');
const validateFlag = require('../middleware/validation/flag');
// const userDb = require('../data/users');


class Report {
  // gett all offers
  getAllReport(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'Success',
      flags: flagDb,
    });
  }

  reportAd(req, res) {
    const { error } = validateFlag(req.body);

    if (error) {
      res.status(400).send(error.details[1].message);
      return;
    }

    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const flag = {
      id: flagDb.length + 1,
      userId: parseInt(req.body.userId, 10),
      carId: parseInt(req.body.carId, 10),
      reason: req.body.reason,
      description: req.body.description,
      createdOn: date,
    };

    flagDb.push(flag);
    res.status(201).send({
      status: 201,
      message: 'Your offer has been made',
      flag,
    });
  }
}

const reportController = new Report();
module.exports = reportController;

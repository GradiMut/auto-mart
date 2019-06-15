"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */
// jshint esversion: 6
var flagDb = require('../data/flags');

var Report =
/*#__PURE__*/
function () {
  function Report() {
    _classCallCheck(this, Report);
  }

  _createClass(Report, [{
    key: "getAllReport",
    // gett all offers
    value: function getAllReport(req, res) {
      return res.status(200).send({
        status: 200,
        message: 'Success',
        orders: flagDb
      });
    } // make an order

  }, {
    key: "reportAd",
    value: function reportAd(req, res) {
      if (!req.body.userId) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, You do not have an account!'
        });
      }

      if (!req.body.carId) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Car does not existe'
        });
      }

      if (!req.body.reason) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Reason is required'
        });
      }

      if (!req.body.description) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, description is required'
        });
      }

      var currentDate = new Date();
      var date = "".concat(currentDate.getFullYear(), "-").concat(currentDate.getMonth() + 1, "-").concat(currentDate.getDate());
      var order = {
        id: flagDb.length + 1,
        userId: req.body.userId,
        carId: req.body.carId,
        reason: req.body.reason,
        description: req.body.description,
        createdOn: date
      };
      flagDb.push(order);
      return res.status(201).send({
        status: 201,
        message: 'Your offer has been made',
        order: order
      });
    }
  }]);

  return Report;
}();

var reportController = new Report();
module.exports = reportController;
//# sourceMappingURL=flagControlleer.js.map
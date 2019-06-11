"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */
// jshint esversion: 6
var orderDb = require('../data/orders');

var Order =
/*#__PURE__*/
function () {
  function Order() {
    _classCallCheck(this, Order);
  }

  _createClass(Order, [{
    key: "getAllOrders",
    // gett all offers
    value: function getAllOrders(req, res) {
      return res.status(200).send({
        status: 200,
        message: 'Succes',
        orders: orderDb
      });
    } // make an order

  }, {
    key: "makeAnOffer",
    value: function makeAnOffer(req, res) {
      if (!req.body.buyer) {
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

      if (!req.body.price) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Amount is required'
        });
      }

      if (!req.body.status) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Status is required'
        });
      }

      var currentDate = new Date();
      var date = "".concat(currentDate.getFullYear(), "-").concat(currentDate.getMonth() + 1, "-").concat(currentDate.getDate());
      var order = {
        id: orderDb.length + 1,
        buyer: req.body.buyer,
        carId: req.body.carId,
        price: req.body.amount,
        priceOffered: req.body.priceOffered,
        status: 'pending',
        createdOn: date
      };
      orderDb.push(order);
      return res.status(201).send({
        status: 201,
        message: 'Your offer has been made',
        order: order
      });
    }
  }, {
    key: "updateOrderPrice",
    value: function updateOrderPrice(req, res) {
      var id = parseInt(req.params.id, 10);
      var orderFound;
      var itemIndex;
      orderDb.map(function (order, index) {
        if (order.id === id) {
          orderFound = order;
          itemIndex = index;
        }
      });

      if (!orderFound) {
        return res.status(404).send({
          status: 404,
          message: 'order not found'
        });
      }

      if (orderFound.status !== 'pending') {
        return res.status(400).send({
          status: 400,
          message: 'Only pending purchase order can be update!'
        });
      }

      var currentDate = new Date();
      var date = "".concat(currentDate.getFullYear(), "-").concat(currentDate.getMonth() + 1, "-").concat(currentDate.getDate());
      var newOrder = {
        id: orderFound.id,
        buyer: orderFound.buyer,
        carId: orderFound.carId,
        price: orderFound.price,
        priceOffered: orderFound.priceOffered,
        newPriceOffered: req.body.newPriceOffered,
        status: 'pending',
        createdOn: date
      };
      orderDb.splice(itemIndex, 1, newOrder);
      return res.status(201).send({
        status: 201,
        message: 'order added statusfully',
        newOrder: newOrder
      });
    }
  }]);

  return Order;
}();

var orderController = new Order();
module.exports = orderController;
//# sourceMappingURL=orderController.js.map
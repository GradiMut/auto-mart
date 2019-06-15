"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable array-callback-return */

/* eslint-disable consistent-return */

/* eslint-disable class-methods-use-this */
// jshint esversion: 6
var carDb = require('../data/cars');

var Car =
/*#__PURE__*/
function () {
  function Car() {
    _classCallCheck(this, Car);
  }

  _createClass(Car, [{
    key: "getAllCars",
    // getting all the car
    value: function getAllCars(req, res) {
      return res.status(200).send({
        status: 200,
        message: 'Succes',
        cars: carDb
      });
    } // getting a single car

  }, {
    key: "getCarById",
    value: function getCarById(req, res) {
      var id = parseInt(req.params.id, 10);
      carDb.map(function (car) {
        if (car.id === id) {
          return res.status(201).send({
            status: 201,
            message: 'Success',
            car: car
          });
        }
      });
      return res.status(404).send({
        status: 400,
        message: 'Failled to retrieve, car does not existe'
      });
    } // Searching a car By price range, make and state

  }, {
    key: "searchCarBy",
    value: function searchCarBy(req, res) {
      var priceInput = {
        min_price: req.body.min_price,
        max_price: req.body.max_price
      };
      var carFound = carDb.filter(function (car) {
        return car.status === 'available' && car.state === 'used' && car.price >= priceInput.min_price && car.price <= priceInput.max_price;
      });

      if (!carFound) {
        res.status(404).json({
          status: 404,
          error: 'there are no cars within that price range not found'
        });
        return;
      }

      return res.status(201).send({
        status: 201,
        message: 'success',
        data: carFound
      });
    } // getting car by status

  }, {
    key: "getCarByStatus",
    value: function getCarByStatus(req, res) {
      var carFound = carDb.filter(function (car) {
        return car.status === 'available';
      });

      if (!carFound) {
        return res.status(400).send({
          status: 400,
          message: 'Failled, car not found'
        });
      }

      return res.status(201).send({
        status: 201,
        message: 'Found',
        data: carFound
      });
    } // get car by body type

  }, {
    key: "getCarByBodyType",
    value: function getCarByBodyType(req, res) {
      var carFound = carDb.filter(function (car) {
        return car.status === 'available' && car.bodyType;
      });

      if (!carFound) {
        return res.status(400).send({
          status: 400,
          message: 'Failled, car not found'
        });
      }

      return res.status(201).send({
        status: 201,
        message: 'Found',
        data: carFound
      });
    } // Post a car

  }, {
    key: "postCar",
    value: function postCar(req, res) {
      if (!req.body.owner) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, you do not have an account'
        });
      }

      if (!req.body.state) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, State is missing'
        });
      }

      if (!req.body.status) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Status is missing'
        });
      }

      if (!req.body.price) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Price is missing'
        });
      }

      if (!req.body.make) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Manufactuure(Make) is missing'
        });
      }

      if (!req.body.model) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Model is missing'
        });
      }

      if (!req.body.bodyType) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Body type is missing'
        });
      }

      if (!req.body.imgUrl) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, Image is missing'
        });
      }

      if (!req.body.description) {
        return res.status(400).send({
          status: 400,
          message: 'Failled to post, description is missing'
        });
      }

      var currentDate = new Date();
      var date = "".concat(currentDate.getFullYear(), "-").concat(currentDate.getMonth() + 1, "-").concat(currentDate.getDate());
      var car = {
        id: carDb.length + 1,
        owner: req.body.owner,
        state: req.body.state,
        status: req.body.status,
        createdOn: date,
        price: req.body.price,
        make: req.body.make,
        model: req.body.model,
        bodyType: req.body.bodyType,
        imgUrl: req.body.imgUrl,
        description: req.body.description
      };
      carDb.push(car);
      return res.status(201).send({
        status: 'true',
        message: 'car added successfully',
        car: car
      });
    } // Update price

  }, {
    key: "updatePrice",
    value: function updatePrice(req, res) {
      var id = parseInt(req.params.id, 10);
      var carFound;
      var itemIndex;
      carDb.map(function (car, index) {
        if (car.id === id) {
          carFound = car;
          itemIndex = index;
        }
      });

      if (!carFound) {
        return res.status(404).send({
          status: 404,
          message: 'Failed to update, car not found'
        });
      }

      if (!req.body.price) {
        return res.status(400).send({
          success: 400,
          message: 'Failed to update, require price'
        });
      }

      var updateCar = {
        id: carFound.id,
        owner: carFound.owner,
        state: carFound.state,
        status: carFound.status,
        createdOn: carFound.createdOn,
        price: req.body.price || carFound.price,
        make: carFound.make,
        model: carFound.model,
        bodyType: carFound.bodyType,
        imgUrl: carFound.imgUrl,
        description: carFound.description
      };
      carDb.splice(itemIndex, 1, updateCar);
      return res.status(201).send({
        success: 'true',
        message: 'car added successfully',
        updateCar: updateCar
      });
    } // Mark Car as sold

  }, {
    key: "markCarAsSold",
    value: function markCarAsSold(req, res) {
      var id = parseInt(req.params.id, 10);
      var carFound;
      var itemIndex;
      carDb.map(function (car, index) {
        if (car.id === id) {
          carFound = car;
          itemIndex = index;
        }
      });

      if (!carFound) {
        return res.status(404).send({
          status: 404,
          message: 'Failed to update, car not found'
        });
      }

      var newCar = {
        id: carFound.id,
        owner: carFound.owner,
        state: carFound.state,
        status: 'sold',
        createdOn: carFound.createdOn,
        price: carFound.price,
        make: carFound.make,
        model: carFound.model,
        bodyType: carFound.bodyType,
        imgUrl: carFound.imgUrl,
        description: carFound.description
      };
      carDb.splice(itemIndex, 1, newCar);
      return res.status(201).send({
        success: 'true',
        message: 'car added successfully',
        newCar: newCar
      });
    } // Delete a posted car

  }, {
    key: "deleteCar",
    value: function deleteCar(req, res) {
      var id = parseInt(req.params.id, 10);
      var carFound;
      var itemIndex;
      carDb.map(function (car, index) {
        if (car.id === id) {
          carFound = car;
          itemIndex = index;
        }
      });

      if (!carFound) {
        return res.status(404).send({
          success: 'false',
          message: 'car not found'
        });
      }

      carDb.splice(itemIndex, 1);
      return res.status(200).send({
        success: 'true',
        message: 'car deleted successfuly'
      });
    }
  }]);

  return Car;
}();

var carController = new Car();
module.exports = carController;
//# sourceMappingURL=carController.js.map
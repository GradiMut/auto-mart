/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
// jshint esversion: 6
const carDb = require('../data/cars');
const { validateAd, validateUpdateStatus, validatePostedPrice } = require('../middleware/validation/cars');

class Car {
  // getting all the car
  getAllCars(req, res) {
    return res.status(200).send({
      status: 200,
      message: 'Succes',
      cars: carDb,
    });
  }

  // getting a single car
  getCarById(req, res) {
    const id = parseInt(req.params.id, 10);
    carDb.map((car) => {
      if (car.id === id) {
        return res.status(201).send({
          status: 201,
          message: 'Success',
          car,
        });
      }
    });
    return res.status(404).send({
      status: 400,
      message: 'Failled to retrieve, car does not existe',
    });
  }

  // Searching a car By price range, make and state
  searchCarBy(req, res) {
    const priceInput = {
      min_price: req.body.min_price,
      max_price: req.body.max_price,
    };
    const carFound = carDb.filter(car => car.status === 'available' && car.state === 'used' && car.price >= priceInput.min_price && car.price <= priceInput.max_price);
    if (!carFound) {
      res.status(404).json({
        status: 404,
        error: 'there are no cars within that price range not found',
      });
      return;
    }
    return res.status(201).send({
      status: 201,
      message: 'success',
      data: carFound,
    });
  }

  // getting car by status
  getCarByStatus(req, res) {
    const carFound = carDb.filter(car => car.status === 'available');
    if (!carFound) {
      return res.status(400).send({
        status: 400,
        message: 'Failled, car not found',
      });
    }
    return res.status(201).send({
      status: 201,
      message: 'Found',
      data: carFound,
    });
  }

  // get car by body type
  getCarByBodyType(req, res) {
    const carFound = carDb.filter(car => car.status === 'available' && car.bodyType);
    if (!carFound) {
      return res.status(400).send({
        status: 400,
        message: 'Failled, car not found',
      });
    }
    return res.status(201).send({
      status: 201,
      message: 'Found',
      data: carFound,
    });
  }

  // Post a car
  postCar(req, res) {
    const { error } = validateAd(req.body);
    const carF = carDb.find(c => c.description === req.body.description);
    if (carF) {
      res.status(401).send('Items already exist');
      return;
    }


    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const currentDate = new Date();
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const car = {
      id: carDb.length + 1,
      owner: parseInt(req.body.owner, 10),
      state: req.body.state,
      status: req.body.status,
      createdOn: date,
      price: parseInt(req.body.price, 10),
      make: req.body.make,
      model: req.body.model,
      bodyType: req.body.bodyType,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
    };

    carDb.push(car);
    return res.status(201).send({
      status: 'true',
      message: 'car added successfully',
      car,
    });
  }

  // Update price
  updatePrice(req, res) {
    const { error } = validatePostedPrice(req.body);
    const id = parseInt(req.params.id, 10);
    let carFound;
    let itemIndex;
    carDb.map((car, index) => {
      if (car.id === id) {
        carFound = car;
        itemIndex = index;
      }
    });
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    if (!carFound) {
      return res.status(404).send({
        status: 404,
        message: 'Failed to update, car not found',
      });
    }

    const updateCar = {
      id: carFound.id,
      owner: carFound.owner,
      state: carFound.state,
      status: carFound.status,
      createdOn: carFound.createdOn,
      price: parseInt(req.body.price, 10) || carFound.price,
      make: carFound.make,
      model: carFound.model,
      bodyType: carFound.bodyType,
      imgUrl: carFound.imgUrl,
      description: carFound.description,
    };

    carDb.splice(itemIndex, 1, updateCar);
    return res.status(201).send({
      success: 'true',
      message: 'car added successfully',
      updateCar,
    });
  }

  // Mark Car as sold
  markCarAsSold(req, res) {
    const { error } = validateUpdateStatus(req.body);

    const id = parseInt(req.params.id, 10);
    let carFound;
    let itemIndex;
    carDb.map((car, index) => {
      if (car.id === id) {
        carFound = car;
        itemIndex = index;
      }
    });
    if (!carFound) {
      return res.status(404).send({
        status: 404,
        message: 'Failed to update, car not found',
      });
    }
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const newCar = {
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
      description: carFound.description,
    };

    carDb.splice(itemIndex, 1, newCar);
    return res.status(201).send({
      success: 'true',
      message: 'car added successfully',
      newCar,
    });
  }

  // Delete a posted car
  deleteCar(req, res) {
    const id = parseInt(req.params.id, 10);
    let carFound;
    let itemIndex;
    carDb.map((car, index) => {
      if (car.id === id) {
        carFound = car;
        itemIndex = index;
      }
    });

    if (!carFound) {
      return res.status(404).send({
        success: 'false',
        message: 'car not found',
      });
    }
    carDb.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'car deleted successfuly',
    });
  }
}

const carController = new Car();
module.exports = carController;

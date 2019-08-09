// jshint esversion: 6
const express = require('express');
const carController = require('../controllers/carController');
// const verifyToken = require('../middleware/auth');


const carRouter = express.Router();

// car route
carRouter.get('/api/v1/getAllCar', carController.getAllCars);
carRouter.get('/api/v1/getCarById/:id', carController.getCarById);
carRouter.get('/api/v1/getCarByBodyType/:bodyType', carController.getCarByBodyType);
carRouter.get('/api/v1/getCarByStatus/:status', carController.getCarByStatus);
carRouter.get('/api/v1/searchCarBy/:status/:min/:max/:make', carController.searchCarBy);
carRouter.post('/api/v1/addCar', carController.postCar);
carRouter.patch('/api/v1/updatePrice/:id', carController.updatePrice);
carRouter.patch('/api/v1/markAsSold/:id', carController.markCarAsSold);
carRouter.delete('/api/v1/deleteCar/:id', carController.deleteCar);

module.exports = carRouter;

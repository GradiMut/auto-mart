// jshint esversion: 6
const express = require('express');
const carController = require('../controllers/carController');

const router = express.Router();

// car route
router.get('/api/v1/getAllCar', carController.getAllCars);
router.get('/api/v1/getCarById/:id', carController.getCarById);
router.get('/api/v1/getCarByBodyType/:bodyType', carController.getCarByBodyType);
router.get('/api/v1/getCarByStatus/:status', carController.getCarByStatus);
router.get('/api/v1/searchCarBy/:status/:min/:max/:make', carController.searchCarBy);
router.post('/api/v1/addCar', carController.postCar);
router.patch('/api/v1/updatePrice/:id', carController.updatePrice);
router.patch('/api/v1/markAsSold/:id', carController.markCarAsSold);
router.delete('/api/v1/deleteCar/:id', carController.deleteCar);

module.exports = router;

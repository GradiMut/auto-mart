"use strict";

// jshint esversion: 6
var express = require('express');

var userController = require('../controllers/userController');

var carController = require('../controllers/carController');

var orderController = require('../controllers/orderController');

var reportController = require('../controllers/flagControlleer'); // const auth = require('../middleware/auth');


var router = express.Router(); // user route

router.get('/api/v1/getAllUsers', userController.getAllUsers);
router.get('/api/v1/getUserById/:id', userController.getUserById);
router.post('/api/v1/auth/singIn', userController.singIn);
router.post('/api/v1/auth/singUp', userController.singUp);
router.put('/api/v1/updateUsers/:id', userController.updateUser);
router["delete"]('/api/v1/deleteUsers/:id', userController.deleteUser); // car route

router.get('/api/v1/getAllCar', carController.getAllCars);
router.get('/api/v1/getCarById/:id', carController.getCarById);
router.get('/api/v1/getCarByBodyType/:bodyType', carController.getCarByBodyType);
router.get('/api/v1/getCarByStatus/:status', carController.getCarByStatus);
router.get('/api/v1/searchCarBy/:status/:min/:max/:make', carController.searchCarBy);
router.post('/api/v1/addCar', carController.postCar);
router.patch('/api/v1/updatePrice/:id', carController.updatePrice);
router.patch('/api/v1/markAsSold/:id', carController.markCarAsSold);
router["delete"]('/api/v1/deleteCar/:id', carController.deleteCar); // order route

router.get('/api/v1/getAllOrder', orderController.getAllOrders);
router.post('/api/v1/makeAnOffer', orderController.makeAnOffer);
router.patch('/api/v1/updateOrderPrice/:id', orderController.updateOrderPrice); // flag route

router.get('/api/v1/getAllFlag', reportController.getAllReport);
router.post('/api/v1/addFlag', reportController.reportAd);
module.exports = router;
//# sourceMappingURL=index.js.map
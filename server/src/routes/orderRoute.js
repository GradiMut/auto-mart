
// jshint esversion: 6
const express = require('express');
const orderController = require('../controllers/orderController');

const orderRouter = express.Router();

// order route
orderRouter.get('/api/v1/getAllOrder', orderController.getAllOrders);
orderRouter.post('/api/v1/makeAnOffer', orderController.makeAnOffer);
orderRouter.patch('/api/v1/updateOrderPrice/:id', orderController.updateOrderPrice);

module.exports = orderRouter;


// jshint esversion: 6
const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// order route
router.get('/api/v1/getAllOrder', orderController.getAllOrders);
router.post('/api/v1/makeAnOffer', orderController.makeAnOffer);
router.patch('/api/v1/updateOrderPrice/:id', orderController.updateOrderPrice);

module.exports = router;

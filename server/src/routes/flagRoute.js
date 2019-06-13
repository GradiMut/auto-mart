// jshint esversion: 6
const express = require('express');
const reportController = require('../controllers/flagControlleer');

const router = express.Router();

// flag route
router.get('/api/v1/getAllFlag', reportController.getAllReport);
router.post('/api/v1/addFlag', reportController.reportAd);

module.exports = router;

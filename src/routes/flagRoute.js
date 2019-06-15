// jshint esversion: 6
const express = require('express');
const reportController = require('../controllers/flagControlleer');

const flagRouter = express.Router();

// flag route
flagRouter.get('/api/v1/getAllFlag', reportController.getAllReport);
flagRouter.post('/api/v1/addFlag', reportController.reportAd);

module.exports = flagRouter;

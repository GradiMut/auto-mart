// jshint esversion: 6
const express = require('express');
const userController = require('../controllers/userController');
// const auth = require('../middleware/auth');

const router = express.Router();
// user route
router.get('/api/v1/getAllUsers', userController.getAllUsers);
router.get('/api/v1/getUserById/:id', userController.getUserById);
router.post('/api/v1/auth/singIn', userController.singIn);
router.post('/api/v1/auth/singUp', userController.singUp);
router.put('/api/v1/updateUsers/:id', userController.updateUser);
router.delete('/api/v1/deleteUsers/:id', userController.deleteUser);

module.exports = router;

// jshint esversion: 6
const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/auth');


const userRouter = express.Router();
// user route
userRouter.get('/api/v1/getAllUsers', verifyToken, userController.getAllUsers);
userRouter.get('/api/v1/getUserById/:id', userController.getUserById);
userRouter.post('/api/v1/auth/singIn', verifyToken, userController.singIn);
userRouter.post('/api/v1/auth/singUp', userController.singUp);
userRouter.put('/api/v1/updateUsers/:id', userController.updateUser);
userRouter.delete('/api/v1/deleteUsers/:id', userController.deleteUser);

module.exports = userRouter;

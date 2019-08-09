/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
// jshint esversion: 6

const jwt = require('jsonwebtoken');
const userDb = require('../data/users');
const { validateUserSignup, validateUserSingIn } = require('../middleware/validation/users');

class User {
  getAllUsers(req, res) {
    return res.status(200).set(userDb).send({
      status: 200,
      message: 'Success',
      users: userDb,
    });
  }

  getUserById(req, res) {
    const id = parseInt(req.params.id, 10);
    userDb.map((user) => {
      if (user.id === id) {
        return res.status(200).send({
          status: 200,
          message: 'status!!',
          user,
        });
      }
    });
    return res.status(404).send({
      status: 404,
      message: 'Failed to retrieve, user not found',
    });
  }

  singIn(req, res) {
    const userFound = userDb.find(e => e.email === req.body.email);
    // const { error } = validateUserSingIn(req.body);

    // if (error) {
    //   res.status(400).send(error.details[0].message);
    //   return;
    // }
    if (!userFound) {
      res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    }
    const password = userDb.find(p => p.password === req.body.password);
    if (!password) {
      res.status(400).json({
        status: 400,
        error: 'Incorrect password',
      });
    }

    const userToken = {
      id: userFound.id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      isAdmin: userFound.isAdmin,
    };
    const token = jwt.sign(userToken, 'SECRET_KEY', { expiresIn: '24hrs' });
    res.header(token).status(200).set('authorization', token).json({
      status: 200,
      data: {
        token,
      },
    });
  }

  singUp(req, res) {
    // Check user input if empty
    // const { error } = validateUserSignup(req.body);
    // check if user exist
    const userFound = userDb.find(e => e.email === req.body.email && e.firstName === req.body.firstName);

    // if (error) {
    //   res.status(400).send(error.details[0].message);
    //   return;
    // }

    if (userFound) {
      res.status(400).send({
        status: 400,
        error: 'Email exist already',
      });
    }

    const user = {
      id: userDb.length + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      password: req.body.password,
      isAdmin: false,
    };

    const userToken = {
      id: userDb.length + 1,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      isAdmin: false,
    };
    const token = jwt.sign(userToken, 'SECRET_KEY', { expiresIn: '24hrs' });
    userDb.push(user);
    res.status(201).send({
      status: 201,
      message: 'user added  successful',
      data: {
        token,
      },
    });
  }

  updateUser(req, res) {
    const id = parseInt(req.params.id, 10);
    let userFound;
    let itemIndex;
    userDb.map((user, index) => {
      if (user.id === id) {
        userFound = user;
        itemIndex = index;
      }
    });

    if (!userFound) {
      return res.status(404).send({
        status: 'false',
        message: 'user not found',
      });
    }

    if (!req.body.email) {
      return res.status(400).send({
        status: 'false',
        message: 'title is email',
      });
    } if (!req.body.firstName) {
      return res.status(400).send({
        status: 'false',
        message: 'description is First Name',
      });
    } if (!req.body.lastName) {
      return res.status(400).send({
        status: 'false',
        message: 'description is Last Name',
      });
    } if (!req.body.address) {
      return res.status(400).send({
        status: 'false',
        message: 'description is address',
      });
    }

    const user = {
      id: userFound.id,
      email: req.body.email || userFound.email,
      firstName: req.body.firstName || userFound.description,
      lastName: req.body.lastName || userFound.lastName,
      address: req.body.address || userFound.address,
      password: userFound.password,
      isAdmin: userFound.isAdmin,
    };

    userDb.splice(itemIndex, 1, user);

    return res.status(201).send({
      status: 'true',
      message: 'user added statusfully',
      user,
    });
  }

  deleteUser(req, res) {
    const id = parseInt(req.params.id, 10);
    let userFound;
    let itemIndex;
    userDb.map((user, index) => {
      if (user.id === id) {
        userFound = user;
        itemIndex = index;
      }
    });

    if (!userFound) {
      return res.status(404).send({
        status: 'false',
        message: 'user not found',
      });
    }
    userDb.splice(itemIndex, 1);

    return res.status(200).send({
      status: 'true',
      message: 'user deleted statusfuly',
    });
  }
}

const userController = new User();
module.exports = userController;

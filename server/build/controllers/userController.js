"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */
// jshint esversion: 6
var jwt = require('jsonwebtoken');

var userDb = require('../data/users');

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: "getAllUsers",
    value: function getAllUsers(req, res) {
      return res.status(200).send({
        status: 200,
        message: 'Success',
        users: userDb
      });
    }
  }, {
    key: "getUserById",
    value: function getUserById(req, res) {
      var id = parseInt(req.params.id, 10);
      userDb.map(function (user) {
        if (user.id === id) {
          return res.status(200).send({
            status: 200,
            message: 'status!!',
            user: user
          });
        }
      });
      return res.status(404).send({
        status: 404,
        message: 'Failed to retrieve, user not found'
      });
    }
  }, {
    key: "singIn",
    value: function singIn(req, res) {
      var userSchema = {
        email: req.body.email,
        password: req.body.password
      };
      var userFound = userDb.find(function (e) {
        return e.email === userSchema.email;
      });

      if (!userFound) {
        return res.status(404).json({
          status: 404,
          error: 'User not found'
        });
      }

      var password = userDb.find(function (p) {
        return p.password === req.body.password;
      });

      if (!password) {
        return res.status(400).json({
          status: 400,
          error: 'Incorrect password'
        });
      }

      var token = jwt.sign(userFound, 'SECRET_KEY', {
        expiresIn: '24hrs'
      });
      return res.status(200).json({
        status: 200,
        data: {
          token: token,
          id: userFound.id,
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          email: userFound.email
        }
      });
    }
  }, {
    key: "singUp",
    value: function singUp(req, res) {
      // Check user input if empty
      if (!req.body.email) {
        return res.status(400).send({
          status: 400,
          message: 'email is required'
        });
      }

      if (!req.body.firstName) {
        return res.status(400).send({
          status: 'false',
          message: 'First Name is required'
        });
      }

      if (!req.body.lastName) {
        return res.status(400).send({
          status: 'false',
          message: 'Last Name is required'
        });
      }

      if (!req.body.address) {
        return res.status(400).send({
          status: 'false',
          message: 'Address is required'
        });
      }

      if (!req.body.password) {
        return res.status(400).send({
          status: 'false',
          message: 'Password is required'
        });
      }

      var user = {
        id: userDb.length + 1,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        password: req.body.password,
        isAdmin: false
      };
      var token = jwt.sign(user, 'SECRET_KEY', {
        expiresIn: '24hrs'
      });
      userDb.push(user);
      return res.status(201).send({
        status: 201,
        message: 'user added statusfully',
        data: {
          token: token,
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          isAdmin: user.isAdmin
        }
      });
    }
  }, {
    key: "updateUser",
    value: function updateUser(req, res) {
      var id = parseInt(req.params.id, 10);
      var userFound;
      var itemIndex;
      userDb.map(function (user, index) {
        if (user.id === id) {
          userFound = user;
          itemIndex = index;
        }
      });

      if (!userFound) {
        return res.status(404).send({
          status: 'false',
          message: 'user not found'
        });
      }

      if (!req.body.email) {
        return res.status(400).send({
          status: 'false',
          message: 'title is email'
        });
      }

      if (!req.body.firstName) {
        return res.status(400).send({
          status: 'false',
          message: 'description is First Name'
        });
      }

      if (!req.body.lastName) {
        return res.status(400).send({
          status: 'false',
          message: 'description is Last Name'
        });
      }

      if (!req.body.address) {
        return res.status(400).send({
          status: 'false',
          message: 'description is address'
        });
      }

      var user = {
        id: userFound.id,
        email: req.body.email || userFound.email,
        firstName: req.body.firstName || userFound.description,
        lastName: req.body.lastName || userFound.lastName,
        address: req.body.address || userFound.address,
        password: userFound.password,
        isAdmin: userFound.isAdmin
      };
      userDb.splice(itemIndex, 1, user);
      return res.status(201).send({
        status: 'true',
        message: 'user added statusfully',
        user: user
      });
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(req, res) {
      var id = parseInt(req.params.id, 10);
      var userFound;
      var itemIndex;
      userDb.map(function (user, index) {
        if (user.id === id) {
          userFound = user;
          itemIndex = index;
        }
      });

      if (!userFound) {
        return res.status(404).send({
          status: 'false',
          message: 'user not found'
        });
      }

      userDb.splice(itemIndex, 1);
      return res.status(200).send({
        status: 'true',
        message: 'user deleted statusfuly'
      });
    }
  }]);

  return User;
}();

var userController = new User();
module.exports = userController;
//# sourceMappingURL=userController.js.map
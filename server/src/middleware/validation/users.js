// jshint esversion : 6
const Joi = require('joi');


function validateUserSignup(newUser) {
  const newUserSchema = {
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(6).max(12).required(),
    address: Joi.string().required(),
  };
  return Joi.validate(newUser, newUserSchema);
}

function validateUserExist(newUser) {
  const newUserSchema = {
    email: Joi.string().email().exist(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    password: Joi.string().min(6).max(12).required(),
    address: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
  };
  return Joi.validate(newUser, newUserSchema);
}


function validateUserSingIn(newUser) {
  const newUserSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  };
  return Joi.validate(newUser, newUserSchema);
}

module.exports = { validateUserSignup, validateUserExist, validateUserSingIn };

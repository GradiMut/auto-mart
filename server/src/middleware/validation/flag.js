/* eslint-disable class-methods-use-this */
// jshint esversion : 6
const Joi = require('joi');


function validateFlag(flag) {
  const schema = {
    userId: Joi.number().required(),
    carId: Joi.number().required(),
    reason: Joi.string().required(),
    description: Joi.string().min(5).required(),
  };
  return Joi.validate(flag, schema);
}


module.exports = validateFlag;

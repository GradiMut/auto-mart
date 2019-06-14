// jshint esversion : 6
const Joi = require('joi');

function validateAd(newAd) {
  const newAdSchema = {
    owner: Joi.number().required(),
    state: Joi.string().valid('new', 'used').required(),
    status: Joi.string().required(),
    price: Joi.number().required(),
    make: Joi.string().required(),
    model: Joi.string().required(),
    bodyType: Joi.string().required(),
    imgUrl: Joi.string().required(),
    description: Joi.string().required(),
  };
  return Joi.validate(newAd, newAdSchema);
}

function validateUpdateStatus(newStatus) {
  const newStatusSchema = {
    status: Joi.string().valid('sold').required(),
  };
  return Joi.validate(newStatus, newStatusSchema);
}

function validatePostedPrice(newPrice) {
  const newPriceSchema = {
    price: Joi.number().required(),
  };
  return Joi.validate(newPrice, newPriceSchema);
}

function ValidateSearch(range) {
  const searchBy = {
    min_price: Joi.number().required(),
    max_price: Joi.number().required(),
    status: Joi.string().required(),
    state: Joi.string().required(),
  };
  return Joi.validate(range, searchBy);
}

module.exports = {
  validateAd, validateUpdateStatus, validatePostedPrice, ValidateSearch,
};

// jshint esversion : 6
const Joi = require('joi');

function validateOrder(newOrder) {
  const newOrderSchema = {
    buyer: Joi.number().required(),
    carId: Joi.number().required(),
    price: Joi.number().required(),
    priceOffered: Joi.number().required(),
  };
  return Joi.validate(newOrder, newOrderSchema);
}

function validateUpdatePrice(newPrice) {
  const newPriceSchema = {
    price_offered: Joi.number().required(),
  };
  return Joi.validate(newPrice, newPriceSchema);
}

module.exports = { validateOrder, validateUpdatePrice };

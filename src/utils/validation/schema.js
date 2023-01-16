const joi = require('joi');

const productInputValidation = joi.object({
  name: joi.string().min(5).required(),
});

const saleInputValidation = joi.object({
  productId: joi.number().integer().min(1).required(),
  quantity: joi.number().integer().min(1).required(),
});

module.exports = {
  productInputValidation,
  saleInputValidation,
};
const joi = require('joi');

const productInputValidation = joi.object({
  name: joi.string().min(5).required(),
});

module.exports = {
  productInputValidation,
};
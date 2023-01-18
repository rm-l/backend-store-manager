const { productInputValidation } = require('./schema');

const productValidation = ({ name }) => {
  const { error } = productInputValidation.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: '', message: '' };
};

module.exports = {
  productValidation,
};
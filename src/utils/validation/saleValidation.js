const { saleInputValidation, idNumberValidation } = require('./schema');

const saleValidation = (sale) => {
  const saleVerfication = sale.map((sales) => saleInputValidation.validate(sales));

  const errorMsg = saleVerfication.find(({ error }) => {
    if (error) {
      return error;
    }
    return null;
  });

  const newError = saleVerfication.some(({ error }) => error);

  if (newError) {
    return {
      type: 'error',
      message: errorMsg.error.message,
    };
  }
  return { type: null, message: '' };
};

const idValidation = (id) => {
  const { error } = idNumberValidation.validate(id);
  if (error) return { type: 'error', message: '"id" must be a number' };
  return { type: null, message: '' };
};

module.exports = {
  saleValidation,
  idValidation,
};
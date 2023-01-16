const { saleInputValidation } = require('./schema');

const saleValidation = (sale) => {
  const salesVerfication = sale.map((sales) => saleInputValidation.validate(sales));

  const errorMsg = salesVerfication.find(({ error }) => {
    if (error) {
      return error;
    }
    return null;
  });

  const newError = salesVerfication.some(({ error }) => error);

  if (newError) {
    return {
      type: 'error',
      message: errorMsg.error.message,
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  saleValidation,
};
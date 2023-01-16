const { saleModel, productModel } = require('../models');
const test = require('../utils/validation/saleValidation');

const register = async (sale) => {
  const preSaleVerification = sale.map(async ({ productId }) => {
    const productVerification = await productModel.getById(productId);

    return productVerification;
  });

  const preProductVerification = await Promise.all(preSaleVerification);

  if (preProductVerification.some((product) => !product)) {
    return { type: 'error', message: 'Product not found' };
  }

  const err = test.saleValidation(sale);

  if (err.type) return err;

  const createdSale = await saleModel.register(sale);

  return { type: null, message: createdSale };
};

module.exports = {
  register,
};
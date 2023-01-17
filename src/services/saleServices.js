const { saleModel, productModel } = require('../models');
const test = require('../utils/validation/saleValidation');
// const idValidation = require('../utils/validation/saleValidation');

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

const getAll = async () => {
  const sales = await saleModel.getAll();
  return { type: null, message: sales };
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);
  const error = test.idValidation(id);

  if (error.type) return error;

  if (sale.length === 0) return { type: 'error', message: 'Sale not found' };

  return { type: null, message: sale };
};

module.exports = {
  register,
  getAll,
  getById,
};
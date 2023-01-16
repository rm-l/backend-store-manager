const { productModel } = require('../models');
 const { productValidation } = require('../utils/validation/productValidation');

const getAll = async () => {
  const products = await productModel.getAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const register = async ({ name }) => {
  const error = productValidation({ name });
  if (error.type) return error;

  const newProduct = await productModel.register({ name });
  return { type: null, message: newProduct };
};

module.exports = {
  getAll,
  getById,
  register,
};
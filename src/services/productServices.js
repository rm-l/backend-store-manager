const { productModel } = require('../models');
const { productValidation } = require('../utils/validation/productValidation');
const { idValidation } = require('../utils/validation/saleValidation');

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

const update = async (productId, name) => {
  const product = await productModel.getById(productId);
  const idError = idValidation(productId);
  if (idError.type || !product) {
    return { type: 'error', message: 'Product not found' };
  }
  const productError = productValidation({ name });
  if (productError.type) return productError;

  const updatedProduct = await productModel.update(productId, name);

  return { type: null, message: updatedProduct };
};

module.exports = {
  getAll,
  getById,
  register,
  update,
};
const { productService } = require('../services');

const getAll = async (_req, res) => {
  const { message } = await productService.getAll();

  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const register = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.register({ name });

  if (type) return res.status(message.includes('length') ? 422 : 400).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  getAll,
  getById,
  register,
};
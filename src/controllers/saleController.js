const { saleService } = require('../services');

const register = async (req, res) => {
  const newSale = req.body;
  const { message } = await saleService.register(newSale);

  if (message === '"productId" is required' || message === '"quantity" is required') {
    return res.status(400).json({ message });
  }

  if (message === '"quantity" must be greater than or equal to 1') {
    return res.status(422).json({ message });
  }

  if (message === 'Product not found') {
    return res.status(404).json({ message });
  }

  return res.status(201).json(message);
};

const getAll = async (req, res) => {
  const { message } = await saleService.getAll();
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { message } = await saleService.getById(id);

  if (message === 'Sale not found') {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

module.exports = {
  register,
  getById,
  getAll,
};
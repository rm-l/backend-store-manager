const saleMiddleware = (req, res, next) => {
  const sale = req.body;

  if (sale.some(({ productId }) => !productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (sale.some(({ quantity }) => quantity <= 0)) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (
    sale.some(({ quantity }) => !quantity)
  ) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};

module.exports = {
  saleMiddleware,
};

const camelize = require('camelize');
const connection = require('./connection');

const register = async (sale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (?)',
    [new Date()],
  );

  sale.forEach(async (sales) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
      [insertId, sales.productId, sales.quantity],
    );
  });

  const saleModel = {
    id: insertId,
    itemsSold: sale,
  };

  return camelize(saleModel);
};

module.exports = {
  register,
};
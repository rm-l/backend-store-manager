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

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT id as sale_id, date, product_id, quantity FROM sales
    RIGHT JOIN sales_products
    ON sales.id  = sale_id`,
  );

  return camelize(result);
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales
    RIGHT JOIN sales_products
    ON sales.id  = sales_products.sale_id
    WHERE id = ? `,
    [id],
  );

  return camelize(result);
};

module.exports = {
  register,
  getAll,
  getById,
};
const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product[0];
};
module.exports = {
  getAll,
  getById,
};
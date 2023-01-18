const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM products';
  const [product] = await connection.execute(query);
  return product;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  return product[0];
};

const register = async ({ name }) => {
  const query = 'INSERT INTO products (name) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return { id: insertId, name };
};

const update = async (productId, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, productId],
  );

  const updatedProduct = await getById(productId);

  if (affectedRows > 0) {
    return updatedProduct;
  }
};

module.exports = {
  getAll,
  getById,
  register,
  update,
};
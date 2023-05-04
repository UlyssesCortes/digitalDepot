const client = require("./client");

// const pool = require("../db")

async function createProduct({
    title,
    description,
    price,
    quantity,
    category,
    image,
}) {
    try {
        const {
            rows: [product],
        } = await pool.query(
            `
      INSERT INTO products(title, description, price, quantity, category, image) 
      VALUES($1, $2, $3, $4, $5, $6) 
      RETURNING *;
    `,
            [title, description, price, quantity, category, image]
        );

        return product;
    } catch (error) {
        throw error;
    }
}

async function getAllProducts() {
    try {
        const { rows } = await pool.query(`
      SELECT id, title, description, price, quantity, category, image 
      FROM products;
    `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function getProductById(id) {
    try {
        const { rows } = await pool.query(`
      SELECT id, title, description, price, quantity, category, image 
      FROM products
      WHERE id=${id};
    `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function updateProducts({ id, ...fields }) {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    const {
        rows: [product],
    } = await pool.query(
        `
  UPDATE products
  SET ${setString}
  WHERE id=${id}
  RETURNING *;
  `,
        Object.values(fields)
    );
    return product;
}

async function deleteProduct(id) {
    await pool.query(`
  DELETE FROM orders WHERE product_id=${id}
  `);

    const {
        rows: [product],
    } = await pool.query(
        `
  DELETE FROM products WHERE id=$1;
  `,
        [id]
    );
    return product;
}

module.exports = {
    createProduct,
    getAllProducts,
    updateProducts,
    deleteProduct,
    getProductById,
};

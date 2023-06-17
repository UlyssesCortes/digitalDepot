const client = require("../client");

async function createProduct({
    title,
    description,
    price,
    quantity,
    category,
    type,
    images,
    dimensions,
    features,
    stripePrice
}) {
    try {
        const {
            rows: [product],
        } = await client.query(
            `
            INSERT INTO products(title, description, price, quantity, category,type, images, dimensions, features, "stripePrice") 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8 ,$9, $10) 
            RETURNING *;
            `,
            [title, description, price, quantity, category, type, images || null, dimensions, features, stripePrice]
        );

        return product;
    } catch (error) {
        throw error;
    }
}


async function getAllProducts() {
    try {
        const { rows } = await client.query(`
      SELECT id, title, description, price, quantity, category, type, images, dimensions, features, "stripePrice"
      FROM products;
    `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function getAllProductsFavorite(userId) {
    try {
        const { rows } = await client.query(`
        SELECT p.*, 
          CASE WHEN f."productId" IS NOT NULL THEN true ELSE false END AS "isFavorite"
        FROM products p
        LEFT JOIN favorite f ON p.id = f."productId" AND f."userId" = $1;
      `, [userId]);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}


async function getProductById(id) {
    try {
        const { rows } = await client.query(`
      SELECT id, title, description, price, quantity, category, type,images, dimensions, features, "stripePrice"
      FROM products
      WHERE id=${id};
    `);

        return rows;
    } catch (error) {
        throw error;
    }
}
async function getProductByUserId(userId, productId) {
    try {
        const { rows } = await client.query(`
            SELECT p.*, 
              CASE WHEN f."productId" IS NOT NULL THEN true ELSE false END AS "isFavorite"
            FROM products p
            LEFT JOIN favorite f ON p.id = f."productId" AND f."userId" = $1
            WHERE p.id = $2;
        `, [userId, productId]);

        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}


async function updateProducts({ id, ...fields }) {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    const {
        rows: [product],
    } = await client.query(
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
    await client.query(`
  DELETE FROM orders WHERE productId=${id}
  `);

    const {
        rows: [product],
    } = await client.query(
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
    getAllProductsFavorite,
    getProductByUserId
};

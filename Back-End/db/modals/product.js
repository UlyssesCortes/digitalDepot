const client = require("../client");

// const pool = require("../db")

// async function createProduct({
//     title,
//     description,
//     price,
//     quantity,
//     category,
//     images,
// }) {
//     try {
//         const {
//             rows: [product],
//         } = await client.query(
//             `
//       INSERT INTO products(title, description, price, quantity, category, images) 
//       VALUES($1, $2, $3, $4, $5, $6) 
//       RETURNING *;
//     `,
//             [title, description, price, quantity, category, images]
//         );

//         return product;
//     } catch (error) {
//         throw error;
//     }
// }

async function createProduct({
    title,
    description,
    price,
    quantity,
    category,
    images,
    dimensions,
    features,
}) {
    try {
        const {
            rows: [product],
        } = await client.query(
            `
            INSERT INTO products(title, description, price, quantity, category, images, dimensions, features) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *;
            `,
            [title, description, price, quantity, category, images || null, dimensions, features]
        );

        return product;
    } catch (error) {
        throw error;
    }
}


async function getAllProducts() {
    try {
        const { rows } = await client.query(`
      SELECT id, title, description, price, quantity, category, images, dimensions, features
      FROM products;
    `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function getProductById(id) {
    try {
        const { rows } = await client.query(`
      SELECT id, title, description, price, quantity, category, images, dimensions, features 
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
};

const client = require("../client");

async function addToFavorite(userId, productId) {
    try {
        const {
            rows: [favorite]
        } = await client.query(
            `
          INSERT INTO favorite ("userId", "productId")
          VALUES ($1, $2)
          RETURNING *
        `,
            [userId, productId]
        );
        return favorite;
    } catch (error) {
        throw error;
    }
}

async function getFavoriteByUserId(userId) {
    try {
        const { rows } = await client.query(`
        SELECT * 
        FROM favorite
        WHERE "userId"=${userId};
      `);

        return rows;
    } catch (error) {
        throw error;
    }
}


async function deleteFavorite(userId, productId) {
    try {
        const {
            rows: [favorite]
        } = await client.query(
            `
        DELETE FROM favorite ("userId", "productId")
          VALUES ($1, $2)
          RETURNING *
        `,
            [userId, productId]
        );
        return favorite;
    } catch (error) {
        throw error;
    }
}

async function deleteFavorite(productId) {
    const {
        rows: [favorite],
    } = await client.query(`DELETE FROM favorite WHERE "productId"=$1;`,
        [productId]);
    return favorite;
}

module.exports = {
    addToFavorite,
    getFavoriteByUserId,
    deleteFavorite,
};
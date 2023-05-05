const client = require("../client");

async function addToFavorite(userId) {
    try {
        const {
            rows: [favorite],
        } = await client.query(
            `
      INSERT INTO favorite("userId") 
      VALUES($1) 
      RETURNING *;
    `,
            [userId]
        );
        return favorite;
    } catch (error) {
        throw error;
    }
}

// async function getAllFavorites() {
//     try {
//         const { rows } = await client.query(`
//       SELECT * 
//       FROM favorite;
//     `);

//         return rows;
//     } catch (error) {
//         throw error;
//     }
// }

// async function getFavoriteById(id) {
//     try {
//         const { rows } = await client.query(`
//       SELECT * 
//       FROM favorite
//       WHERE id=${id};
//     `);

//         return rows;
//     } catch (error) {
//         throw error;
//     }
// }

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

async function deleteFavorite(id) {
    const {
        rows: [favorite],
    } = await client.query(`DELETE FROM favorite WHERE id=$1;`, [id]);
    return favorite;
}

module.exports = {
    addToFavorite,
    // getAllFavorites,
    // getFavoriteById,
    getFavoriteByUserId,
    deleteFavorite,
};
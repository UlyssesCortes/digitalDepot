const client = require("../client");

async function createOrder(userId) {
    try {
        const {
            rows: [order],
        } = await client.query(
            `
      INSERT INTO orders("userId") 
      VALUES($1) 
      RETURNING *;
    `, [userId]
        );
        return order;
    } catch (error) {
        throw error;
    }
}

async function getOrderDetails(userId) {
    try {
        const { rows } = await client.query(`
        SELECT o.id AS order_id, o."orderDate", o."isCheckedOut", o."checkoutDate", o."checkoutSum",
          oi.quantity, p.id AS "productId", p.title, p.price, p.images[1] AS image
        FROM orders o
        JOIN order_items oi ON o.id = oi."orderId"
        JOIN products p ON oi."productId" = p.id
        WHERE o."isCheckedOut" = true AND o."userId" = ${userId};
      `);

        const orders = [];
        let currentOrderId = null;
        let currentOrder = null;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const {
                order_id,
                orderDate,
                isCheckedOut,
                checkoutDate,
                checkoutSum,
                quantity,
                productId,
                title,
                price,
                image,
            } = row;

            if (order_id !== currentOrderId) {
                currentOrder = {
                    order_id,
                    orderDate,
                    isCheckedOut,
                    checkoutDate,
                    checkoutSum,
                    orderItems: [],
                };

                orders.push(currentOrder);
                currentOrderId = order_id;
            }
            const orderItem = {
                quantity,
                productId,
                title,
                price,
                image,
            };

            currentOrder.orderItems.push(orderItem);
        }

        return orders;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}


async function getCart() {
    try {
        const { rows } = await client.query(`
        SELECT o.id AS order_id, o."isCheckedOut",
          oi.quantity, p.id AS "productId", p.title, p.price, p.images[1] AS image
        FROM orders o
        JOIN order_items oi ON o.id = oi."orderId"
        JOIN products p ON oi."productId" = p.id
        WHERE o."isCheckedOut" = false;
      `);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

async function getAllOrders() {
    try {
        const { rows } = await client.query(`
      SELECT * 
      FROM orders;
    `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getOrderById(id) {
    try {
        const { rows } = await client.query(`
      SELECT * 
      FROM orders
      WHERE id=${id};
    `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function getOrderByUserId(userId) {
    try {
        const { rows } = await client.query(`
        SELECT * 
        FROM orders
        WHERE "userId"=${userId} AND "isCheckedOut"=false;
      `);

        return rows;
    } catch (error) {
        throw error;
    }
}
async function getOrderCheckoutByUserId(userId) {
    try {
        const { rows } = await client.query(`
        SELECT * 
        FROM orders
        WHERE "userId"=${userId} AND "isCheckedOut"=true;
      `);

        return rows;
    } catch (error) {
        throw error;
    }
}

async function updateOrders({ id, ...fields }) {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    const {
        rows: [order],
    } = await client.query(
        `
  UPDATE orders
  SET ${setString}
  WHERE id=${id}
  RETURNING *;
  `,
        Object.values(fields)
    );
    return order;
}

async function deleteOrder(id) {
    await client.query(`
  DELETE FROM order_items WHERE "orderId"=${id};
  `);
    const {
        rows: [order],
    } = await client.query(`
  DELETE FROM orders WHERE id=${id}
  RETURNING *;
  `);
    return order;
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderByUserId,
    deleteOrder,
    getOrderById,
    updateOrders,
    getOrderCheckoutByUserId,
    getOrderDetails,
    getCart
};

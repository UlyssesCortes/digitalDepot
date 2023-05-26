const express = require("express");
const apiRouter = express.Router();

const {
    getAllOrderItems,
    addProductOrder,
    deleteOrderItem,
    updateOrderItem,
    getOrderItemsByOrderId
} = require('../db');

apiRouter.get("/", async (req, res, next) => {
    try {
        const orderItems = await getAllOrderItems();
        res.send(orderItems);
    } catch (error) {
        next(error);
    }
});

apiRouter.post("/:orderId", async (req, res, next) => {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const newOrderItem = await addProductOrder({
            orderId,
            productId,
            quantity,
        });
        res.status(201).json(newOrderItem);
    } catch (error) {
        next(error);
    }
});

apiRouter.get("/:orderId", async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const orderItems = await getOrderItemsByOrderId(orderId);
        res.send(orderItems);
    } catch (error) {
        next(error);
    }
});

apiRouter.patch("/:orderItemId", async (req, res, next) => {
    try {
        const id = req.params.orderItemId;
        const { quantity } = req.body;
        const updatedFields = { id: id };
        if (quantity) {
            updatedFields.quantity = quantity;
        }
        const updatedOrderItem = await updateOrderItem(updatedFields);

        res.send(updatedOrderItem);
    } catch (error) {
        next(error);
    }
});

apiRouter.delete("/:productId", async (req, res, next) => {
    const { productId } = req.params;
    console.log(productId);
    try {
        const destroyedOrderItem = await deleteOrderItem(productId);
        const response = {
            message: 'Item deleted successfully',
            orderItem: destroyedOrderItem
        };
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;

const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");

const {
    getAllOrders,
    createOrder,
    updateOrders,
    deleteOrder,
    getOrderByUserId
} = require('../db');

apiRouter.get("/", async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        res.send(orders);
    } catch (error) {
        next(error);
    }
});

apiRouter.get("/myOrders", requireUser, async (req, res, next) => {
    try {
        const usersOrders = await getOrderByUserId(req.user.id);
        res.send(usersOrders);
    } catch (error) {
        next(error);
    }
});

apiRouter.post("/", requireUser, async (req, res, next) => {
    try {
        const newOrder = await createOrder(req.user.id);
        res.send(newOrder);
    } catch (error) {
        next(error);
    }
});

apiRouter.patch("/:orderId", async (req, res, next) => {
    try {
        const id = req.params.orderId;
        const { isCheckedOut } = req.body;
        const updatedFields = { id: id };

        if (isCheckedOut) {
            updatedFields.isCheckedOut = isCheckedOut;
        }
        const updatedOrderItem = await updateOrders(updatedFields);

        res.send(updatedOrderItem);
    } catch (error) {
        next(error);
    }
});

apiRouter.delete("/:orderId", async (req, res, next) => {
    const id = req.params.orderId;
    try {
        const destroy = await deleteOrder(id);
        res.send(destroy);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;

const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");

const {
    addToFavorite,
    getFavoriteByUserId,
    deleteFavorite
} = require('../db');

apiRouter.get("/myFavorites", requireUser, async (req, res, next) => {
    try {
        const usersOrders = await getFavoriteByUserId(req.user.id);
        res.send(usersOrders);
    } catch (error) {
        next(error);
    }
});

apiRouter.post("/", requireUser, async (req, res, next) => {
    try {
        const newOrder = await addToFavorite(req.user.id);
        res.send(newOrder);
    } catch (error) {
        next(error);
    }
});

apiRouter.delete("/:favoriteId", async (req, res, next) => {
    const id = req.params.orderId;
    try {
        const destroy = await deleteFavorite(id);
        res.send(destroy);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;

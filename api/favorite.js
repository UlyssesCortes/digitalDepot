const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");

const {
    addToFavorite,
    getFavoriteByUserId,
    deleteFavorite,
    getFavoriteProducts
} = require('../db');

apiRouter.get("/", requireUser, async (req, res, next) => {
    const userId = req.user.id

    try {
        const usersOrders = await getFavoriteByUserId(userId);
        res.send(usersOrders);
    } catch (error) {
        next(error);
    }
});

apiRouter.post("/:productId", requireUser, async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.id
    try {
        const newOrder = await addToFavorite(userId, productId);
        res.send(newOrder);
    } catch (error) {
        next(error);
    }
});


apiRouter.get('/myFavorites', requireUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const favoriteProducts = await getFavoriteProducts(userId);
        res.json(favoriteProducts);
    } catch (error) {
        console.error('Error retrieving favorite products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

apiRouter.delete("/:productId", async (req, res, next) => {
    const { productId } = req.params;
    // on the front end control if favorite then on click delete 
    try {
        const destroy = await deleteFavorite(productId);
        res.send(destroy);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;

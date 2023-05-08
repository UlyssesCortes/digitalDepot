const express = require('express');
const apiRouter = express.Router();
const { requireUser } = require('./utils');

const {
    getReviewsByProductId,
    createReview
} = require('../db');

apiRouter.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const reviews = await getReviewsByProductId(productId);
        res.send(reviews);
    } catch (error) {
        next(error);
    }
});

apiRouter.post('/:productId', requireUser, async (req, res, next) => {
    const { productId } = req.params;
    const { title, description, rating } = req.body;
    const userId = req.user.id;

    try {
        const review = await createReview({ productId, userId, title, description, rating });
        res.send(review);
    } catch (error) {
        next(error);
    }
});

module.exports = apiRouter;
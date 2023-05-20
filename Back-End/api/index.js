const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

const { getUserById } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET;

apiRouter.use(async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
            if (id) {
                req.user = await getUserById(id);
                next();
            } else {
                next({
                    name: "AuthorizationHeaderError",
                    message: "Authorization token malformed",
                });
            }
        } catch (error) {
            next(error);
        }
    } else {
        next({
            name: "AuthorizationHeaderError",
            message: `Authorization token must start with ${prefix}`,
        });
    }
});


apiRouter.get("/", (req, res, next) => {
    res.send({
        message: "API is under construction!",
    });
});
// GET /api/health
apiRouter.get('/health', async (req, res, next) => {
    res.send({ message: 'API is healthy' });
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const ordersRouter = require('./order');
apiRouter.use('/order', ordersRouter);

const reviewsRouter = require('./review');
apiRouter.use('/review', reviewsRouter);

const orderItemsRouter = require('./order-items');
apiRouter.use('/order-items', orderItemsRouter);

const favoritesRouter = require('./favorite');
apiRouter.use('/favorite', favoritesRouter);

module.exports = apiRouter;

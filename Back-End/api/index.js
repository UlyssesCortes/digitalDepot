const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

router.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

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
                    name: 'AuthorizationHeaderError',
                    message: 'Authorization token malformed',
                });
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`,
        });
    }
});

router.use((req, res, next) => {
    if (req.user) {
        // console.log('User is set:', req.user);
    }
    next();
});

// GET /api/health
router.get('/health', async (req, res, next) => {
    res.send({ message: 'API is healthy' });
});

const usersRouter = require('./user');
router.use('/user', usersRouter);

const productsRouter = require('./products');
router.use('/products', productsRouter);

const ordersRouter = require('./order');
router.use('/order', ordersRouter);

const reviewsRouter = require('./review');
router.use('/review', reviewsRouter);

const orderItemsRouter = require('./order-items');
router.use('/order-items', orderItemsRouter);

module.exports = router;

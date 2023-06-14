const express = require("express");
const apiRouter = express.Router();
const { requireUser } = require("./utils");

const {
    getAllOrders,
    createOrder,
    updateOrders,
    deleteOrder,
    getOrderByUserId,
    getOrderCheckoutByUserId,
    getOrderDetails,
    getCart
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
apiRouter.get("/finalized", requireUser, async (req, res, next) => {
    try {
        const usersOrders = await getOrderCheckoutByUserId(req.user.id);
        res.send(usersOrders);
    } catch (error) {
        next(error);
    }
});

apiRouter.get('/history', requireUser, async (req, res) => {
    try {
        const orderDetails = await getOrderDetails(req.user.id);
        res.json(orderDetails);
    } catch (error) {
        console.error('Error retrieving order details:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

apiRouter.get('/cart', requireUser, async (req, res) => {
    try {
        const cart = await getCart();
        res.json(cart);
    } catch (error) {
        console.error('Error retrieving order details:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

apiRouter.post('/checkout', async (req, res) => {
    const { amount } = req.body;
    console.log("STRIPE KEY: ", process.env.STRIPE_KEY)
    console.log("STRIPE KEY: ")
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
});


apiRouter.post("/", requireUser, async (req, res, next) => {
    try {
        const newOrder = await createOrder(req.user.id);
        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
});

try {
    const id = req.params.orderId;
    const { isCheckedOut, checkoutDate, checkoutSum } = req.body;
    const updatedFields = { id: id };

    if (isCheckedOut) {
        updatedFields.isCheckedOut = isCheckedOut;
    }

    if (checkoutDate) {
        updatedFields.checkoutDate = checkoutDate;
    }

    if (checkoutSum) {
        updatedFields.checkoutSum = checkoutSum;
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

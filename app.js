require("dotenv").config()

const express = require("express")
const app = express()

const client = require('./db/client')
client.connect()

const cors = require('cors')

app.use(cors())

// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// const storeItems = new Map([
//     [1, { priceInCents: 10000, name: "Learn React Today" }],
//     [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ])

// app.post("/create-checkout-session", async (req, res) => {
//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: "payment",
//             line_items: req.body.items.map(item => {
//                 const storeItem = storeItems.get(item.id)
//                 return {
//                     price_data: {
//                         currency: "usd",
//                         product_data: {
//                             name: storeItem.name,
//                         },
//                         unit_amount: storeItem.priceInCents,
//                     },
//                     quantity: item.quantity,
//                 }
//             }),
//             success_url: `${process.env.CLIENT_URL}`,
//             cancel_url: `${process.env.CLIENT_URL}`,
//         })
//         res.json({ url: session.url })
//     } catch (e) {
//         res.status(500).json({ error: e.message })
//     }
// })

app.use((req, res, next) => {
    next();
});

// Setup your Middleware and API Router here
const apiRouter = require('./api')
app.use('/api', apiRouter)

//error handler
app.use((error, req, res, next) => {
    res.send(error)
})

app.get("/api/unknown", (req, res) => {
    res.status(404).send({ message: "The endpoint could not be found." });
});

module.exports = app;
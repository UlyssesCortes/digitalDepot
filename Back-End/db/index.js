const express = require("express")
const app = express()
const cors = require("cors")

const pool = require("./client")
const models = require('./models');

app.use(cors())
app.use(express.json())


app.get("/products", async (req, res) => {
    try {
        const alltoDos = await pool.query("SELECT * FROM products");
        res.json(alltoDos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/health", (req, res, next) => {
    res.send({
        healthy: true,
    });
});

app.listen(5000, () => {
    console.log("server has started on port 5000")
})

module.exports = {
    pool,
    ...models,
};
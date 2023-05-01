const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
const models = require('./models');

// middleware
app.use(cors())
app.use(express.json())

// Routes
// app.post("/todos", async (req, res) => {
//     try {
//         const { description } = req.body;
//         const newTodo = await pool.query(
//             "INSERT INTO todo (description) VALUES($1) RETURNING *",
//             [description])
//         res.json(newTodo.rows[0])
//     } catch (err) {
//         console.error(err.message)
//     }
// })

// app.get("/todos", async (req, res) => {
//     try {
//         const alltoDos = await pool.query("SELECT * FROM todo");
//         res.json(alltoDos.rows)
//     } catch (err) {
//         console.error(err.message)
//     }
// })

// app.get("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
//             [id]);
//         res.json(todo.rows[0])
//     } catch (err) {
//         console.error(err.message)
//     }
// })

// app.patch("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } = req.body;

//         const updateToDo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
//             [description, id])
//         res.json("Todo was updated!")
//     } catch (err) {
//         console.error(err.message)
//     }
// })

// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",
//             [id]);
//         res.json("Todo was deleted!");
//     } catch (err) {
//         console.error(err.message)

//     }
// })

app.post("/products", async (req, res) => {
    try {
        const { title,
            description,
            price,
            quantity,
            category,
            image, } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO products(title, description, price, quantity, category, image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, description, price, quantity, category, image])
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/products", async (req, res) => {
    try {
        const alltoDos = await pool.query("SELECT * FROM products");
        res.json(alltoDos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
})

module.exports = {
    pool,
    ...models,
};
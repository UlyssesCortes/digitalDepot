require("dotenv").config()
const express = require("express")
const app = express()

const client = require('./db/client')
client.connect()

const cors = require('cors')
app.use(cors())

app.use(express.json())


const morgan = require('morgan');
app.use(morgan('dev'));

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
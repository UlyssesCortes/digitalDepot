const Pool = require("pg").Pool
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// })

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "4864",
    database: "digitaldepot"
})

module.exports = pool;
const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: 4864,
    database: "digitaldepot",
})

module.exports = pool;
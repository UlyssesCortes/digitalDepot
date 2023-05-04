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


// const { Pool } = require('pg');

// const connectionString = process.env.DATABASE_URL || 'postgres://root:4864@localhost:5432/fitness-dev';

// const client = new Pool({
//   connectionString,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
// });

// module.exports = client;


module.exports = pool;
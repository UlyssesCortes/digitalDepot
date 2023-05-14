// const { Pool } = require("pg");

// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

// module.exports = pool;



// const { Pool } = require("pg");

// const pool = new Pool({
//     user: "digitaldepot_user",
//     host: "dpg-chg3u0qk728sd6nhce90-a",
//     database: "digitaldepot",
//     password: 4864,
//     port: 5432,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// module.exports = pool;



const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgres://digitaldepot_user:2Sw0rJ1eFZwFkL7LZdkqHEkq4mSJKa9d@dpg-chg3u0qk728sd6nhce90-a.oregon-postgres.render.com/digitaldepot",
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pool;


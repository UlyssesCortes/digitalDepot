const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgres://digitaldepot_user:2Sw0rJ1eFZwFkL7LZdkqHEkq4mSJKa9d@dpg-chg3u0qk728sd6nhce90-a.oregon-postgres.render.com/digitaldepot",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;

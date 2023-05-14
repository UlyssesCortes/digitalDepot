// const { client } = require("./index.js");
const client = require("../db/client");


const {
    createUser
} = require('../db');

async function buildTables() {
    try {
        console.log("Starting to build tables...");
        client.connect();

        await client.query(`
            DROP TABLE IF EXISTS order_items;
            DROP TABLE IF EXISTS orders CASCADE;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS products CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
        `);

        await client.query(`
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                title varchar(255) NOT NULL,
                description text NOT NULL,
                price decimal(10,2) NOT NULL,
                quantity integer NOT NULL,
                category varchar(255) NOT NULL,
                image TEXT NOT NULL
            );

            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "isAdmin" BOOLEAN DEFAULT true
            );

            CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                orderDate DATE DEFAULT CURRENT_DATE,
                "isCheckedOut" BOOLEAN DEFAULT false
            );

            CREATE TABLE reviews (
                id SERIAL PRIMARY KEY,
                product_id INTEGER REFERENCES products(id),
                user_id INTEGER REFERENCES users(id),
                title text NOT NULL,
                description text NOT NULL,
                rating INTEGER NOT NULL
            );

            CREATE TABLE order_items (
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id),
                product_id INTEGER REFERENCES products(id),
                quantity INTEGER NOT NULL
            );
        `);

        console.log("Finished building tables!");
    } catch (error) {
        console.error("Error building tables!");
        throw error;
    } finally {
        if (client) {
            client.end();
        }
    }
}

async function populateInitialData() {
    console.log("Starting to create users...");
    await createUser({
        firstName: "Ulysses",
        lastName: "Cortes",
        email: "uly@gmail.com",
        password: "123456789",
        isAdmin: true,
    });
}

buildTables()
    .then(populateInitialData)
    .catch(console.error);

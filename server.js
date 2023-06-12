// server.js
const http = require("http");
const app = require("./app");
const client = require("./db/client");

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Move client.connect() here
client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log("Server is listening on PORT:", PORT);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

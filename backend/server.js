// server.js — Application entry point
// Loads env vars, syncs the database schema, then starts the HTTP server.

require('dotenv').config();
const app = require("./src/app");
const sequelize = require("./src/config/database");

const PORT = process.env.PORT || 5000;

// Sync Sequelize models to the database (alter: true updates columns without dropping data),
// then start listening for HTTP requests.
sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });

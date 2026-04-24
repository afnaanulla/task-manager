// database.js — Sequelize PostgreSQL connection
// Reads the DATABASE_URL from environment variables and configures a connection
// with SSL enabled (required for cloud-hosted PostgreSQL providers like Neon, Supabase, etc.)

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false, // Disable SQL query logging in the console for cleaner output
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Allows self-signed certs used by cloud DB providers
    },
  },
});

module.exports = sequelize;
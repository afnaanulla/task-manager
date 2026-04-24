// app.js — Express application setup

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();


app.use(helmet());

// CORS — only allow requests from origins listed in ALLOWED_ORIGINS env variable.
// Falls back to localhost:5173 (Vite dev server) when env var is not set.
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests (no origin header) and whitelisted origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: false
}));


app.use(express.json());


app.use("/api/authenticate", require("./routes/auth.routes")); // POST /signup, POST /login
app.use("/api/tasks", require("./routes/task.routes"));         // CRUD for tasks (protected)

// Health check endpoint — used by hosting platforms to confirm the server is alive
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Global error handler — must be registered last so it catches errors from all routes
app.use(errorMiddleware);

module.exports = app;

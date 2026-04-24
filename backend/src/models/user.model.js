// user.model.js — Sequelize model for the User table
// Each user has a UUID primary key, a unique email, and a bcrypt-hashed password.

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Auto-generate a UUID on creation
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,        // Prevents duplicate accounts
        allowNull: false,
        validate: {
            isEmail: true,   // Sequelize-level format check before hitting the DB
        }
    },
    password: {
        type: DataTypes.STRING, // Stored as a bcrypt hash — never plain text
        allowNull: false,
    },
});

module.exports = User;
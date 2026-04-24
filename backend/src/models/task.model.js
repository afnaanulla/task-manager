// task.model.js — Sequelize model for the Task table

const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty", 
        },
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED"),
      defaultValue: "PENDING",
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
    indexes: [
      { fields: ["status"] },
      { fields: ["userId"] },
    ],
  }
);

module.exports = Task;
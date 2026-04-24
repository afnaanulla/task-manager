// models/index.js — Model associations barrel file
// Imports all models and defines their relationships before exporting them together.
// Importing from this file ensures associations are always registered.

const User = require('./user.model');
const Task = require('./task.model');

// A User can own many Tasks; deleting a User cascades to delete their Tasks
User.hasMany(Task, {
    foreignKey: 'userId',
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

// A Task always belongs to one User (the owner)
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Task };
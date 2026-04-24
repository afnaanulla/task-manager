// error.middleware.js — Global Express error handler
// Catches all errors passed via next(error) and returns a structured JSON response.
// Must be registered as the last middleware in app.js (4 parameters = error handler).

module.exports = (error, request, response) => {
    console.error(error);

    // Sequelize field-level validation failures (e.g. isEmail check, notEmpty)
    if (error.name === 'SequelizeValidationError') {
        return response.status(400).json({
            message: error.errors.map(e => e.message).join(', ')
        });
    }

    // Unique constraint violation — most commonly a duplicate email on signup
    if (error.name === 'SequelizeUniqueConstraintError') {
        return response.status(400).json({
            message: "An account with this email already exists. Please log in."
        });
    }

    // Fallback for any unhandled server errors
    response.status(500).json({
        message: "Internal Server Error"
    });
};
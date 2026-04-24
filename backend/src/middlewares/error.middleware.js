// error.middleware.js — Global Express error handler
module.exports = (error, request, response, next) => {
    console.error(error);


    if (error.name === 'SequelizeValidationError') {
        return response.status(400).json({
            message: error.errors.map(e => e.message).join(', ')
        });
    }


    if (error.name === 'SequelizeUniqueConstraintError') {
        return response.status(400).json({
            message: "An account with this email already exists. Please log in."
        });
    }


    response.status(500).json({
        message: "Internal Server Error"
    });
};
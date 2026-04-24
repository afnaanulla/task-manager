// generateToken.js — JWT token generator utility
// Signs a short-lived JWT containing the user's id and email.
// The token is used by the frontend to authenticate subsequent API requests.

const jsonwebtoken = require('jsonwebtoken');

/**
 * Generates a signed JWT for the given user.
 * @param {Object} user - Sequelize User instance (must have id and email)
 * @returns {string} Signed JWT string, expires in 1 day
 */
module.exports = (user) => {
    return jsonwebtoken.sign(
        { id: user.id, email: user.email }, // Payload — minimal data needed by the API
        process.env.JWT_TOKEN,               // Secret key from environment variables
        { expiresIn: '1d' }                  // Token becomes invalid after 24 hours
    );
};
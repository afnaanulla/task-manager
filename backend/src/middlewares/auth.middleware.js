// auth.middleware.js — JWT authentication guard
// Protects routes by verifying the Bearer token in the Authorization header.
// Attaches the decoded user payload to request.user for downstream controllers.

const jsonwebtoken = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const authHeader = request.headers.authorization;

    // Reject if no Authorization header or if it doesn't use the Bearer scheme
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract the token string after "Bearer "
    const token = authHeader.split(' ')[1];

    // Guard against edge case where the token string itself is empty
    if (!token || token.trim() === '') {
        return response.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    try {
        // Verify signature and expiry; throws if invalid or expired
        const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN);
        request.user = decoded; // Make user data (id, email) available to route handlers
        next();
    } catch (error) {
        return response.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};
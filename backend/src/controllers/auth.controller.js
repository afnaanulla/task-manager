// auth.controller.js — Handles user registration and login

const bcrypt = require('bcrypt');
const { User } = require("../models");
const generateToken = require("../utils/generateToken");

// POST /api/authenticate/signup
exports.signup = async (request, response, next) => {
    try {
        const { email, password } = request.body;


        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashed
        });


        response.status(201).json({
            token: generateToken(user),
            user: {
                id: user.id,
                email: user.email
            },
        });
    } catch (error) {

        next(error);
    }
};

// POST /api/authenticate/login
exports.login = async (request, response, next) => {
    try {
        const { email, password } = request.body;


        const user = await User.findOne({ where: { email } });


        if (!user) {
            return response.status(401).json({
                message: "No account found with this email. Please sign up."
            });
        }


        const isValid = await bcrypt.compare(password, user.password);


        if (!isValid) {
            return response.status(401).json({
                message: "Incorrect password. Please try again."
            });
        }


        response.json({
            token: generateToken(user),
            user: {
                id: user.id,
                email: user.email
            },
        });
    } catch (error) {
        next(error);
    }
};

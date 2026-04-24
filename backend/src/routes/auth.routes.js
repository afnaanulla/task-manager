// auth.routes.js — Authentication routes

const router = require("express").Router();
const { signup, login } = require("../controllers/auth.controller");
const { validateSignup, validateLogin } = require("../middlewares/validation.middleware");


router.post("/signup", validateSignup, signup);


router.post("/login", validateLogin, login);

module.exports = router;
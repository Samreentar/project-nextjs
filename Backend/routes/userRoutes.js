const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import the User model
const { registerUser, loginUser } = require("../controllers/userController"); // Import existing controllers

const router = express.Router();

// ✅ Register User API
router.post("/register",registerUser);

// ✅ Login User API (kept from original)
router.post("/login", loginUser);

module.exports = router;

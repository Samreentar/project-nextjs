const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import the User model
const { registerUser, loginUser } = require("../controllers/userController"); // Import existing controllers

const router = express.Router();

// ✅ Register User API
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// ✅ Login User API (kept from original)
router.post("/login", loginUser);

module.exports = router;

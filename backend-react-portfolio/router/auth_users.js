const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");
const router = express.Router();

// REGISTERING NEW USER

router.post("/register", async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    if (existingUser) {
      return res.status(400).json({
        error: "User is already registered with the provided credentials",
      });
    }

    // Create new user if not already registered
    const newUser = new UserModel({
      username: req.body.username,
      password: req.body.password, // Storing password directly (not recommended for production)
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ONLY REGISTERED USERS CAN LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Simple password comparison
    if (req.body.password !== user.password)
      return res.status(400).json({ error: "Invalid password" });

    const accessToken = jwt.sign(
      { username: user.username, password: password, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    req.session.authentication = {
      accessToken: accessToken,
    };
    return res
      .status(200)
      .json({ message: " User logged in sucessfully!", accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add logout logic
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(404).json({ message: "Error logging out" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Successfully logged out" });
  });
});

module.exports = router;

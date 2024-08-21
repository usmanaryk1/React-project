const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");
const router = express.Router();

// REGISTERING NEW USER

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists. Please log in.",
      });
    }

    // Check if username already exists
    const usernameExists = await UserModel.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists. Please choose another.",
      });
    }

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password,
      loggedIn: false,
    });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(503).json({
      message: "Signup failed. Please try again.",
      error: err.message,
    });
  }
});

// REGISTERING NEW USER

// router.post("/register", async (req, res) => {
//   try {
//     // Check if the user already exists
//     const existingUser = await UserModel.findOne({
//       email: req.body.email,
//     });
//     if (existingUser) {
//       return res.status(400).json({
//         error: "User is already registered with the provided credentials",
//       });
//     }

//     // Create new user if not already registered
//     const newUser = new UserModel({
//       username: req.body.username,
//       password: req.body.password, // Storing password directly (not recommended for production)
//       email: req.body.email,
//       role: req.body.role,
//       loggedIn: req.body.loggedIn,
//     });
//     await newUser.save();

//     const token = jwt.sign(
//       { id: newUser._id, role: newUser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     res.status(201).json({
//       message: "User registered successfully",
//       UserModel: newUser,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// ONLY REGISTERED USERS CAN LOGIN

router.post("/login", async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) return res.status(400).json({ error: "User not found" });

    // Simple password comparison
    if (req.body.password !== existingUser.password)
      return res.status(400).json({ error: "Invalid password" });

    // Update loggedIn status
    existingUser.loggedIn = true;
    await existingUser.save();

    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: " User logged in sucessfully!",
      UserModel: existingUser,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGOUT

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// Add logout logic
// router.post("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(404).json({ message: "Error logging out" });
//     }
//     res.clearCookie("connect.sid");
//     return res.status(200).json({ message: "Successfully logged out" });
//   });
// });

module.exports = router;

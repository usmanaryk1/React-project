const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userSchema");
const authenticateJWT = require("../middleware/authmiddleware");
const router = express.Router();
const admin = require("../api/firebaseAdmin.js");
const authenticateFbToken = require("../middleware/FirebaseMiddleware.js");

// const bcrypt = require("bcrypt"); // Import bcrypt
// REGISTERING NEW USER

router.post("/register", async (req, res) => {
  try {
    const { username, email, firebaseUID } = req.body;

    // Check if email already exists
    const userExists = await UserModel.findOne({
      $or: [{ email }, { firebaseUID }],
    });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists. Please log in.",
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
      firebaseUID, // Store Firebase UID for reference
      loggedIn: false,
    });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    // console.error("Error during signup:", err);
    return res.status(503).json({
      message: err,
      error: err.message,
    });
  }
});

// router.post("/register", async (req, res) => {
//   try {
//     // const { username, email, password, firebaseUID } = req.body;

//     // Check if email already exists
//     const emailExists = await UserModel.findOne({ email });
//     if (emailExists) {
//       return res.status(400).json({
//         message: "User already exists. Please log in.",
//       });
//     }

//     // Check if username already exists
//     const usernameExists = await UserModel.findOne({ username });
//     if (usernameExists) {
//       return res.status(400).json({
//         message: "Username already exists. Please choose another.",
//       });
//     }

//     // Hash the password before saving
//     // const salt = await bcrypt.genSalt(10);
//     // const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     const newUser = new UserModel({
//       username,
//       email,
//       password: hashedPassword, // Save the hashed password
//       loggedIn: false,
//     });
//     await newUser.save();

//     return res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//     });
//   } catch (err) {
//     console.error("Error during signup:", err);
//     return res.status(503).json({
//       message: "Signup failed. Please try again.",
//       error: err.message,
//     });
//   }
// });

// ONLY REGISTERED USERS CAN LOGIN

router.post("/login", async (req, res) => {
  try {
    const { firebaseToken } = req.body; // Firebase ID token
    // console.log("firebaseToken", firebaseToken);
    // Verify Firebase ID token
    const firebasedecodedToken = await admin
      .auth()
      .verifyIdToken(firebaseToken);
    const firebaseUID = firebasedecodedToken.uid;

    // Check if user exists in your database
    let existingUser = await UserModel.findOne({ firebaseUID });
    if (!existingUser) {
      existingUser = new UserModel({
        firebaseUID,
        email: firebasedecodedToken.email,
        loggedIn: true,
      });
      await existingUser.save();
    } else {
      // Update the loggedIn status if the user already exists
      existingUser.loggedIn = true;
      await existingUser.save();
    }

    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: " User logged in sucessfully!",
      UserModel: existingUser,
      firebaseToken,
      accessToken,
    });
  } catch (error) {
    console.log("Login error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const { email } = req.body;

//     // const existingUser = await UserModel.findOne({ email: req.body.email });
//     // if (!existingUser) return res.status(400).json({ error: "User not found" });

// Compare the hashed password with the stored hashed password
// const validPassword = await bcrypt.compare(
//   req.body.password,
//   existingUser.password
// );
// if (!validPassword)
//   return res.status(400).json({ error: "Invalid password" });

// // Update loggedIn status
// existingUser.loggedIn = true;
// await existingUser.save();

//     const accessToken = jwt.sign(
//       { id: existingUser._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       message: " User logged in sucessfully!",
//       UserModel: existingUser,
//       accessToken,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// LOGOUT
router.post("/logout", authenticateJWT, async (req, res) => {
  try {
    // Get user ID from the token (req.user is set in the verifyToken middleware)
    const userId = req.user.firebaseUID;

    // Find the user by ID and update loggedIn to false
    await UserModel.findOneAndUpdate(
      { firebaseUID: userId },
      { loggedIn: false },
      { new: true }
    );
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
});

// router.post("/logout", authenticateJWT, async (req, res) => {
//   try {
//     // Get user ID from the token (req.user is set in the verifyToken middleware)
//     const userId = req.user._id;

//     // Find the user by ID and update loggedIn to false
//     await UserModel.findByIdAndUpdate(
//       userId,
//       { loggedIn: false },
//       { new: true }
//     );
//     return res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: "Logout failed", error: error.message });
//   }
// });

module.exports = router;

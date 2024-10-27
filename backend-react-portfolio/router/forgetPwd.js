const express = require("express");
const router = express.Router();
const checkFirebaseUserByEmail = require("../utils/checkFirebaseUser");
const admin = require("../api/firebaseAdmin.js");
const sendPasswordResetEmail = require("./passwordResetEmail");
require("dotenv").config({ path: "./api/.env" });

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  // console.log("email received", email);

  // Validate the email
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if the user already exists in Firebase
    const firebaseCheck = await checkFirebaseUserByEmail(email);
    // console.log("firebase exists", firebaseCheck.exists);
    if (!firebaseCheck.exists) {
      return res.status(400).json({
        message:
          "Provided email does not have any account. Enter the correct one!",
      });
    }

    // Generate password reset link with a custom continue URL
    const actionCodeSettings = {
      url: `${
        process.env.FRONTEND_LOCALHOST_URL || process.env.FRONTEND_VERCEL_URL
      }/#/form/login-form`, // Your frontend URL with reset password path
      handleCodeInApp: true, // Indicates that you want the user to be directed back to your app
    };

    // Send password reset email using Firebase Authentication
    const passwordResetLink = await admin
      .auth()
      .generatePasswordResetLink(email, actionCodeSettings);

    await sendPasswordResetEmail(passwordResetLink, email); // Implement sendEmail function
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

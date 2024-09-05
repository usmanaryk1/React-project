const express = require("express");
const router = express.Router();
const UserModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "./api/.env" });

router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password, confirmPassword } = req.body;

  // Check if the passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ Status: "Passwords do not match" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ Status: "Error with token" });
    } else {
      // Hash the new password
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          // Update the user's password in the database
          UserModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((user) => res.status(200).json({ message: "Success" }))
            .catch((err) =>
              res
                .status(500)
                .json({ message: "Error updating password", error: err })
            );
        })
        .catch((err) =>
          res
            .status(500)
            .json({ message: "Error hashing password", error: err })
        );
    }
  });
});

module.exports = router;

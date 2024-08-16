const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for a user
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex to validate email format
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"], // Role can be either 'admin' or 'user'
      default: "user", // Default role is 'user'
    },
    loggedIn: {
      type: Boolean,
      default: false, // Default is logged out
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Create the model
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

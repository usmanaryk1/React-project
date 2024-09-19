const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for a user
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Ensure username is unique
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex to validate email format
    },
    firebaseUID: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    loggedIn: {
      type: Boolean,
      default: false, //User will be logged out by default
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Create the model
const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;

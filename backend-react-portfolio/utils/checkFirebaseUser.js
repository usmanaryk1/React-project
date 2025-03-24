const { admin } = require("../api/firebaseAdmin"); // Import Firebase Admin SDK

// Utility to check if a user exists in Firebase by email
const checkFirebaseUserByEmail = async (email) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return { exists: true, user: userRecord };
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return { exists: false, message: "User does not exist in Firebase." };
    }
    return { exists: false, error: "Internal server error." };
  }
};

module.exports = checkFirebaseUserByEmail;

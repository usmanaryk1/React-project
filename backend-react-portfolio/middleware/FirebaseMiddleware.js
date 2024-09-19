const admin = require("../api/firebaseAdmin.js");

const authenticateFbToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1]; // Extract the token

    try {
      // Verify Firebase ID token first
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken; // Set the decoded Firebase token user data to the request

      // Proceed to the next middleware after successful Firebase authentication
      return next();
    } catch (firebaseError) {
      console.log("Firebase Error:", firebaseError.message);
      return res.status(400).json({ message: firebaseError.message });
    }
  } else {
    return res.status(401).json({
      message: "Permission denied due to lack of authentication",
    });
  }
};

module.exports = authenticateFbToken;

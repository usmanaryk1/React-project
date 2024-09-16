// const jwt = require("jsonwebtoken");

// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     // Extract the token by removing "Bearer " prefix
//     const token = authHeader.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (err) {
//       res.status(400).json({ message: "Invalid token.", error: err.message });
//     }
//   } else {
//     // No token provided or incorrect format
//     res.status(401).json({ error: "Access denied. User is not authenticated" }); // Unauthorized
//   }
// };

// module.exports = authenticateJWT;

// const jwt = require("jsonwebtoken");
// const admin = require("../api/firebaseAdmin.js"); // Adjust path as necessary

// const authenticateJWT = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     const token = authHeader.split(" ")[1];

//     // Try to verify Firebase ID Token
//     try {
//       const decodedToken = await admin.auth().verifyIdToken(token);
//       req.user = decodedToken; // Attach Firebase user info
//       return next(); // Proceed with Firebase user info
//     } catch (firebaseErr) {
//       // Firebase token verification failed, continue to check for your JWT
//       console.log("Firebase Token Verification Failed:", firebaseErr.message);
//     }

//     // Firebase ID Token failed, now try to verify your JWT
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded;
//       return next(); // Proceed with your JWT user info
//     } catch (jwtErr) {
//       return res
//         .status(400)
//         .json({ message: "Invalid token.", error: jwtErr.message });
//     }
//   } else {
//     // No token provided or incorrect format
//     res.status(401).json({ error: "Access denied. User is not authenticated" }); // Unauthorized
//   }
// };

// module.exports = authenticateJWT;
const jwt = require("jsonwebtoken");
const admin = require("../api/firebaseAdmin.js");

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1]; //Extracting token
    try {
      decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (firebaseError) {
      res.status(400).json({ message: firebaseError.message });
      console.log("Firebase Error:", firebaseError.message);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (jwtError) {
      res
        .status(400)
        .json({ message: "Invalid Token", error: jwtError.message });
      console.log("JWT Error:", jwtError.message);
    }
  } else {
    res.status(401).json({
      message: "Permission denied due to lack of authentication",
    });
  }
};

module.exports = authenticateJWT;

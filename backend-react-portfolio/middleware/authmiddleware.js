// middleware/auth.js

const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token by removing "Bearer " prefix
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token.", error: err.message });
    }
  } else {
    // No token provided or incorrect format
    res.status(401).json({ error: "Access denied. User is not authenticated" }); // Unauthorized
  }

  // if (!token) {
  //   return res
  //     .status(401)
  //     .json({ message: "Access denied. User not authenticated." });
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   res.status(400).json({ message: "Invalid token.", error: err.message });
  // }
};

module.exports = authenticateJWT;

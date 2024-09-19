const jwt = require("jsonwebtoken");

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1]; //Extracting token

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (jwtError) {
      console.log("JWT Error:", jwtError.message);
      return res
        .status(400)
        .json({ message: "Invalid Token", error: jwtError.message });
    }
  } else {
    return res.status(401).json({
      message: "Permission denied due to lack of authentication",
    });
  }
};

module.exports = authenticateJWT;

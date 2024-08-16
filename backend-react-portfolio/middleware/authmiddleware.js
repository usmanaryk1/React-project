const jwt = require("jsonwebtoken");
const session = require("express-session");

const auth = async (req, res, next) => {
  //Write the authenication mechanism here
  if (req.session.authentication) {
    let accessToken = req.session.authentication["accessToken"];
    try {
      const user = await jwt.verify(accessToken, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ error: "User not authenticated" });
    }
  } else {
    return res.status(403).json({ error: "User not logged in" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Access denied: Insufficient permissions"); // Forbidden
  }
};

module.exports = { auth, isAdmin };

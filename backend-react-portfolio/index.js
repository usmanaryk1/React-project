const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const mongoose = require("mongoose");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", async function auth(req, res, next) {
  //Write the authenication mechanism here
  if (req.session.authentication) {
    let accessToken = req.session.authentication["accessToken"];
    try {
      const user = await jwt.verify(accessToken, "access");
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({ message: "User not authenticated" });
    }
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);

const uri = "mongodb+srv://user:user123@cluster0.uogjtlx.mongodb.net/crud";

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
};

connect();

const PORT = 3333;

app.listen(PORT, () => console.log("Server is running at 3333"));

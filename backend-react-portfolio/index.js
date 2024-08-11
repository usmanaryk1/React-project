const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const mongoose = require("mongoose");
const connectDB = require("./router/database.js");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;
const cors = require("cors");
const personal_skillsRoutes = require("./router/personal_skills.js");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://react-project-frontend-iota.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

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
app.use("/hero", personal_skillsRoutes);
// const uri = "mongodb+srv://user:user123@cluster0.uogjtlx.mongodb.net/crud";

// const connect = async () => {
//   try {
//     await mongoose.connect(uri);
//     console.log("Mongoose connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

// connect();
connectDB();
// const PORT = 8000;

// app.listen(PORT, () => console.log("Server is running at 8000"));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

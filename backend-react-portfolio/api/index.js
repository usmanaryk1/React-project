// const express = require("express");
// const jwt = require("jsonwebtoken");
// const session = require("express-session");
// const mongoose = require("mongoose");
// const connectDB = require("./router/database.js");
// const customer_routes = require("./router/auth_users.js").authenticated;
// const genl_routes = require("./router/general.js").general;
// const cors = require("cors");
// const personal_skillsRoutes = require("./router/personal_skills.js");
// require("dotenv").config();

// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     origin: ["https://react-project-frontend-six.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );

// app.use(
//   "/customer",
//   session({
//     secret: "fingerprint_customer",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// app.use("/customer/auth/*", async function auth(req, res, next) {
//   //Write the authenication mechanism here
//   if (req.session.authentication) {
//     let accessToken = req.session.authentication["accessToken"];
//     try {
//       const user = await jwt.verify(accessToken, "access");
//       req.user = user;
//       next();
//     } catch (error) {
//       return res.status(403).json({ message: "User not authenticated" });
//     }
//   } else {
//     return res.status(403).json({ message: "User not logged in" });
//   }
// });

// app.use("/customer", customer_routes);
// app.use("/", genl_routes);
// app.use("/hero", personal_skillsRoutes);
// // const uri = "mongodb+srv://user:user123@cluster0.uogjtlx.mongodb.net/crud";

// // const connect = async () => {
// //   try {
// //     await mongoose.connect(uri);
// //     console.log("Mongoose connected");
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // connect();
// // const PORT = 8000;

// // app.listen(PORT, () => console.log("Server is running at 8000"));
// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// connectDB();
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const serverless = require("serverless-http");

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Simple route
app.get("/api/", (req, res) => {
  res.send("Hello World!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the app as a serverless function
// module.exports = app;
// module.exports.handler = serverless(app);

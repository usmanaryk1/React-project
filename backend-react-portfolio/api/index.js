const express = require("express");
// const jwt = require("jsonwebtoken");
// const session = require("express-session");
// const customer_routes = require("./router/auth_users.js").authenticated;
// const genl_routes = require("./router/general.js").general;
const cors = require("cors");
const connectDB = require("../router/database.js");
require("dotenv").config({ path: "./api/.env" });
const app = express();

// ROUTES
const personal_SkillsRoutes = require("../router/personal_skills.js");
const About_Routes = require("../router/about.js");
const Service_Routes = require("../router/services.js");
const Counter_Routes = require("../router/counter.js");
const Project_Routes = require("../router/projects.js");
const Testimonial_Routes = require("../router/testimonial.js");
const Certification_Routes = require("../router/certification.js");

app.use(express.json());
app.use(cors());

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
app.use("/hero", personal_SkillsRoutes);
app.use("/about", About_Routes);
app.use("/services", Service_Routes);
app.use("/counts", Counter_Routes);
app.use("/works", Project_Routes);
app.use("/testimonials", Testimonial_Routes);
app.use("/certifications", Certification_Routes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// // const serverless = require("serverless-http");

// dotenv.config();

// const app = express();

// // Middleware to parse JSON
// app.use(express.json());

// // Simple route
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// // Starting server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// Export the app as a serverless function
// module.exports = app;
// module.exports.handler = serverless(app);

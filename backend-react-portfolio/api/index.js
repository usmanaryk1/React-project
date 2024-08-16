const express = require("express");
// const customer_routes = require("./router/auth_users.js").authenticated;
// const genl_routes = require("./router/general.js").general;
const cors = require("cors");
const connectDB = require("../router/database.js");
require("dotenv").config({ path: "./api/.env" });
const app = express();

// IMPORT ROUTES
const personal_SkillsRoutes = require("../router/personal_skills.js");
const About_Routes = require("../router/about.js");
const Service_Routes = require("../router/services.js");
const Counter_Routes = require("../router/counter.js");
const Project_Routes = require("../router/projects.js");
const Testimonial_Routes = require("../router/testimonial.js");
const Certification_Routes = require("../router/certification.js");
const Contact_Routes = require("../router/contact.js");
const Social_Routes = require("../router/social.js");
const ProjectDetails_Routes = require("../router/projectDetails.js");
const Auth_Routes = require("../router/auth_users.js");

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

//

// app.use("/customer", customer_routes);
// app.use("/", genl_routes);

// USE ROUTES

app.use("/hero", personal_SkillsRoutes);
app.use("/about", About_Routes);
app.use("/services", Service_Routes);
app.use("/counts", Counter_Routes);
app.use("/works", Project_Routes);
app.use("/testimonials", Testimonial_Routes);
app.use("/certifications", Certification_Routes);
app.use("/contact", Contact_Routes);
app.use("/social", Social_Routes);
app.use("/workDetails", ProjectDetails_Routes);
app.use("/auth", Auth_Routes);

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

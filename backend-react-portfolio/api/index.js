const express = require("express");
const cors = require("cors");
const connectDB = require("../router/database.js");
require("dotenv").config({ path: "./api/.env" });
const app = express();
const path = require("path");

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
const Dashboard_Routes = require("../router/dashboard.js");
const Upload_CV = require("../router/uploadCV.js");
const Download_CV = require("../router/downloadCV.js");
const Forgot_Routes = require("../router/forgetPwd.js");
const Reset_Routes = require("../router/resetPwd.js");

// Simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(
  cors({
    origin: "https://frontend-react-portfolio.vercel.app",
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
// USE ROUTES

app.use("/api/hero", personal_SkillsRoutes);
app.use("/api/about", About_Routes);
app.use("/api/services", Service_Routes);
app.use("/api/counts", Counter_Routes);
app.use("/api/works", Project_Routes);
app.use("/api/testimonials", Testimonial_Routes);
app.use("/api/certifications", Certification_Routes);
app.use("/api/contact", Contact_Routes);
app.use("/api/social", Social_Routes);
app.use("/api/workDetails", ProjectDetails_Routes);
app.use("/api/auth", Auth_Routes);
app.use("/api/dashboard", Dashboard_Routes);
app.use("/api", Upload_CV);
app.use("/api", Download_CV);
app.use("/api", Forgot_Routes);
app.use("/api", Reset_Routes);
app.use(express.static(path.join(__dirname, "public")));

// Handle all other routes by serving the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;

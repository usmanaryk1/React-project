const express = require("express");
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
const Dashboard_Routes = require("../router/dashboard.js");
const Upload_CV = require("../router/uploadCV.js");
const Download_CV = require("../router/downloadCV.js");
const Upload_Images = require("../router/uploadImg.js");

// Simple route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
// app.use(cors());
// app.use(
//   cors({
//     origin: "https://frontend-react-portfolio.vercel.app",
//   })
// );
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
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
app.use("/api", Upload_Images);
app.use("/api/dashboard", Dashboard_Routes);
app.use("/api", Upload_CV);
app.use("/api", Download_CV);

// Make uploads folder public
app.use("/uploads", express.static("uploads"));

connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;

const express = require("express");
const cors = require("cors");
const connectDB = require("../router/database.js");
require("dotenv").config({ path: "./api/.env" });
const app = express();
const path = require("path");

app.use(
  cors({
    origin: [
      "https://frontend-react-portfolio.vercel.app",
      "http://localhost:3000",
    ],
    methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
  })
);

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
const Download_CV = require("../router/downloadCV.js");
const Forgot_Routes = require("../router/forgetPwd.js");
const Reset_Routes = require("../router/resetPwd.js");
const Terms_Routes = require("../router/termsAndConditions.js");
const Skills_Routes = require("../router/skills.js");
const ContactUs_Routes = require("../router/contactForm.js");
const SectionVisibility_Routes = require("../router/SectionVisibility.js");
const DynamicSections_Routes = require("../router/dynamicSections.js");
const CV = require("../router/CV.js");
const Settings_Route = require("../router/settings.js");
// Simple route
app.get("/", (req, res) => {
  res.send("Welcome to API!");
});

// USE ROUTES
app.use(express.json());

app.use("/api/hero", personal_SkillsRoutes);
app.use("/api/about", About_Routes);
app.use("/api/services", Service_Routes);
app.use("/api/counts", Counter_Routes);
app.use("/api/works", Project_Routes);
app.use("/api/testimonials", Testimonial_Routes);
app.use("/api/certifications", Certification_Routes);
app.use("/api/contact", Contact_Routes);
app.use("/api/contactUs", ContactUs_Routes);
app.use("/api/social", Social_Routes);
app.use("/api/workDetails", ProjectDetails_Routes);
app.use("/api/auth", Auth_Routes);
app.use("/api/dashboard", Dashboard_Routes);
app.use("/api/cv", CV);
app.use("/api", Download_CV);
app.use("/api", Forgot_Routes);
app.use("/api", Reset_Routes);
app.use("/api/terms", Terms_Routes);
app.use("/api/skills", Skills_Routes);
app.use("/api/sectionVisibility", SectionVisibility_Routes);
app.use("/api/dynamicSections", DynamicSections_Routes);
app.use("/api/settings", Settings_Routes);

app.use("/api/*", (req, res, next) => {
  res.status(404).json({ message: "API route not found" });
});
// Serve the static files from the React app (build folder)
app.use(
  express.static(path.join(__dirname, "../../frontend-react-portfolio/build"))
);

// Catch-all handler for any route that isn't an API call
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    // console.log("index.html hit");
    const filePath = path.join(
      __dirname,
      "../../frontend-react-portfolio/build",
      "index.html"
    );
    // console.log("Serving file:", filePath); // Log the file path for debugging
    res.sendFile(filePath);
  }
});
connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;

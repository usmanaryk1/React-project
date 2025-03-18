const express = require("express");
const CV_Model = require("../models/CVSchema");
const authenticateJWT = require("../middleware/authmiddleware");
const router = express.Router();

// Fetch CV URL by userId
router.get("/cvs", authenticateJWT, async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized: User not found" });
  }
  const userId = req.user.id;

  try {
    const cvs = await CV_Model.find({ userId });

    if (!cvs) {
      return res.status(404).json({ message: "CV not found" });
    }
    console.log("cvs:", cvs);
    // Return the CV URL directly
    res.status(200).json(cvs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch CVs." });
  }
});

// POST route to save CV URL
router.post("/upload-cv", authenticateJWT, async (req, res) => {
  const { cvUrl, isVisible } = req.body;
  const userId = req.user.id; // Extract userId from token

  console.log("userid", userId);
  // console.log("cvurl", req.body.cvUrl);

  try {
    // console.log("Request Body:", req.body); // Log request body
    if (!cvUrl) {
      return res.status(400).json({ message: "Missing cvUrl" });
    }

    const newCV = new CV_Model({ userId, cvUrl, isVisible });
    const savedCV = await newCV.save();

    // console.log("CV Saved:", savedCV); // Log saved CV
    return res.status(200).json(savedCV);
  } catch (error) {
    console.error("Error in /api/upload-cv:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

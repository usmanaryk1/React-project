const express = require("express");
const CV_Model = require("../models/CVSchema");
const authenticateJWT = require("../middleware/authmiddleware");
const router = express.Router();

// POST route to save CV URL
router.post("/upload-cv", authenticateJWT, async (req, res) => {
  const { userId, cvUrl } = req.body;
  // console.log("userid", req.body.userId);
  // console.log("cvurl", req.body.cvUrl);

  try {
    // console.log("Request Body:", req.body); // Log request body
    if (!userId || !cvUrl) {
      return res.status(400).json({ message: "Missing userId or cvUrl" });
    }

    const newCV = new CV_Model({ userId, cvUrl });
    const savedCV = await newCV.save();

    // console.log("CV Saved:", savedCV); // Log saved CV
    return res.status(200).json(savedCV);
  } catch (error) {
    console.error("Error in /api/upload-cv:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

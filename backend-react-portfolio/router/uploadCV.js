const express = require("express");
const CV_Model = require("../models/CVSchema");
const router = express.Router();

// POST route to save CV URL
router.post("/upload-cv", async (req, res) => {
  const { userId, cvUrl } = req.body;

  try {
    const newCV = new CV_Model({ userId, cvUrl });
    await newCV.save();
    res.status(200).json(newCV);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

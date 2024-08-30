const express = require("express");
const CV_Model = require("../models/CVSchema");
const router = express.Router();

router.get("/download-cv", async (req, res) => {
  try {
    const cv = await CV_Model.findOne({ userId: req.query.userId });
    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }
    res.redirect(cv.cvUrl); // Redirect to the Firebase Storage URL
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

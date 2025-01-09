const express = require("express");
const Sections_Model = require("../models/sectionSchema");
const router = express.Router();

// GET ALL SECTIONS
router.get("/", async (req, res) => {
  try {
    const sections = await Sections_Model.find();
    // console.log("sections", sections);
    if (sections.length === 0) {
      return res.status(404).send("Information Not Found");
    }
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
});
module.exports = router;

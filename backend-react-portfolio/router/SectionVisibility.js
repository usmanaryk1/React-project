const express = require("express");
const SectionVisibility_Model = require("../models/sectionVisibilitySchema ");
const authenticateJWT = require("../middleware/authmiddleware");
const router = express.Router();

// GET ALL SECTIONS
router.get("/", async (req, res) => {
  try {
    const sections = await SectionVisibility_Model.find();
    if (sections.length === 0) {
      res.status(404).json({ message: "Sections not found." });
    }
    console.log("sections", sections);
    res.status(200).json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.post("/", authenticateJWT, async (req, res) => {
  const { name, isVisible } = req.body;
  try {
    const UpdatedSections = await SectionVisibility_Model.findOneAndUpdate(
      { name },
      { isVisible },
      { new: true, upsert: true } // Update if exists, otherwise create
    );

    res.status(200).json(UpdatedSections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Updating Visibility State" });
  }
});

module.exports = router;

const express = require("express");
const Publications_Model = require("../models/publicationsSchema");
const router = express.Router();

// GET ALL SECTIONS
router.get("/", async (req, res) => {
  try {
    const publications = await Publications_Model.find();
    // console.log("sections", sections);
    if (publications.length === 0) {
      return res.status(404).send("Information Not Found");
    }
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data" });
  }
});
module.exports = router;

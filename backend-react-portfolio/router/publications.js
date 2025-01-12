const express = require("express");
const Publications_Model = require("../models/publicationsSchema");
const authenticateJWT = require("../middleware/authmiddleware");
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
    res.status(500).json({ message: error.message });
  }
});

// GET A SECTION BY ID

router.get("/:id", async (req, res) => {
  try {
    const section = await Publications_Model.findById(req.params.id);
    if (!section) {
      return res.status(404).send("No Information Found");
    }
    res.status(200).json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// POST SECTION

router.post("/", authenticateJWT, async (req, res) => {
  try {
    const newSection = new Publications_Model(req.body);
    const data = await newSection.save();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// UPDATE THE SECTION BY ID

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedSection = await Publications_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE A SECTION BY ID

router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const deletedSection = await Publications_Model.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSection) {
      return res.status(404).json({ message: "No information found" });
    }
    res.status(200).json({ message: "Information has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;

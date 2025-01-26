const express = require("express");
const authenticateJWT = require("../middleware/authmiddleware");
const DynamicSectionsModel = require("../models/dynamicSectionsSchema");
const router = express.Router();

// GET ALL SECTIONS
router.get("/", async (req, res) => {
  try {
    const dynamicSections = await DynamicSectionsModel.find();
    // console.log("sections", sections);
    if (dynamicSections.length === 0) {
      return res.status(404).send("Information Not Found");
    }
    res.status(200).json(dynamicSections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET A SECTION BY ID

router.get("/:id", async (req, res) => {
  try {
    const section = await DynamicSectionsModel.findById(req.params.id);
    if (!section) {
      return res.status(404).send("No Information Found");
    }
    res.status(200).json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// POST SECTION (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  try {
    const newSection = new DynamicSectionsModel(req.body);
    const data = await newSection.save();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// UPDATE THE SECTION BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedSection = await DynamicSectionsModel.findByIdAndUpdate(
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

// DELETE A SECTION BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  try {
    const deletedSection = await DynamicSectionsModel.findByIdAndDelete(
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

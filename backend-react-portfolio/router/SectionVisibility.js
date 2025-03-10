const express = require("express");
const SectionVisibility_Model = require("../models/sectionVisibilitySchema ");
const authenticateJWT = require("../middleware/authmiddleware");
const router = express.Router();

// GET ALL SECTIONS
router.get("/", async (req, res) => {
  try {
    const sections = await SectionVisibility_Model.find().sort({ order: 1 });
    if (sections.length === 0) {
      res.status(404).json({ message: "Sections not found." });
    }
    // console.log("sections", sections);
    res.status(200).json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.post("/", authenticateJWT, async (req, res) => {
  const { name, isVisible, isDynamic } = req.body;
  try {
    // Find the current maximum order in the collection
    const lastSection = await SectionVisibility_Model.findOne().sort({
      order: -1,
    });

    // Calculate the next order value
    const newOrder = lastSection ? lastSection.order + 1 : 1;

    const UpdatedSections = await SectionVisibility_Model.findOneAndUpdate(
      { name },
      { isVisible, order: newOrder, isDynamic },

      { new: true, upsert: true } // Update if exists, otherwise create
    );

    res.status(200).json(UpdatedSections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Updating Visibility State" });
  }
});

router.patch("/reorder", authenticateJWT, async (req, res) => {
  try {
    const { reorderedItems } = req.body; // [{ _id, order }, ...]
    console.log("reordered items:", reorderedItems);
    if (
      !Array.isArray(reorderedItems) ||
      reorderedItems.some((item) => !item._id || item.order === undefined)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid reordered items format" });
    }

    // console.log("Reordered Items:", reorderedItems);

    const bulkOps = reorderedItems.map((section) => ({
      updateOne: {
        filter: { _id: section._id },
        update: { $set: { order: section.order } }, // Use the order field from client
      },
    }));

    const result = await SectionVisibility_Model.bulkWrite(bulkOps);
    // console.log("BulkWrite Result:", result);

    res
      .status(200)
      .json({ message: "Sections reordered successfully", data: result });
  } catch (error) {
    console.error("Error reordering Sections:", error.stack || error.message);
    res.status(400).json({ message: "Failed to reorder Sections" });
  }
});

module.exports = router;

const express = require("express");
const authenticateJWT = require("../middleware/authmiddleware");
const DynamicSectionsModel = require("../models/dynamicSectionsSchema");
const {
  createDynamicCollection,
  deleteDynamicCollection,
  updateDynamicCollection,
} = require("../utils/createDynamicCollection");
const SectionVisibility_Model = require("../models/sectionVisibilitySchema ");
const router = express.Router();

// GET ALL SECTIONS
router.get("/", async (req, res) => {
  try {
    const dynamicSections = await DynamicSectionsModel.find().sort({
      order: 1,
    });
    // console.log("sections", sections);
    if (dynamicSections.length === 0) {
      return res.status(200).json([]); // Return an empty array with 200 status
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
    const { name, content, order, isDynamic } = req.body;
    const newSection = await DynamicSectionsModel.create({
      name,
      content,
      order,
      isDynamic,
    });

    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// router.post("/", authenticateJWT, createDynamicCollection);

// UPDATE THE SECTION BY ID (AUTHENTICATED ONLY)

router.put("/:id", async (req, res) => {
  try {
    const { name, content } = req.body;
    await DynamicSectionsModel.findByIdAndUpdate(req.params.id, {
      name,
      content,
    });
    await SectionVisibility_Model.findOneAndUpdate(
      { name: name },
      { name: name }
    );
    res.status(200).json({ message: "Section updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.put("/:id", authenticateJWT, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     if (!title || !content) {
//       return res
//         .status(400)
//         .json({ message: "Title and content are required" });
//     }
//     const updatedSection = await DynamicSectionsModel.findByIdAndUpdate(
//       req.params.id,
//       { title, content }, // Only update title and content
//       {
//         new: true,
//       }
//     );

//     // Update the corresponding dynamic collection
//     const collectionName = updatedSection.title
//       .toLowerCase()
//       .replace(/\s+/g, "_");

//     await updateDynamicCollection(collectionName, { title, content });

//     res.status(200).json(updatedSection);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// DELETE A SECTION BY ID (AUTHENTICATED ONLY)
router.delete("/:id", async (req, res) => {
  try {
    const section = await DynamicSectionsModel.findByIdAndDelete(req.params.id);
    console.log("sectionDeleted", section);
    await SectionVisibility_Model.findOneAndDelete({
      name: `${section.name}`,
    });
    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// router.delete("/:id", authenticateJWT, async (req, res) => {
//   try {
//     const deletedSection = await DynamicSectionsModel.findByIdAndDelete(
//       req.params.id
//     );
//     if (!deletedSection) {
//       return res.status(404).json({ message: "No information found" });
//     }

//     // Remove from sectionVisibility collection
//     await SectionVisibility_Model.findOneAndDelete({
//       name: `${deletedSection.title} Section`,
//     });

//     // Delete the dynamic collection itself (if you want to remove it)
//     await deleteDynamicCollection(deletedSection.title);
//     res.status(200).json({ message: "Information has been deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;

const express = require("express");
const authenticateJWT = require("../middleware/authmiddleware.js");
const Skills_Model = require("../models/skillsSchema.js");
const router = express.Router();

// GET All SKILLS

router.get("/", async (req, res) => {
  try {
    const Skills = await Skills_Model.find().sort({ order: 1 }); // Ensure you're querying by the correct field, `order` and get the result in ascending order
    if (Skills.length === 0) {
      return res.status(404).json({ message: "Inforamtion Not Found" });
    }
    res.status(200).json(Skills); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET SKILLS BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const Skills = await Skills_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!Skills) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(Skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST SKILLS (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  // console.log("Inside post function");
  // Find the current maximum order in the collection
  const lastSection = await Skills_Model.findOne().sort({ order: -1 });

  // Calculate the next order value
  const newOrder = lastSection ? lastSection.order + 1 : 0;
  const data = new Skills_Model({
    name: req.body.name,
    proficiency: req.body.proficiency,
    order: newOrder,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// UPDATE SKILLS BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    // console.log("Request Body", req.body);
    const updatedSkills = await Skills_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSkills);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: `Failed to Update Terms: ${error.message}` });
  }
});

// DELETE SKILLS BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  const Id = req.params.id;

  try {
    const Skills = await Skills_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `email` not `id`
    if (!Skills) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: Skills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

// REORDER SKILLS BY MAPPING REORDERED TERMS (AUTHENTICATED ONLY)

router.patch("/reorder", authenticateJWT, async (req, res) => {
  try {
    const { reorderedItems } = req.body; // [{ _id, order }, ...]

    if (!Array.isArray(reorderedItems)) {
      return res
        .status(400)
        .json({ message: "Invalid reordered items format" });
    }

    // console.log("Reordered Items:", reorderedItems);

    const bulkOps = reorderedItems.map((skill) => ({
      updateOne: {
        filter: { _id: skill._id },
        update: { $set: { order: skill.order } }, // Use the order field from client
      },
    }));

    const result = await Skills_Model.bulkWrite(bulkOps);
    // console.log("BulkWrite Result:", result);

    res.status(200).json({ message: "Skills reordered successfully" });
  } catch (error) {
    console.error("Error reordering skills:", error.stack || error.message);
    res.status(400).json({ message: "Failed to reorder skills" });
  }
});

module.exports = router;

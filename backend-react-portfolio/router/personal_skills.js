const express = require("express");
const Personal_SkillsModel = require("../models/personalSchema.js");
const authenticateJWT = require("../middleware/authmiddleware.js");
const router = express.Router();

// GET All PERSONAL INFO

router.get("/", async (req, res) => {
  try {
    const PersonalSkills = await Personal_SkillsModel.find(); // Ensure you're querying by the correct field, `email` not `id`
    if (PersonalSkills.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(PersonalSkills); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET PERSONAL INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const PersonalSkills = await Personal_SkillsModel.findById(Id); // Ensure you're querying by the correct field, `email` not `id`
    if (!PersonalSkills) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(PersonalSkills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST PERSONAL INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  // console.log("Inside post function");

  const data = new Personal_SkillsModel({
    name: req.body.name,
    skills: req.body.skills,
    isActive: req.body.isActive,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// UPDATE PERSONAL INFO BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    // console.log("Request Body", req.body);
    const updatedSkills = await Personal_SkillsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSkills);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: `Failed to update skills: ${error.message}` });
  }
});

// DELETE PERSONAL INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  const Id = req.params.id;

  try {
    const PersonalSkills = await Personal_SkillsModel.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `email` not `id`
    if (!PersonalSkills) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: PersonalSkills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

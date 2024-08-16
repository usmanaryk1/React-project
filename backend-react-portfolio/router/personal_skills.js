const express = require("express");
const Personal_SkillsModel = require("../models/personalSchema.js");
const router = express.Router();

// POST PERSONAL INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Personal_SkillsModel({
    name: req.body.name,
    skills: req.body.skills,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// GET All PERSONAL INFO

router.get("/", async (req, res) => {
  try {
    const PersonalSkills = await Personal_SkillsModel.find(); // Ensure you're querying by the correct field, `email` not `id`
    if (PersonalSkills.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(PersonalSkills); // 200 OK status code
  } catch (err) {
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
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// DELETE PERSONAL INFO BY ID

router.delete("/:id", async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

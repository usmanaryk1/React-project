const express = require("express");
const Personal_SkillsModel = require("../models/personalSchema.js");
const router = express.Router();

// POST PERSONAL INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Personal_SkillsModel({
    name: req.body.name,
    skills: req.body.skills,
    id: req.body.id,
  });

  try {
    const val = await data.save();
    res.json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// GET PERSONAL INFO
router.get("/", async (req, res) => {
  try {
    const PersonalSkills = await Personal_SkillsModel.find(); // Ensure you're querying by the correct field, `email` not `id`
    if (PersonalSkills.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.send(PersonalSkills);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET PERSONAL INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const PersonalSkills = await Personal_SkillsModel.find({ id: Id }); // Ensure you're querying by the correct field, `email` not `id`
    if (PersonalSkills.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.send(PersonalSkills);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE METHOD

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const user = await userModel.findOneAndDelete({ id: Id }); // Ensure you're querying by the correct field, `email` not `id`
    if (user == null) {
      return res.status(404).send(`The user with ${emailId} not found.`);
    }
    res.status(200).send(`The user with ${emailId} has been deleted.` + user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

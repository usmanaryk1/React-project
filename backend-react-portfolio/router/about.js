const express = require("express");
const About_Model = require("../models/aboutSchema.js");
const router = express.Router();

// POST ABOUT INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new About_Model({
    name: req.body.name,
    profile: req.body.profile,
    email: req.body.email,
    phone: req.body.phone,
    desc1: req.body.desc1,
    desc2: req.body.desc1,
    desc3: req.body.desc1,
    img: req.body.img,
    isActive: req.body.isActive,
    id: req.body.id, // Ensure this matches your schema field
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// GET ALL ABOUT INFO

router.get("/", async (req, res) => {
  try {
    const AboutInfo = await About_Model.find(); // Ensure you're querying by the correct field, `id`
    if (AboutInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.send(AboutInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET ABOUT INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const AboutInfo = await About_Model.find({ id: Id }); // Ensure you're querying by the correct field, `id`
    if (AboutInfo.length === 0) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send(AboutInfo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// DELETE ABOUT INFO BY ID

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const AboutInfo = await About_Model.findOneAndDelete({ id: Id }); // Ensure you're querying by the correct field, `id`
    if (AboutInfo == null) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: ProjectInfo,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

module.exports = router;

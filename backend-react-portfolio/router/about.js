const express = require("express");
const About_Model = require("../models/aboutSchema.js");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");
// GET ALL ABOUT INFO

router.get("/", async (req, res) => {
  try {
    const AboutInfo = await About_Model.find();
    if (AboutInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).send(AboutInfo); // 200 OK status code
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET ABOUT INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const AboutInfo = await About_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!AboutInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send(AboutInfo); // 200 OK status code
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST ABOUT INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  // console.log("Inside post function");

  const data = new About_Model({
    name: req.body.name,
    profile: req.body.profile,
    email: req.body.email,
    phone: req.body.phone,
    desc: req.body.desc,
    img: req.body.img,
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

// UPDATE ABOUT BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedAbout = await About_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAbout);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update about info" });
  }
});

// DELETE ABOUT INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  const Id = req.params.id;

  try {
    const AboutInfo = await About_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `id`
    if (!AboutInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: AboutInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

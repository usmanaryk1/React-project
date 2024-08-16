const express = require("express");
const Contact_Model = require("../models/contactSchema");
const Social_Model = require("../models/socialSchema");
const router = express.Router();

// GET ALL SOCIAL INFO

router.get("/", async (req, res) => {
  try {
    const SocialInfo = await Social_Model.find(); // Ensure you're querying by the correct field, `id`
    if (SocialInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(SocialInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET SOCIAL INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const SocialInfo = await Social_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (SocialInfo.length === 0) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(SocialInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST SOCIAL INFO (AUTHENTICATED ONLY)

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Social_Model({
    platformIcon: req.body.platformIcon,
    link: req.body.link,
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

// UPDATE SOCIAL BY ID (AUTHENTICATED ONLY)

router.put("/:id", async (req, res) => {
  try {
    const updatedSocial = await Social_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSocial);
  } catch (error) {
    res.status(400).json({ error: "Failed to update social link" });
  }
});

// DELETE SOCIAL INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const SocialInfo = await Social_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field,`id`
    if (SocialInfo == null) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: SocialInfo,
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

const express = require("express");
const ProjectDetails_Model = require("../models/projectDetailsSchema");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");

// GET ALL PROJECT DETAILS INFO

router.get("/", async (req, res) => {
  try {
    const ProjectDetails = await ProjectDetails_Model.find();
    if (ProjectDetails.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).send(ProjectDetails); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET PROJECT DETAILS INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectDetails = await ProjectDetails_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!ProjectDetails) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send(ProjectDetails); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST PROJECT DETAILS INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  // console.log("Inside post function");

  const data = new ProjectDetails_Model({
    slideImages: req.body.slideImages,
    pCategory: req.body.pCategory,
    pClient: req.body.pClient,
    pDate: req.body.pDate,
    pURL: req.body.pURL,
    desc: req.body.desc,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// UPDATE PROJECT DETAILS BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedDetails = await ProjectDetails_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDetails);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update project details" });
  }
});

// DELETE PROJECT DETAILS INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectDetails = await ProjectDetails_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `id`
    if (!ProjectDetails) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: ProjectDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

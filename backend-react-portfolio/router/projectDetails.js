const express = require("express");
const ProjectDetails_Model = require("../models/projectDetailsSchema");
const router = express.Router();

// POST PROJECT DETAILS INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new ProjectDetails_Model({
    slideImages: req.body.slideImages,
    pCategory: req.body.pCategory,
    pClient: req.body.pClient,
    pDate: req.body.pDate,
    pURL: req.body.pURL,
    desc: req.body.desc,
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

// GET ALL PROJECT DETAILS INFO

router.get("/", async (req, res) => {
  try {
    const ProjectDetails = await ProjectDetails_Model.find(); // Ensure you're querying by the correct field, `id`
    if (ProjectDetails.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).send(ProjectDetails); // 200 OK status code
  } catch (err) {
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
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// DELETE PROJECT DETAILS INFO BY ID

router.delete("/:id", async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

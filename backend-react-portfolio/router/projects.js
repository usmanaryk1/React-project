const express = require("express");
const Project_Model = require("../models/projectsSchema");
const router = express.Router();

// GET ALL PROJECT INFO

router.get("/", async (req, res) => {
  try {
    const ProjectInfo = await Project_Model.find(); // Ensure you're querying by the correct field, `id`
    if (ProjectInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(ProjectInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET PROJECT INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectInfo = await Project_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!ProjectInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(ProjectInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST PROJECT INFO (AUTHENTICATED ONLY)

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Project_Model({
    workImage: req.body.workImage,
    wTitle: req.body.wTitle,
    wCategory: req.body.wCategory,
    wDate: req.body.wDate,
    pURL: req.body.pURL,
    isActive: req.body.isActive,
    workDetailsId: req.body.workDetailsId,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

// UPDATE PROJECT BY ID (AUTHENTICATED ONLY)

router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await Project_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ error: "Failed to update project" });
  }
});

// DELETE PROJECT INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectInfo = await Project_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `id`
    if (!ProjectInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: ProjectInfo,
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

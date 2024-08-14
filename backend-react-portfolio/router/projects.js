const express = require("express");
const Project_Model = require("../models/projectsSchema");
const router = express.Router();

// POST PROJECT INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Project_Model({
    workImage: req.body.workImage,
    wTitle: req.body.wTitle,
    wCategory: req.body.wCategory,
    wDate: req.body.wDate,
    pURL: req.body.pURL,
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
    const ProjectInfo = await Project_Model.find({ id: Id }); // Ensure you're querying by the correct field, `id`
    if (ProjectInfo.length === 0) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(ProjectInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// DELETE PROJECT INFO BY ID

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectInfo = await Project_Model.findOneAndDelete({ id: Id }); // Ensure you're querying by the correct field, `email` not `id`
    if (ProjectInfo == null) {
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

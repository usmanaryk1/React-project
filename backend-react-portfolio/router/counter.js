const express = require("express");
const Counter_Model = require("../models/counterSchema");
const router = express.Router();

// POST COUNTER INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Counter_Model({
    icon: req.body.icon,
    counterEnd: req.body.counterEnd,
    text: req.body.text,
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

// GET ALL COUNTER INFO
router.get("/", async (req, res) => {
  try {
    const CountInfo = await Counter_Model.find(); // Ensure you're querying by the correct field, `id`
    if (CountInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(CountInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET COUNTER INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const CountInfo = await Counter_Model.findById(Id); // Ensure you're querying by the correct field, `email` not `id`
    if (!CountInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(CountInfo);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// DELETE COUNTER INFO BY ID

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const CountInfo = await Counter_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `id`
    if (!CountInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: CountInfo,
    });
  } catch (err) {
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

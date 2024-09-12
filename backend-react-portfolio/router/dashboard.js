const express = require("express");
const Dashboard_Model = require("../models/dashboardSchema");
const router = express.Router();

// GET ALL DASHBOARD INFO
router.get("/", async (req, res) => {
  console.log("Dashboard get");
  try {
    const DashboardInfo = await Dashboard_Model.find(); // Ensure you're querying by the correct field, `id`
    if (DashboardInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(DashboardInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET DASHBOARD INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const DashboardInfo = await Dashboard_Model.findById(Id); // Ensure you're querying by the correct field,`id`
    if (DashboardInfo.length === 0) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(DashboardInfo);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST DASHBOARD INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Dashboard_Model({
    Icon: req.body.Icon,
    Title: req.body.Title,
    Description: req.body.Description,
    link: req.body.link,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
});

module.exports = router;

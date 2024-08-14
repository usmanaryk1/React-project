const express = require("express");
const Service_Model = require("../models/serviceSchema.js");
const router = express.Router();

// POST PERSONAL INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Service_Model({
    sIcon: req.body.sIcon,
    sTitle: req.body.sTitle,
    sDescription: req.body.sDescription,
    isActive: req.body.isActive,
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
    const ServiceInfo = await Service_Model.find(); // Ensure you're querying by the correct field, `email` not `id`
    if (ServiceInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.send(ServiceInfo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET PERSONAL INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const ServiceInfo = await Service_Model.find({ id: Id }); // Ensure you're querying by the correct field, `email` not `id`
    if (ServiceInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.send(ServiceInfo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE METHOD

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const ServiceInfo = await Service_Model.findOneAndDelete({ id: Id }); // Ensure you're querying by the correct field, `email` not `id`
    if (ServiceInfo == null) {
      return res.status(404).send(`The Service info with ${Id} not found.`);
    }
    res
      .status(200)
      .send(`The Service info with ${Id} has been deleted.` + ServiceInfo);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

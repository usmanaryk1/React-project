const express = require("express");
const Service_Model = require("../models/serviceSchema.js");
const authenticateJWT = require("../middleware/authmiddleware.js");
const router = express.Router();

// GET ALL SERVICE INFO
router.get("/", async (req, res) => {
  try {
    const ServiceInfo = await Service_Model.find();
    if (ServiceInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(ServiceInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET SERVICE INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const ServiceInfo = await Service_Model.findById(Id); // Ensure you're querying by the correct field,`id`
    if (ServiceInfo.length === 0) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(ServiceInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST SERVICE INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  // console.log("Inside post function");

  const data = new Service_Model({
    sIcon: req.body.sIcon,
    sTitle: req.body.sTitle,
    sDescription: req.body.sDescription,
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

// UPDATE SERVICE BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedService = await Service_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update service" });
  }
});

// DELETE SERVICE INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  const Id = req.params.id;

  try {
    const ServiceInfo = await Service_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field,`id`
    if (ServiceInfo == null) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: ServiceInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

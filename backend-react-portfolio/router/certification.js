const express = require("express");
const Certification_Model = require("../models/certificationSchema");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");

// GET ALL CERTIFICATION INFO

router.get("/", async (req, res) => {
  try {
    const CertificationInfo = await Certification_Model.find(); // Ensure you're querying by the correct field, `id`
    if (CertificationInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(CertificationInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET CERTIFICATION INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const CertificationInfo = await Certification_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!CertificationInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(CertificationInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST CERTIFICATION INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  // console.log("Inside post function");

  const data = new Certification_Model({
    image: req.body.image,
    cardCategory: req.body.cardCategory,
    cardTitle: req.body.cardTitle,
    cardDescription: req.body.cardDescription,
    authorImage: req.body.authorImage,
    authorName: req.body.authorName,
    postDate: req.body.postDate,
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

// UPDATE CERTIFICATION BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedCertificate = await Certification_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCertificate);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update certificate" });
  }
});

// DELETE CERTIFICATION INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  const Id = req.params.id;

  try {
    const CertificationInfo = await Certification_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field,`id`
    if (!CertificationInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: CertificationInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

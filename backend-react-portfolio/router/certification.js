const express = require("express");
const Certification_Model = require("../models/certificationSchema");
const router = express.Router();

// POST CERTIFICATION INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Certification_Model({
    image: req.body.image,
    cardCategory: req.body.cardCategory,
    cardTitle: req.body.cardTitle,
    cardDescription: req.body.cardDescription,
    authorImage: req.body.authorImage,
    authorName: req.body.authorName,
    postDate: req.body.postDate,
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

// GET ALL CERTIFICATION INFO

router.get("/", async (req, res) => {
  try {
    const CertificationInfo = await Certification_Model.find(); // Ensure you're querying by the correct field, `id`
    if (CertificationInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(CertificationInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET CERTIFICATION INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const CertificationInfo = await Certification_Model.find({ id: Id }); // Ensure you're querying by the correct field, `email` not `id`
    if (CertificationInfo.length === 0) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(CertificationInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// DELETE CERTIFICATION INFO BY ID

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const CertificationInfo = await Certification_Model.findOneAndDelete({
      id: Id,
    }); // Ensure you're querying by the correct field, `email` not `id`
    if (CertificationInfo == null) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: CertificationInfo,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

module.exports = router;

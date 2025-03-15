const express = require("express");
const Certification_Model = require("../models/certificationSchema");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");
const {
  getCertifications,
  getCertificationById,
  postCertifications,
  updateCertifications,
  deleteCertifications,
} = require("../Controllers/certificationController.js");

// GET ALL CERTIFICATION INFO

router.get("/", getCertifications);

// GET CERTIFICATION INFO BY SPECIFIC ID

router.get("/:id", getCertificationById);

// POST CERTIFICATION INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, postCertifications);

// UPDATE CERTIFICATION BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, updateCertifications);

// DELETE CERTIFICATION INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, deleteCertifications);

module.exports = router;

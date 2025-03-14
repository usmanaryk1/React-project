const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");
const {
  getProjectDetails,
  getProjectDetailsById,
  postProjectDetails,
  updateProjectDetails,
  deleteProjectDetails,
} = require("../Controllers/projectDetailsController.js");

// GET ALL PROJECT DETAILS INFO

router.get("/", getProjectDetails);

// GET PROJECT DETAILS INFO BY SPECIFIC ID

router.get("/:id", getProjectDetailsById);

// POST PROJECT DETAILS INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, postProjectDetails);

// UPDATE PROJECT DETAILS BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, updateProjectDetails);

// DELETE PROJECT DETAILS INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, deleteProjectDetails);

module.exports = router;

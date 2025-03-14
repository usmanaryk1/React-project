const express = require("express");
const Project_Model = require("../models/projectsSchema");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");
const {
  getProjects,
  getProjectsById,
  postProjects,
  updateProjects,
  updateByWorkDetailsId,
  deleteProjects,
} = require("../Controllers/ProjectsController.js");

// GET ALL PROJECT INFO

router.get("/", getProjects);

// GET PROJECT INFO BY SPECIFIC ID

router.get("/:id", getProjectsById);

// POST PROJECT INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, postProjects);

// UPDATE PROJECT BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, updateProjects);

// UPDATE PROJECT BY ID BY PATCHING WORKDETAILSID(AUTHENTICATED ONLY)

router.patch("/:id", updateByWorkDetailsId);

// DELETE PROJECT INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, deleteProjects);

module.exports = router;

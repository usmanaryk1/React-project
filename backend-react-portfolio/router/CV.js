const express = require("express");
const authenticateJWT = require("../middleware/authmiddleware");
const {
  getAllCvs,
  uploadCv,
  updateCV,
  deleteCV,
  toggleVisibility,
  visibleCVs,
} = require("../Controllers/cvsController");
const router = express.Router();

// Fetch all CVS
router.get("/", authenticateJWT, getAllCvs);

// Fetch all visible CVS
router.get("/visibleCVs", visibleCVs);

// POST route to save CV URL
router.post("/uploadCv", authenticateJWT, uploadCv);

// UPDATE THE CV
router.put("/:id", authenticateJWT, updateCV);

// DELETE THE CV
router.delete("/:id", authenticateJWT, deleteCV);

// UPDATE VISIBILITY STATE OF CV
router.delete("/:id", authenticateJWT, toggleVisibility);

module.exports = router;

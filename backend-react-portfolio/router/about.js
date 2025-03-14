const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");
const {
  getAboutInfo,
  getAboutInfoById,
  postAboutInfo,
  updateAboutInfo,
  deleteAboutInfo,
} = require("../Controllers/aboutController.js");
// GET ALL ABOUT INFO

router.get("/", getAboutInfo);

// GET ABOUT INFO BY SPECIFIC ID

router.get("/:id", getAboutInfoById);

// POST ABOUT INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, postAboutInfo);

// UPDATE ABOUT BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, updateAboutInfo);

// DELETE ABOUT INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, deleteAboutInfo);

module.exports = router;

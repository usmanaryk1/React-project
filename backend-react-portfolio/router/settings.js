const express = require("express");
const authenticateJWT = require("../middleware/authmiddleware.js");
const {
  getSettings,
  updateSettings,
  createSettings,
} = require("../Controllers/settingsController.js");
const router = express.Router();

// GET SETTINGS DATA
router.get("/", getSettings);

// UPDATE THE SETTINGS
router.put("/:id", authenticateJWT, updateSettings);

// ✅ CREATE New Setting
router.post("/", authenticateJWT, createSettings);

module.exports = router;

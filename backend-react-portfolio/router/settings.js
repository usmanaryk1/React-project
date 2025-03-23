const express = require("express");
const authenticateJWT = require("../middleware/authmiddleware.js");
const {
  getSettings,
  updateSettings,
} = require("../Controllers/settingsController.js");
const router = express.Router();

// GET SETTINGS DATA
router.get("/", getSettings);

// UPDATE THE SETTINGS
router.put(":/sectionTitle", authenticateJWT, updateSettings);

module.exports = router;

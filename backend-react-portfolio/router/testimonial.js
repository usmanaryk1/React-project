const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");
const {
  getTestimonials,
  getTestimonialsById,
  postTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../Controllers/TestimonialController.js");

// GET ALL TESTIMONIAL INFO

router.get("/", getTestimonials);

// GET TESTIMONIAL INFO BY SPECIFIC ID

router.get("/:id", getTestimonialsById);

// POST TESTIMONIAL INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, postTestimonial);

// UPDATE TESTIMONIAL BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, updateTestimonial);

// DELETE TESTIMONIAL INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, deleteTestimonial);

module.exports = router;

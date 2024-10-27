const express = require("express");
const Testimonial_Model = require("../models/testimonialSchema");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");

// GET ALL TESTIMONIAL INFO

router.get("/", async (req, res) => {
  try {
    const TestimonialInfo = await Testimonial_Model.find(); // Ensure you're querying by the correct field, `id`
    if (TestimonialInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(TestimonialInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET TESTIMONIAL INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const TestimonialInfo = await Testimonial_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (TestimonialInfo.length === 0) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(TestimonialInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST TESTIMONIAL INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  // console.log("Inside post function");

  const data = new Testimonial_Model({
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
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

// UPDATE TESTIMONIAL BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedTestimonial);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to updated testimonial." });
  }
});

// DELETE TESTIMONIAL INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  const Id = req.params.id;

  try {
    const TestimonialInfo = await Testimonial_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `id`
    if (TestimonialInfo == null) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: TestimonialInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

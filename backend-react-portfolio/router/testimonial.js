const express = require("express");
const Testimonial_Model = require("../models/testimonialSchema");
const router = express.Router();

// POST TESTIMONIAL INFO

router.post("/", async (req, res) => {
  console.log("Inside post function");

  const data = new Testimonial_Model({
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
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

// GET ALL TESTIMONIAL INFO

router.get("/", async (req, res) => {
  try {
    const TestimonialInfo = await Testimonial_Model.find(); // Ensure you're querying by the correct field, `id`
    if (TestimonialInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(TestimonialInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET TESTIMONIAL INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const TestimonialInfo = await Testimonial_Model.find({ id: Id }); // Ensure you're querying by the correct field, `email` not `id`
    if (TestimonialInfo.length === 0) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(TestimonialInfo); // 200 OK status code
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// DELETE TESTIMONIAL INFO BY ID

router.delete("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const TestimonialInfo = await Testimonial_Model.findOneAndDelete({
      id: Id,
    }); // Ensure you're querying by the correct field, `email` not `id`
    if (TestimonialInfo == null) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: TestimonialInfo,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete data" });
  }
});

module.exports = router;

const express = require("express");
const Contact_Model = require("../models/contactSchema");
const router = express.Router();
const authenticateJWT = require("../middleware/authmiddleware.js");

// GET ALL CONTACT INFO

router.get("/", async (req, res) => {
  try {
    const ContactInfo = await Contact_Model.find();
    if (ContactInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(ContactInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// GET CONTACT INFO BY SPECIFIC ID

router.get("/:id", async (req, res) => {
  const Id = req.params.id;

  try {
    const ContactInfo = await Contact_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!ContactInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(ContactInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
});

// POST CONTACT INFO (AUTHENTICATED ONLY)

router.post("/", authenticateJWT, async (req, res) => {
  // console.log("Inside post function");

  const data = new Contact_Model({
    description: req.body.description,
    location: req.body.location,
    number: req.body.number,
    email: req.body.email,
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

// UPDATE CONTACT BY ID (AUTHENTICATED ONLY)

router.put("/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedContact = await Contact_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update contact" });
  }
});

// DELETE CONTACT INFO BY ID (AUTHENTICATED ONLY)

router.delete("/:id", authenticateJWT, async (req, res) => {
  const Id = req.params.id;

  try {
    const ContactInfo = await Contact_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field,`id`
    if (!ContactInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: ContactInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
});

module.exports = router;

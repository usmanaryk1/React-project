const About_Model = require("../models/aboutSchema");
const {
  deleteImageFromFirebase,
} = require("../utils/deleteImageFromFirebase ");

// FUNCTION FOR GET REQUEST
const getAboutInfo = async (req, res) => {
  try {
    // Fetch data from the database
    const AboutInfo = await About_Model.find();
    // Check if the result is empty
    if (AboutInfo.length === 0) {
      return res.status(404).json({ message: "No data found." });
    }
    // Return the data with a success status
    res.status(200).json(AboutInfo);
  } catch (error) {
    console.error(error);
    // Send an error response in case of failure
    res.status(500).json({ message: "Faled to fetch data" });
  }
};

// GET ABOUT INFO BY SPECIFIC ID

const getAboutInfoById = async (req, res) => {
  const Id = req.params.id;

  try {
    const AboutInfo = await About_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!AboutInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send(AboutInfo); // 200 OK status code
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
};

// POST ABOUT INFO (AUTHENTICATED ONLY)

const postAboutInfo = async (req, res) => {
  // console.log("Inside post function");

  const data = new About_Model({
    name: req.body.name,
    profile: req.body.profile,
    email: req.body.email,
    phone: req.body.phone,
    desc: req.body.desc,
    img: req.body.img,
    isActive: req.body.isActive,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to save data" });
  }
};

// UPDATE ABOUT BY ID (AUTHENTICATED ONLY)

const updateAboutInfo = async (req, res) => {
  const Id = req.params.id;
  try {
    const AboutInfo = await About_Model.findById(Id);
    if (!AboutInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }

    // Extract the image path from the URL (if stored as a URL)

    if (AboutInfo.img) {
      await deleteImageFromFirebase(AboutInfo.img);
    }
    const updatedAbout = await About_Model.findByIdAndUpdate(Id, req.body, {
      new: true,
    });

    res.status(200).json(updatedAbout);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to update about info" });
  }
};

// DELETE ABOUT INFO BY ID (AUTHENTICATED ONLY)

const deleteAboutInfo = async (req, res) => {
  const Id = req.params.id;

  try {
    const AboutInfo = await About_Model.findById(Id);
    if (!AboutInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }

    // Extract the image path from the URL (if stored as a URL)

    if (AboutInfo.img) {
      await deleteImageFromFirebase(AboutInfo.img);
    }
    await About_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `id`

    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
};
module.exports = {
  getAboutInfo,
  getAboutInfoById,
  postAboutInfo,
  updateAboutInfo,
  deleteAboutInfo,
};

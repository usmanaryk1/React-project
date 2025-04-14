const CV_Model = require("../models/CVSchema");
const { admin, bucket } = require("../api/firebaseAdmin.js");
const { default: mongoose } = require("mongoose");
const {
  deleteImageFromFirebase,
} = require("../utils/deleteImageFromFirebase .js");

// Fetch CV URL by userId
const getAllCvs = async (req, res) => {
  try {
    const cvs = await CV_Model.find();

    if (!cvs) {
      return res.status(404).json({ message: "CV not found" });
    }
    console.log("cvs:", cvs);
    // Return the CV URL directly
    res.status(200).json(cvs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch CVs." });
  }
};

//  save CV URL
const uploadCv = async (req, res) => {
  const { cvUrl, isVisible } = req.body;
  const userId = req.user.id; // Extract userId from token

  console.log("userid", userId);
  // console.log("cvurl", req.body.cvUrl);

  try {
    // console.log("Request Body:", req.body); // Log request body
    if (!cvUrl) {
      return res.status(400).json({ message: "Missing cvUrl" });
    }

    const newCV = new CV_Model({ userId, cvUrl, isVisible });
    const savedCV = await newCV.save();

    // console.log("CV Saved:", savedCV); // Log saved CV
    return res.status(200).json(savedCV);
  } catch (error) {
    console.error("Error in /api/upload-cv:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// UPDATE THE CV
const updateCV = async (req, res) => {
  console.log("CV update route");

  try {
    const { id } = req.params;
    const userId = req.user.id;
    const objectId = new mongoose.Types.ObjectId(id);

    const cv = await CV_Model.findOne({ _id: objectId, userId });
    if (!cv) {
      return res
        .status(404)
        .json({ message: `Information with Id ${id} not found.` });
    }

    // Only delete old file if it's different from the new one
    if (cv.cvUrl && req.body.cvUrl && cv.cvUrl !== req.body.cvUrl) {
      await deleteImageFromFirebase(cv.cvUrl);
    }

    // Update in MongoDB
    const updatedCV = await CV_Model.findByIdAndUpdate(
      { _id: objectId, userId },
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedCV);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Failed to update cv" });
  }
};

const deleteCV = async (req, res) => {
  console.log("CV delete route");

  try {
    const { id } = req.params;
    const userId = req.user.id;
    const objectId = new mongoose.Types.ObjectId(id);

    const cv = await CV_Model.findOne({ _id: objectId, userId });

    if (!cv) {
      return res.status(404).json({ message: `CV with ID ${id} not found` });
    }

    // Delete file from Firebase if it exists
    if (cv.cvUrl) {
      await deleteImageFromFirebase(cv.cvUrl);
    }
    await CV_Model.deleteOne({ _id: objectId }); // Ensure you're querying by the correct field, `id`

    console.log("CV deleted");
    return res.status(200).json({
      message: `Information with ID ${id} has been deleted`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Failed to delete data` });
  }
};

const toggleVisibility = async (req, res) => {
  try {
    const { isVisible } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const objectId = new mongoose.Types.ObjectId(id);

    const UpdatedCVs = await CV_Model.findOneAndUpdate(
      { _id: objectId, userId }, // Corrected query
      { isVisible },
      { new: true } // Update if exists, otherwise create
    );
    if (!UpdatedCVs) {
      return res.status(404).json({ message: "CV not found" });
    }
    return res.status(200).json(UpdatedCVs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error Updating Visibility State" });
  }
};

const visibleCVs = async (req, res) => {
  try {
    const visibleCVs = await CV_Model.find({
      isVisible: true,
    }).sort({ order: 1 });
    if (visibleCVs.length === 0) {
      return res.status(404).json({ message: "No visible CVs found." });
    }
    return res.status(200).json(visibleCVs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};
module.exports = {
  getAllCvs,
  uploadCv,
  updateCV,
  deleteCV,
  toggleVisibility,
  visibleCVs,
};

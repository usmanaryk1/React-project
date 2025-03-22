const CV_Model = require("../models/CVSchema");
const { bucket } = require("../api/firebaseAdmin.js");
const { default: mongoose } = require("mongoose");

// Fetch CV URL by userId
const getAllCvs = async (req, res) => {
  // if (!req.user || !req.user.id) {
  //   return res.status(401).json({ message: "Unauthorized: User not found" });
  // }
  // const userId = req.user.id;

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

  const Id = req.params.id;
  const userId = req.user.id; // Ensure user updates only their CV
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return res.status(400).json({ message: "Invalid CV ID format" });
    }

    // Convert Id to ObjectId
    const objectId = new mongoose.Types.ObjectId(Id);

    const cv = await CV_Model.findOne({ _id: objectId, userId });
    if (!cv) {
      return res
        .status(404)
        .json({ message: `Information with Id ${Id} not found.` });
    }

    // Check if the user owns the CV
    if (cv.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this CV" });
    }

    if (cv.cvUrl) {
      // Extract the Firebase Storage URL
      const filePath = cv.cvUrl.split("/o/")[1].split("?")[0];

      // Delete file from Firebase Storage
      await bucket.file(decodeURIComponent(filePath)).delete();
    }

    // Update in MongoDB
    const updatedCV = await CV_Model.findByIdAndUpdate(
      objectId,
      { cvUrl: req.body.cvUrl },
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
  const Id = req.params.id;
  const userId = req.user.id; // Ensure user updates only their CV

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(Id)) {
      return res.status(400).json({ message: "Invalid CV ID format" });
    }

    // Convert Id to ObjectId
    const objectId = new mongoose.Types.ObjectId(Id);

    const cv = await CV_Model.findOne({ _id: objectId, userId });
    if (!cv) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }

    // Check if the user owns the CV
    if (cv.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this CV" });
    }

    if (cv.cvUrl) {
      // Extract the Firebase Storage URL
      const filePath = cv.cvUrl.split("/o/")[1].split("?")[0];

      // Delete file from Firebase Storage
      await admin
        .storage()
        .bucket()
        .file(decodeURIComponent(filePath))
        .delete();
    }
    await CV_Model.findByIdAndDelete(objectId); // Ensure you're querying by the correct field, `id`

    console.log("CV deleted");
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
};

const toggleVisibility = async (req, res) => {
  const { id, isVisible } = req.body;
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(String(id))) {
      return res.status(400).json({ message: "Invalid CV ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const UpdatedCVs = await CV_Model.findOneAndUpdate(
      { _id: objectId }, // Corrected query
      { isVisible },

      { new: true } // Update if exists, otherwise create
    );
    if (!UpdatedCVs) {
      return res.status(404).json({ message: "CV not found" });
    }
    res.status(200).json(UpdatedCVs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error Updating Visibility State" });
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
    res.status(200).json(visibleCVs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
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

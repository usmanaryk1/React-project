const ProjectDetails_Model = require("../models/projectDetailsSchema");
const {
  deleteImageFromFirebase,
} = require("../utils/deleteImageFromFirebase ");

// GET ALL PROJECT DETAILS INFO
const getProjectDetails = async (req, res) => {
  try {
    const ProjectDetails = await ProjectDetails_Model.find();
    if (ProjectDetails.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).send(ProjectDetails); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// GET PROJECT DETAILS INFO BY SPECIFIC ID

const getProjectDetailsById = async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectDetails = await ProjectDetails_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!ProjectDetails) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send(ProjectDetails); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
};

// POST PROJECT DETAILS INFO (AUTHENTICATED ONLY)

const postProjectDetails = async (req, res) => {
  // console.log("Inside post function");

  const data = new ProjectDetails_Model({
    slideImages: req.body.slideImages,
    pCategory: req.body.pCategory,
    pClient: req.body.pClient,
    pDate: req.body.pDate,
    pURL: req.body.pURL,
    desc: req.body.desc,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
};

// UPDATE PROJECT DETAILS BY ID (AUTHENTICATED ONLY)

const updateProjectDetails = async (req, res) => {
  const Id = req.params.id;

  try {
    const existingDetails = await ProjectDetails_Model.findById(Id);

    if (!existingDetails) {
      return res.status(404).json({ message: `Details with ${Id} not found` });
    }

    // Old images from the database
    const oldImages = existingDetails.slideImages || [];
    console.log("oldImages:", oldImages);
    // New Images from the req.body
    const newImages = req.body.slideImages || [];
    console.log("newImages:", newImages);
    // Identify which images were removed
    const imagesToDelete = await oldImages.filter(
      (oldImage) => !newImages.includes(oldImage)
    );
    console.log("imagesToDelete:", imagesToDelete);

    // Delete only the removed images from Firebase
    await Promise.all(imagesToDelete.map(deleteImageFromFirebase));

    const updatedDetails = await ProjectDetails_Model.findByIdAndUpdate(
      Id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDetails);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update project details" });
  }
};

// DELETE PROJECT DETAILS INFO BY ID (AUTHENTICATED ONLY)

const deleteProjectDetails = async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectDetails = await ProjectDetails_Model.findById(Id);
    if (!ProjectDetails) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }

    // Extract the image path from the URL (if stored as a URL)

    if (ProjectDetails.slideImages && ProjectDetails.slideImages.length > 0) {
      await Promise.all(
        ProjectDetails.slideImages.map(async (imageUrl) => {
          await deleteImageFromFirebase(imageUrl);
        })
      );
    }

    const deletedDetails = await ProjectDetails_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `id`
    if (!deletedDetails) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: deletedDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
};

module.exports = {
  getProjectDetails,
  getProjectDetailsById,
  postProjectDetails,
  updateProjectDetails,
  deleteProjectDetails,
};

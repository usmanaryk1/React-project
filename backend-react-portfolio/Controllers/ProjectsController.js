const Project_Model = require("../models/projectsSchema");
const {
  deleteImageFromFirebase,
} = require("../utils/deleteImageFromFirebase ");

// GET ALL PROJECT INFO

const getProjects = async (req, res) => {
  try {
    const ProjectInfo = await Project_Model.find();
    if (ProjectInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(ProjectInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// GET PROJECT INFO BY SPECIFIC ID

const getProjectsById = async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectInfo = await Project_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!ProjectInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(ProjectInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
};

// POST PROJECT INFO (AUTHENTICATED ONLY)

const postProjects = async (req, res) => {
  // console.log("Inside post function");

  const data = new Project_Model({
    workImage: req.body.workImage,
    wTitle: req.body.wTitle,
    wCategory: req.body.wCategory,
    wDate: req.body.wDate,
    pURL: req.body.pURL,
    isActive: req.body.isActive,
    workDetailsId: req.body.workDetailsId,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
};

// UPDATE PROJECT BY ID (AUTHENTICATED ONLY)

const updateProjects = async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectInfo = await Project_Model.findById(Id);
    if (!ProjectInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }

    // Extract the image path from the URL (if stored as a URL)

    if (ProjectInfo.workImage) {
      await deleteImageFromFirebase(ProjectInfo.workImage);
    }
    const updatedProject = await Project_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update project" });
  }
};

// UPDATE PROJECT BY ID BY PATCHING WORKDETAILSID(AUTHENTICATED ONLY)

const updateByWorkDetailsId = async (req, res) => {
  const { id } = req.params;
  const { workDetailsId } = req.body;
  try {
    const updatedWork = await Project_Model.findByIdAndUpdate(
      id,
      { workDetailsId },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Project updated successfully", updatedWork });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update work" });
  }
};

// DELETE PROJECT INFO BY ID (AUTHENTICATED ONLY)

const deleteProjects = async (req, res) => {
  const Id = req.params.id;

  try {
    const ProjectInfo = await Project_Model.findById(Id);
    if (!ProjectInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }

    // Extract the image path from the URL (if stored as a URL)

    if (ProjectInfo.workImage) {
      await deleteImageFromFirebase(ProjectInfo.workImage);
    }

    const deletedProject = await Project_Model.findByIdAndDelete(Id); // Ensure you're querying by the correct field, `id`
    if (!deletedProject) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: deletedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
};

module.exports = {
  getProjects,
  getProjectsById,
  postProjects,
  updateProjects,
  updateByWorkDetailsId,
  deleteProjects,
};

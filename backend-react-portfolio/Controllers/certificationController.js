const Certification_Model = require("../models/certificationSchema");
const {
  deleteImageFromFirebase,
} = require("../utils/deleteImageFromFirebase ");

// GET ALL CERTIFICATION INFO

const getCertifications = async (req, res) => {
  try {
    const CertificationInfo = await Certification_Model.find();
    if (CertificationInfo.length === 0) {
      return res.status(404).send("Inforamtion Not Found");
    }
    res.status(200).json(CertificationInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

// GET CERTIFICATION INFO BY SPECIFIC ID

const getCertificationById = async (req, res) => {
  const Id = req.params.id;

  try {
    const CertificationInfo = await Certification_Model.findById(Id); // Ensure you're querying by the correct field, `id`
    if (!CertificationInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).json(CertificationInfo); // 200 OK status code
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to fetch data with ${Id}` });
  }
};

// POST CERTIFICATION INFO (AUTHENTICATED ONLY)

const postCertifications = async (req, res) => {
  // console.log("Inside post function");

  const data = new Certification_Model({
    image: req.body.image,
    cardCategory: req.body.cardCategory,
    cardTitle: req.body.cardTitle,
    cardDescription: req.body.cardDescription,
    authorImage: req.body.authorImage,
    authorName: req.body.authorName,
    postDate: req.body.postDate,
    isActive: req.body.isActive,
  });

  try {
    const val = await data.save();
    res.status(201).json(val);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save data" });
  }
};

// UPDATE CERTIFICATION BY ID (AUTHENTICATED ONLY)

const updateCertifications = async (req, res) => {
  const Id = req.params.id;

  try {
    const certificationInfo = await Certification_Model.findById(Id);
    if (!certificationInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }

    // Extract the image path from the URL (if stored as a URL)

    if (certificationInfo.image) {
      await deleteImageFromFirebase(certificationInfo.image);
    }

    if (certificationInfo.authorImage) {
      await deleteImageFromFirebase(certificationInfo.authorImage);
    }
    const updatedCertificate = await Certification_Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCertificate);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update certificate" });
  }
};

// DELETE CERTIFICATION INFO BY ID (AUTHENTICATED ONLY)

const deleteCertifications = async (req, res) => {
  const Id = req.params.id;

  try {
    const certificationInfo = await Certification_Model.findById(Id);
    if (!certificationInfo) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }

    // Extract the image path from the URL (if stored as a URL)

    if (certificationInfo.image) {
      await deleteImageFromFirebase(certificationInfo.image);
    }

    if (certificationInfo.authorImage) {
      await deleteImageFromFirebase(certificationInfo.authorImage);
    }
    const deletedCertification = await Certification_Model.findByIdAndDelete(
      Id
    ); // Ensure you're querying by the correct field,`id`
    if (!deletedCertification) {
      return res
        .status(404)
        .send({ message: `Information with ID ${Id} not found` });
    }
    res.status(200).send({
      message: `Information with ID ${Id} has been deleted`,
      deletedInfo: deletedCertification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to delete data with ${Id}` });
  }
};

module.exports = {
  getCertifications,
  getCertificationById,
  postCertifications,
  updateCertifications,
  deleteCertifications,
};

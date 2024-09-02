// const express = require("express");
// const CV_Model = require("../models/CVSchema");
// const axios = require("axios");
// const router = express.Router();

// router.get("/download-cv", async (req, res) => {
//   try {
//     const cv = await CV_Model.findOne({ userId: req.query.userId });
//     if (!cv) {
//       return res.status(404).json({ message: "CV not found" });
//     }

//     // Fetch the file from Firebase Storage
//     const response = await axios({
//       url: cv.cvUrl, // Firebase Storage URL
//       method: "GET",
//       responseType: "stream",
//     });

//     // Set the appropriate headers for file download
//     res.setHeader("Content-Disposition", `attachment; filename="cv.pdf"`);
//     res.setHeader("Content-Type", "application/pdf");

//     // Pipe the stream to the response
//     response.data.pipe(res);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const CV_Model = require("../models/CVSchema");
const axios = require("axios");
const router = express.Router();

// Fetch CV URL by userId
router.get("/download-cv/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cv = await CV_Model.findOne({ userId });

    if (!cv) {
      return res.status(404).json({ message: "CV not found" });
    }
    // Fetch the file from Firebase Storage or wherever your file is hosted using Axios
    const response = await axios.get(cv.cvUrl, { responseType: "stream" });

    // Get the file's content type and file name (you may need to customize this)
    const contentType =
      response.headers["content-type"] || "application/octet-stream";
    const fileName = "My CV.pdf"; // You can set this dynamically based on your needs

    // Set headers to tell the browser to download the file
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", contentType);

    // Pipe the file stream to the client
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

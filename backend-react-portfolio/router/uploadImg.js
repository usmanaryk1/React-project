const express = require("express");
const router = express.Router();
const upload = require("../api/multerConfig"); // Import the multer configuration

// Image upload route
router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    console.log("req.file", req.file); // Check the uploaded file
    console.log("req.body", req.body); // Check if any other form data is received
    if (err) {
      res.status(400).json({ msg: err });
    } else {
      if (req.file === undefined) {
        res.status(400).json({ msg: "No file selected" });
      } else {
        res.status(200).json({
          msg: "File uploaded successfully",
          file: `/uploads/${req.file.filename}`,
        });
      }
    }
  });
});

module.exports = router;

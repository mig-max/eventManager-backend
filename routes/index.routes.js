const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config"); //


router.get("/", (req, res, next) => {
  res.json("Hello Beautiful People");
});

/////////////////////
// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("fileUrl"), (req, res, next) => {
  console.log("file is: ", req.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // Get the URL of the uploaded file and send it as a response
  res.json({ fileUrl: req.file.path });
});

module.exports = router;



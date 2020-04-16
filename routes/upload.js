const upload = require("../utils/upload.js");
var express = require("express");
var router = express.Router();
const {
  loadData,
  saveData,
  loadMeme,
  saveMeme,
  addImage,
} = require("../utils/data.js");

router.post("/", upload, async (req, res) => {
  //  we will get the image file from middleware: `updload.single("fileToUpload")`
  const file = req.file;
  try {
    if (!file) {
      //if user didn't upload anything
      throw new Error("You need to select a file");
    }
    // save Image information to database.
    addImage(file);
    return res.redirect("/browse");
  } catch (e) {
    return res.render("index", {
      error: e.message,
    });
  }
});

module.exports = router;

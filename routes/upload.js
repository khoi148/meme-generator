const upload = require("../utils/upload.js");
var express = require("express");
var jimp = require("jimp");

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
    let found = loadData().findIndex(
      (item) => item.originalname === file.originalname
    );
    if (found !== -1) {
      throw new Error("This file has already been uploaded. Choose another.");
    }

    //Use Jimp
    // let image = await jimp(file.path);
    // image.resize(300, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOR);
    // image.write(file.path);

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

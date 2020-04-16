const upload = require("../utils/upload.js");
var express = require("express");
var jimp = require("jimp");
var fs = require("fs");
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

    //Use Jimp, to resize photo. This code only works, after you use multer to write.
    let image = await jimp.read(file.path);
    image.resize(300, jimp.AUTO, jimp.RESIZE_NEAREST_NEIGHBOR);
    await image.writeAsync(file.path);

    // save Image information to database.
    addImage(file);

    return res.redirect("/browse");
  } catch (e) {
    //fs.unlinkSync(file.path);
    return res.render("index", {
      error: e.message,
    });
  }
});

module.exports = router;

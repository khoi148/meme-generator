const upload = require("../utils/upload.js");
var express = require("express");
var jimp = require("jimp");
var fs = require("fs");
const path = require("path");
const uploadPath = path.join(__dirname, "../public/upload/meme");

var router = express.Router();
const {
  loadData,
  saveData,
  loadMeme,
  saveMeme,
  addImage,
} = require("../utils/data.js");

router.get("/", async (req, res, next) => {
  //must use a GET method to collect Params
  //Get the 'memetext' param, passed in from the form on images.hbs
  try {
    let memeText = req.query.memetext;
    //Get the picture file, using the id is passed in as a param.
    let id = parseInt(req.query.id);
    let image = loadData().filter((item) => item.id === id)[0];

    //use Jimp to load that picture
    let jimpImage = await jimp.read(image.path);
    jimpImage.resize(300, jimp.AUTO, jimp.RESIZE_NEAREST_NEIGHBOR);
    //Write to file system, in the memefolder
    await jimpImage.writeAsync(uploadPath + "/meme-" + jimpImage.originalname);

    //Then use Jimp to put the string into the picture
    res.render("memes", { title: image.path });
  } catch (e) {
    return res.render("index", {
      error: e.message,
    });
  }
});

module.exports = router;

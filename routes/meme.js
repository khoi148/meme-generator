const upload = require("../utils/upload.js");
var express = require("express");
var jimp = require("jimp");
var fs = require("fs");
const path = require("path");
const uploadPath = path.join(__dirname, "../public/upload/meme");

var router = express.Router();
const { loadData, addMeme, loadMeme } = require("../utils/data.js");

router.get("/", async (req, res, next) => {
  //must use a GET method to collect Params
  try {
    let memeText = req.query.memetext; //Get the 'memetext' param, passed in from the form on images.hbs
    //Get the picture file data, using the id passed in as a param.
    let id = parseInt(req.query.id);
    let image = loadData().filter((item) => item.id === id)[0];
    //use Jimp to load that picture, from the /original path
    const jimpImage = await jimp.read(image.path);
    jimpImage.resize(jimp.AUTO, 350, jimp.RESIZE_BEZIER);

    await jimp
      .loadFont(jimp.FONT_SANS_32_WHITE)
      .then((font) => {
        let message = memeText;
        let x = 40;
        let y = 270;
        jimpImage.print(font, x, y, message);
        return jimpImage;
      })
      .then(async (imageReturn) => {
        let memePath = uploadPath + "/meme-" + image.originalname;
        //Write to file system, in the memefolder, AND update meme database
        if (loadMeme().some((item) => item.path === memePath) === false) {
          //only update database, if file doesn't exist yet.
          addMeme(image, memePath);
        }
        //overwrite current meme for that upload
        await imageReturn.writeAsync(memePath);
        res.redirect("/browseMemes");
      });
  } catch (e) {
    return res.render("index", {
      error: e.message,
    });
  }
});

module.exports = router;

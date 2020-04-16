var express = require("express");
var router = express.Router();
const {
  loadData,
  saveData,
  loadMeme,
  saveMeme,
  addImage,
} = require("../utils/data.js");

router.get("/", (req, res) => {
  //const images = loadData();
  //const images = data.map((e) => e.filename);
  res.render("memes", { memes: "hi" });
});

module.exports = router;

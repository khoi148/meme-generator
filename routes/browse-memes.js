var express = require("express");
var router = express.Router();
const { loadMeme } = require("../utils/data.js");

router.get("/", (req, res) => {
  const memes = loadMeme();
  res.render("memes", { memes: memes });
});

module.exports = router;

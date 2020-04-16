const fs = require("fs");

function loadData() {
  const buffer = fs.readFileSync("data/database.json"); //read file from our system, starts from root
  const data = buffer.toString(); //convert binary to string
  return JSON.parse(data); //convert json string to JS object
}
function saveData(data) {
  fs.writeFileSync("data/database.json", JSON.stringify(data));
}
function loadMeme() {
  //meme is just a picture, after we put text on it
  console.log("loadMeme");
}
function saveMeme() {
  console.log("saveMeme");
}
function addImage(file) {
  //1. Get your data, as an array
  let data = loadData();
  //1.5 Get correct ID
  let id = 0;
  if (data.length !== 0) {
    id = data[data.length - 1].id + 1;
  }
  file.id = id;
  //2. Add on file to your data
  console.log("inside file", file, typeof file);
  data.push(file);
  //3. Write to your data.
  saveData(data);
}

module.exports = { addImage, saveMeme, loadMeme, saveData, loadData };

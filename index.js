// For dotenv
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const express = require("express");
const fetch = require("node-fetch");
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("index");
});

app.get('/downloadSound', async (req, res) => {
  if(
    req.query.videoId === undefined ||
    req.query.videoId === "" ||
    req.query.videoId === null
  ){
    return res.json({"success":false, "msg":"Please add a video ID"});
  }

  const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${req.query.videoId}`, {
  "method": "GET",
  "headers": {
    "x-rapidapi-key": process.env.API_KEY,
    "x-rapidapi-host": process.env.API_HOST
    }
  });

  const fetchResponse = await fetchAPI.json();

  // downloads directly on browser
  res.redirect(fetchResponse.link);
  
  // downloads to a folder
  // https.get(fetchResponse.link, (res) => {
  //   const path = "downloaded-image.mp3";
  //   const writeStream = fs.createWriteStream(path);

  //   res.pipe(writeStream);

  //   writeStream.on("finish", () => {
  //     writeStream.close();
  //     console.log("Download Completed");
  //   });
  // });
  
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
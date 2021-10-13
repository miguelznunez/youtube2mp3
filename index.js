// For dotenv
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const express = require("express");
const fetch = require("node-fetch");
const https = require('https');
const fs = require('fs');
const bodyParser = require("body-parser")

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static('public'));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { success : true});
});

app.post("/downloadSound", async (req, res) => {
  // Check if the video id is empty
  if(
    req.body.videoId === undefined ||
    req.body.videoId === "" ||
    req.body.videoId === null
  ){
  //return an error if its empty
    return res.json({ success :false, msg :"Please enter a video ID"});
  }
  else{
    // if its not empty the api call
    const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${req.body.videoId}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": process.env.API_KEY,
      "x-rapidapi-host": process.env.API_HOST
      }
    });

    const fetchResponse = await fetchAPI.json();
    // check for errors
    if(fetchResponse.status === "ok")
      return res.json({ success : true, msg : fetchResponse.link, title : fetchResponse.title}) 
    else
      return res.json({ success : false, msg : "Please enter a valid ID"});
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

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
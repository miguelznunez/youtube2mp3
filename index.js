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
  // check if the video id field is empty
  if(
    req.body.videoId === undefined ||
    req.body.videoId === "" ||
    req.body.videoId === null
  ){
  //return an error if it is
    return res.json({ success :false, msg :"Please enter a video ID"});
  }
  else{
    // otherwise make the API call
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
      return res.json({ success : false, msg : fetchResponse.msg});
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

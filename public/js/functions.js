const error = document.querySelector("#error"),
      songTitle = document.querySelector("#song-title"),
      songUrl = document.querySelector("#song-url");

document.querySelector("#contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const videoId = document.querySelector("#videoId").value;
  fetch('/downloadSound', {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json"
    },
    body: JSON.stringify({ videoId: videoId })
  })
  .then((res) => res.json())
  .then((data) => {
    if(data.success === true){
      // remove any error messages
      error.style.display = "none";
      // add song title
      songTitle.textContent = data.title;
      // set the href to the url for the download
      songUrl.style.display= "block";
      songUrl.href = data.msg;
      songUrl.textContent = "DOWNLOAD MP3";
      // clear the fields
      document.querySelector("#videoId").value = "";
      error.textContent = "";
    }
    else{
      // display error
      error.style.display = "block";
      error.textContent = data.msg;
      // remove song title if any
      songTitle.textContent = "";
      // block the download link from appearing
      songUrl.style.display= "none";      
    }
  });

});
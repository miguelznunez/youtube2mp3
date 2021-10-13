
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
      document.querySelector("#error").style.display = "none";
      // add song title
      document.querySelector("#song-title").textContent = data.title;
      // set the href to the url for the download
      document.querySelector("#song-url").style.display= "block";
      var a = document.querySelector("#song-url");
      a.href = data.msg;
      a.textContent = "DOWNLOAD MP3";
      // clear the fields
      document.querySelector("#videoId").value = "";
      document.querySelector("#error").textContent = "";
    }
    else{
      // display error
      document.querySelector("#error").style.display = "block";
      document.querySelector("#error").textContent = data.msg;
      // remove song title if any
      document.querySelector("#song-title").textContent = "";
      // block the download link from appearing
      document.querySelector("#song-url").style.display= "none";      
    }
  });

});
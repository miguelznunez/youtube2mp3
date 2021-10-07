document.querySelector("#download_form").addEventListener("submit", (e) => {
  e.preventDefault();

  const videoId = document.querySelector("#videoId").value;

  fetch("/downloadSound", {
    method: "GET",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json"
    }
  })
  .then((res) => res.json())
  .then((data) => {
    if(!data.success)
      document.querySelector("#download-error").textContent = data.msg;
    else{
      document.querySelector("#videoId").value = "";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const savedPath = localStorage.getItem("folderPath");
  if (savedPath) {
    document.getElementById("folderPath").value = savedPath;
  }
});

document.getElementById("folderPath").addEventListener("change", (e) => {
  localStorage.setItem("folderPath", e.target.value);
});

document.getElementById("download").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const rawUrl = tab.url;
  const folderPath = document.getElementById("folderPath").value;

  if (!rawUrl.includes("youtube.com/watch")) {
    document.getElementById("status").textContent = "Not a YouTube video.";
    return;
  }

  const urlObj = new URL(rawUrl);
  const videoId = urlObj.searchParams.get("v");

  if (!videoId) {
    document.getElementById("status").textContent = "Invalid video ID.";
    return;
  }

  const cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;

  fetch("http://localhost:5000/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: cleanUrl, folderPath }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("status").textContent = "Download started!";
    })
    .catch((err) => {
      document.getElementById("status").textContent =
        "Error starting download.";
      console.error(err);
    });
});

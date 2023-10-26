document.addEventListener("DOMContentLoaded", function () {
  // Initialize an array to store added image URLs
  var addedImages = [];

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.type === "images") {
      var imagesDiv = document.getElementById("images");

      request.images.forEach(function (image, index) {
        // Check if the image URL is not in the addedImages array
        if (!addedImages.includes(image)) {
          addedImages.push(image); // Add the image URL to the array

          var imageItem = document.createElement("div");
          imageItem.classList.add("image-item");

          var imgElement = document.createElement("img");
          imgElement.src = image;
          imgElement.title = "Right click to save";
          imgElement.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            chrome.downloads.download({ url: imgElement.src });
          });

          var overlay = document.createElement("div");
          overlay.classList.add("overlay");

          var overlayLink = document.createElement("a");
          overlayLink.href = imgElement.src;
          overlayLink.download = `image_${index + 1}.jpg`;
          overlayLink.textContent = "Download";

          overlay.appendChild(overlayLink);

          imageItem.appendChild(imgElement);
          imageItem.appendChild(overlay);

          imagesDiv.appendChild(imageItem);
        }
      });
    }
  });

  chrome.tabs.executeScript({
    file: "content.js",
  });
});

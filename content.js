var images = Array.from(document.getElementsByTagName("img")).map(function (
  img
) {
  return img.src;
});

chrome.runtime.sendMessage({ type: "images", images: images });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "download") {
    chrome.downloads.download({ url: request.url });
  } else if (request.type === "downloadAll") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        func: downloadAllImages,
      });
    });
  }
});

function downloadAllImages() {
  var imageUrls = Array.from(document.querySelectorAll("img")).map(function (
    img
  ) {
    return img.src;
  });

  imageUrls.forEach(function (url) {
    chrome.downloads.download({ url: url });
  });
}

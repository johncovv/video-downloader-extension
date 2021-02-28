chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "run") {
    const nodeListVideos = document.querySelectorAll("img");

    if (!!nodeListVideos.length) {
      const arrayVideos = Array.from(nodeListVideos).map(({ src, alt }) => ({
        src,
        alt,
        fileName: src.replace(/^.*[\\\/]/, ""),
      }));

      console.log(arrayVideos);
    }
  }
});

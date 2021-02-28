const searchButton = document.querySelector("#search-button");

searchButton.onclick = () => {
  chrome.runtime.sendMessage({ type: "update" }, (response) =>
    console.log("popup", response)
  );
};

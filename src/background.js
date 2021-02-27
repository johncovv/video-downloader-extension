function checkIfTabIsHttpService(tab, callback) {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    const tabUrl = current_tab_info.url;

    if (/^http:\/\/|https:\/\//i.test(tabUrl)) {
      callback();
    }
  });
}

chrome.tabs.onActivated.addListener((tab) => {
  checkIfTabIsHttpService(tab, () => {
    chrome.tabs.executeScript(null, { file: "./src/script.js" }, () =>
      console.log("Script injected!")
    );
  });
});

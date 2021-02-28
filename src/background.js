var activeTabId = undefined;

function runOnlyOnHttp(tab, callback) {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    activeTabId = tab.tabId;

    const tabUrl = current_tab_info.url;

    if (/^http:\/\/|https:\/\//i.test(tabUrl)) {
      callback();
    }
  });
}

function execScript() {
  chrome.tabs.executeScript(null, { file: "./src/script.js" }, () =>
    console.log("Script injected!")
  );
}

// Tab Events
chrome.tabs.onActivated.addListener((tab) => {
  runOnlyOnHttp(tab, () => execScript());
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
  const { windowId } = tabInfo;

  const tab = { tabId, windowId };

  if (changeInfo.status === "complete") {
    runOnlyOnHttp(tab, () => execScript());
  }
});

// Runtime events
chrome.runtime.onMessage.addListener((request, sender, sendResponseToPopup) => {
  if (request.type === "update") {
    if (!!activeTabId) {
      // run scanner on site
      chrome.tabs.sendMessage(activeTabId, { type: "run" }, (response) => {
        // here get the values ​​returned from the script to the popup as a response for the message
        sendResponseToPopup(response);
      });
    }
  }
});

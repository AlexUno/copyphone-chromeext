const $btnScan = document.getElementById("btn-scan");

function onResult(frames) {
  if (!frames || !frames.length) {
    alert("Не удалось найти номера телефонов на указанной странице");
  }

  window.close();
}

function execScript(tabId) {
  chrome.scripting.executeScript(
    {
      target: { tabId, allFrames: true },
      files: ["js/phone.js"],
    },
    onResult
  );
  window.close();
}

function currentTabHandler(e) {
  chrome.tabs.query({ active: true }, function (tabs) {
    const tab = tabs[0];

    if (tab) {
      execScript(tab.id);
    } else {
      alert("Нет активных табов");
    }
  });
}

$btnScan.addEventListener("click", currentTabHandler);

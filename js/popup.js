const $btnScan = document.getElementById("btn-scan");
const $btnScanAll = document.getElementById("btn-scan-all");

function onResult(frames) {
  if (!frames || !frames.length) {
    // alert("Не удалось найти номера телефонов на указанной странице");
  }

  window.close();
}

function execScript(tabId) {
  chrome.scripting.executeScript(
    {
      target: { tabId, allFrames: true },
      files: ["js/parse_phone.js", "js/parse_elem.js"],
    },
    onResult
  );
}

function tabQueryHandler(active = true) {
  if (active) {
    chrome.tabs.query({ active }, function (tabs) {
      const tab = tabs[0];

      if (tab) {
        execScript(tab.id);
      } else {
        alert("Нет активных табов");
      }
    });
  } else {
    chrome.tabs.query({}, function (tabs) {
      for (let i = 0; i < tabs.length; i++) {
        execScript(tabs[i].id);
      }
    });
  }
}

$btnScan.addEventListener("click", (e) => tabQueryHandler());
$btnScanAll.addEventListener("click", (e) => tabQueryHandler(false));

const notConnectedDiv = document.getElementById("notConnected");
const connectedDiv = document.getElementById("connected");
const esConnectBtn = document.getElementById("esConnectBtn");
const esSyncBtn = document.getElementById("esSyncBtn");
const esConnectedText = document.getElementById("esConnectedText");

let ip = "http://localhost:6661"
let password = "";
let syncedTooltipInterval;
let lastSynced = -1;
let lastError = "";

esConnectBtn.addEventListener("click", () => {
  ip = prompt("server ip? (default- https://skip.nightly.pw:6661)") || "https://skip.nightly.pw:6661";
  password = prompt("password (type /editorsync in game with perms)?") || "";
  if (syncedTooltipInterval) {
    clearInterval(syncedTooltipInterval);
  }
  connectedDiv.hidden = false;
  syncedTooltipInterval = setInterval(() => {
    console.log('ticked');
    if (lastSynced == -1) {
      if (lastError.length > 0) {
        esConnectedText.innerHTML = `editor sync failed! ${lastError}`;
      } else {
        esConnectedText.innerHTML = "editor sync is ready!";
      }
    } else {
      const timeDiff = Math.floor((Date.now() - lastSynced) / 1000);
      esConnectedText.innerHTML = `editor sync request sent: synced (${timeDiff}s ago)`;
    }
  }, 1000);
});

esSyncBtn.addEventListener("click", () => {
  const mapJson = mapToJSON(map);
  const requestJsonStr = `{"map":${mapJson},"password":"${password}"}`;
  const onSuccess = () => {
    lastSynced = Date.now();
    lastError = "";
  }
  fetch(`${ip}/editorsync`, {
    method: "POST",
    body: requestJsonStr,
  }).then(r => {
    onSuccess();
  }).catch(err => {
    console.log(err);
    if (err.status == 200) {
      onSuccess();
      return;
    }
    lastError = err.message.length > 16 ? err.message.substring(0, 13) + "..." : err.message;
    lastSynced = -1;
  });
});
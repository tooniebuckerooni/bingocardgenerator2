const fs = require("fs");
const path = require("path");

const STATE_PATH = path.join(__dirname, "..", "state.json");

function loadState() {
  const raw = fs.readFileSync(STATE_PATH, "utf8");
  return JSON.parse(raw);
}

function saveState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + "\n");
}

module.exports = { loadState, saveState };

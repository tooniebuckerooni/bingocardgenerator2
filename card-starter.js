/* Square starter — the handoff from a landing page into the generator.
 *
 * The generator on / already restores in-progress work from localStorage
 * 'bcg_autosave' on load. So a landing page does not need to embed or fork any
 * of it: write {v:1, t, w} to that key, navigate to /, and the visitor lands on
 * the generator with their squares already typed in. applyState() fills every
 * other field from its own defaults.
 *
 * Degrades to a plain link with JS off — the button is an <a href="/">.
 *
 * Optional data attributes on the button let a page hand over more than a word
 * list. data-gw/data-gh set the grid, data-fm sets the fill mode ("col"/"row",
 * where a blank line starts a new block). Omit them and behaviour is exactly as
 * before, which is what every existing starter page does. */
(function () {
  var KEY = "bcg_autosave";
  var t = document.getElementById("st-t"),
      w = document.getElementById("st-w"),
      c = document.getElementById("st-c"),
      go = document.getElementById("st-go");
  if (!w || !go || !c) return;

  var d = go.dataset || {};
  var gw = clampGrid(d.gw), gh = clampGrid(d.gh);
  var fm = (d.fm === "col" || d.fm === "row") ? d.fm : null;
  // The minimum follows the grid the page hands over, so a 3x3 starter does not
  // demand 25. Falls back to the classic 5x5 count when no grid is given.
  var MIN = (gw || 5) * (gh || 5);

  function clampGrid(v) {
    var n = parseInt(v, 10);
    return (n >= 2 && n <= 8) ? n : null;
  }
  function lines() {
    return w.value.split("\n").map(function (s) { return s.trim(); }).filter(Boolean);
  }
  // Same wording as the generator's own counter, so the handoff reads as one flow.
  function update() {
    var n = lines().length, ok = n >= MIN;
    c.textContent = ok ? n + " squares ✓ ready"
                       : n + " square" + (n !== 1 ? "s" : "") + " — need " + (MIN - n) + " more";
    c.className = "starter-c " + (ok ? "ok" : "warn");
    go.textContent = ok ? "Open the Generator with these squares →" : "Open the Generator →";
  }
  w.addEventListener("input", update);
  update();

  go.addEventListener("click", function (e) {
    var list = lines();
    if (!list.length) return;          // nothing typed — let the plain link through
    // Block mode needs the blank lines kept intact — they are the separators.
    var text = fm ? w.value : list.join("\n");
    try {
      // Never quietly destroy a card someone left half-finished in this browser.
      var prev = JSON.parse(localStorage.getItem(KEY) || "null");
      if (prev && prev.w && prev.w.trim() && prev.w.trim() !== text.trim() &&
          !confirm("You have an unfinished card saved in this browser. Replace it with the squares you just typed?")) {
        e.preventDefault();
        return;
      }
      var blob = {
        v: 1, src: "starter",
        t: (t && t.value || "").trim(),
        w: text,
      };
      if (gw) blob.gw = gw;
      if (gh) blob.gh = gh;
      if (fm) blob.fm = fm;
      localStorage.setItem(KEY, JSON.stringify(blob));
    } catch (err) { /* private mode or storage off — the plain link still works */ }
    if (window.gtag) try {
      gtag("event", "starter_handoff", { squares: list.length, page: document.body.dataset.page || "" });
    } catch (err) {}
  });
})();

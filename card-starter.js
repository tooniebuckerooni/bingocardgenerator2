/* Square starter — the handoff from a landing page into the generator.
 *
 * The generator on / already restores in-progress work from localStorage
 * 'bcg_autosave' on load. So a landing page does not need to embed or fork any
 * of it: write {v:1, t, w} to that key, navigate to /, and the visitor lands on
 * the generator with their squares already typed in. applyState() fills every
 * other field from its own defaults.
 *
 * Degrades to a plain link with JS off — the button is an <a href="/">. */
(function () {
  var KEY = "bcg_autosave", MIN = 25;
  var t = document.getElementById("st-t"),
      w = document.getElementById("st-w"),
      c = document.getElementById("st-c"),
      go = document.getElementById("st-go");
  if (!w || !go || !c) return;

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
    var text = list.join("\n");
    try {
      // Never quietly destroy a card someone left half-finished in this browser.
      var prev = JSON.parse(localStorage.getItem(KEY) || "null");
      if (prev && prev.w && prev.w.trim() && prev.w.trim() !== text &&
          !confirm("You have an unfinished card saved in this browser. Replace it with the squares you just typed?")) {
        e.preventDefault();
        return;
      }
      localStorage.setItem(KEY, JSON.stringify({
        v: 1, src: "starter",
        t: (t && t.value || "").trim(),
        w: text,
      }));
    } catch (err) { /* private mode or storage off — the plain link still works */ }
    if (window.gtag) try {
      gtag("event", "starter_handoff", { squares: list.length, page: document.body.dataset.page || "" });
    } catch (err) {}
  });
})();

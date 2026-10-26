/* Play card — a free bingo card you play on your phone and share.
 *
 *   <div class="play-card" data-src="/play/election-night.json"></div>
 *   <script src="/play-card.js" defer></script>
 *
 * Built 2026-10-26 for Election Night Bingo, written so the next viral game
 * (the office Christmas party) is a new JSON file, not new code.
 *
 * What it does, in the order a visitor meets it:
 *  - Deals a card from the game's square pool (24 random squares around a FREE
 *    centre). The seed is kept in localStorage, so a refresh keeps YOUR card,
 *    and every person who opens the same shared link gets a different one.
 *  - Tap a square to mark it. Marks are saved too. A full row, column or
 *    diagonal shows a BINGO banner.
 *  - Share: on a phone, "Share my card" hands a story-sized picture (1080x1920)
 *    to the system share sheet, which is how it reaches TikTok, Instagram and
 *    Facebook (none of them has a web share link for an image). Elsewhere the
 *    picture downloads instead. Plus X and Facebook link shares, copy link, and
 *    an embed snippet so a blog can put the playable card on its own page.
 *
 * Why it is built like this: a viral link means thousands of visitors in an
 * hour, so the whole game runs in the browser. No account, no server, no
 * worker call: GitHub Pages serves two small static files and the rest happens
 * on the phone. Analytics are best-effort (gtag may be blocked) and never in
 * the way of playing.
 *
 * The picture is the marketing: it carries the page address, so every share
 * is a way in. No demo watermark on this one; it is a free promotional game,
 * not a generator export.
 */
(function () {
  "use strict";

  function ev(name, params) {
    try { if (window.gtag) window.gtag("event", name, params || {}); } catch (e) { /* never block play */ }
  }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || "null");
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  // mulberry32: small, fast, and the same card for the same seed on any device.
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function deal(pool, seed) {
    var r = rng(seed), a = pool.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    a = a.slice(0, 24);
    a.splice(12, 0, null); // the free centre
    return a;
  }
  function newSeed() { return (Math.random() * 4294967296) >>> 0; }
  var LINES = (function () {
    var L = [], i;
    for (i = 0; i < 5; i++) { L.push([0, 1, 2, 3, 4].map(function (c) { return i * 5 + c; })); L.push([0, 1, 2, 3, 4].map(function (r) { return r * 5 + i; })); }
    L.push([0, 6, 12, 18, 24]); L.push([4, 8, 12, 16, 20]);
    return L;
  })();
  function hasBingo(marks) { return LINES.some(function (l) { return l.every(function (k) { return marks[k]; }); }); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  var CSS = "" +
    ".pc{max-width:520px;margin:0 auto;font-family:'Outfit',system-ui,sans-serif;color:var(--pc-ink)}" +
    ".pc-k{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--pc-mark);text-align:center}" +
    ".pc-t{font-family:'Bebas Neue',Impact,sans-serif;font-size:42px;letter-spacing:1.5px;line-height:1;text-align:center;margin:4px 0 12px;color:var(--pc-ink)}" +
    ".pc-card{background:var(--pc-bg);border-radius:14px;padding:10px;box-shadow:0 10px 30px rgba(15,27,45,.18)}" +
    ".pc-hd{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:6px}" +
    ".pc-hd span{background:var(--pc-head);color:var(--pc-headink);font-family:'Bebas Neue',Impact,sans-serif;font-size:26px;text-align:center;border-radius:8px;line-height:1.5}" +
    ".pc-g{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}" +
    ".pc-s{min-height:66px;border:2px solid var(--pc-line);background:#fff;border-radius:8px;font:600 11px/1.15 'Outfit',system-ui,sans-serif;color:var(--pc-ink);padding:4px 2px;cursor:pointer;display:flex;align-items:center;justify-content:center;text-align:center;overflow-wrap:normal;word-break:normal;hyphens:manual;-webkit-tap-highlight-color:transparent;transition:transform .08s;position:relative}" +
    ".pc-s:active{transform:scale(.95)}" +
    ".pc-s[aria-pressed=true]{background:var(--pc-mark);border-color:var(--pc-mark);color:var(--pc-ink)}" +
    ".pc-s[aria-pressed=true]:after{content:'\\2713';position:absolute;top:1px;right:3px;font:700 12px/1 system-ui,sans-serif;color:var(--pc-ink)}" +
    ".pc-s.pc-free{background:var(--pc-head);border-color:var(--pc-head);color:var(--pc-headink);font-family:'Bebas Neue',Impact,sans-serif;font-size:20px;letter-spacing:1px;cursor:default}" +
    ".pc-s.pc-free:after{display:none}" +
    ".pc-win{display:none;margin:12px 0 0;padding:12px;border-radius:12px;background:var(--pc-head);color:var(--pc-headink);text-align:center;font-family:'Bebas Neue',Impact,sans-serif;font-size:34px;letter-spacing:2px;animation:pcpop .4s ease-out}" +
    ".pc.pc-bingo .pc-win{display:block}" +
    "@keyframes pcpop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}" +
    ".pc-acts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}" +
    ".pc-b{border:2px solid var(--pc-ink);background:transparent;color:var(--pc-ink);border-radius:999px;padding:11px 10px;font:700 14px 'Outfit',system-ui,sans-serif;cursor:pointer;text-align:center;text-decoration:none;display:block}" +
    ".pc-b:hover{text-decoration:none;opacity:.85}" +
    ".pc-b.pc-main{grid-column:1/-1;background:var(--pc-mark);border-color:var(--pc-mark);font-size:16px;padding:14px}" +
    ".pc-hint{font-size:12.5px;color:#5B7186;text-align:center;margin-top:10px;line-height:1.5}" +
    ".pc-emb{margin-top:16px;font-size:13px}" +
    ".pc-emb summary{cursor:pointer;font-weight:600;color:#5B7186}" +
    ".pc-emb textarea{width:100%;height:84px;margin-top:8px;font:12px/1.4 ui-monospace,monospace;border:1px solid #ccc;border-radius:8px;padding:8px;color:#1D2C3C;background:#fff}" +
    ".pc-new{background:none;border:0;color:#5B7186;font-size:12.5px;text-decoration:underline;cursor:pointer;display:block;margin:8px auto 0}" +
    "@media(max-width:400px){.pc-s{font-size:9.5px;min-height:60px}.pc-t{font-size:34px}}.pc-notitle .pc-k,.pc-notitle .pc-t{display:none}";

  function injectCss() {
    if (document.getElementById("pc-css")) return;
    var s = document.createElement("style"); s.id = "pc-css"; s.textContent = CSS; document.head.appendChild(s);
  }

  function mount(el) {
    var src = el.getAttribute("data-src");
    var embed = el.hasAttribute("data-embed");
    fetch(src, { cache: "force-cache" }).then(function (r) { return r.json(); }).then(function (g) {
      run(el, g, embed);
    }).catch(function () {
      el.innerHTML = '<p class="pc-hint">The card could not load. Refresh to try again.</p>';
    });
  }

  function run(el, g, embed) {
    injectCss();
    var KEY = "bcg_play_" + g.slug;
    var st = store(KEY);
    if (!st || typeof st.seed !== "number" || !Array.isArray(st.marks) || st.marks.length !== 25) {
      st = { seed: newSeed(), marks: [] };
      for (var i = 0; i < 25; i++) st.marks.push(i === 12);
      store(KEY, st);
      ev("play_card_dealt", { game: g.slug, embed: embed });
    }
    var C = g.colours || {};
    el.style.setProperty("--pc-bg", C.bg || "#FBF6EA");
    el.style.setProperty("--pc-ink", C.ink || "#1B2A4A");
    el.style.setProperty("--pc-head", C.head || "#1B2A4A");
    el.style.setProperty("--pc-headink", C.headInk || "#F3E3B5");
    el.style.setProperty("--pc-mark", C.mark || "#C9A227");
    el.style.setProperty("--pc-line", C.line || "#D9CDB0");

    var card = deal(g.squares, st.seed);
    var won = hasBingo(st.marks);
    var shareCount = 0;

    function link(content) {
      return g.page + "?utm_source=share&utm_medium=social&utm_campaign=" + encodeURIComponent(g.campaign) + "&utm_content=" + encodeURIComponent(content);
    }

    el.innerHTML =
      '<div class="pc' + (won ? " pc-bingo" : "") + (el.hasAttribute("data-notitle") ? " pc-notitle" : "") + '">' +
      '<div class="pc-k">' + esc(g.kicker || "") + '</div>' +
      '<div class="pc-t">' + esc(g.title) + '</div>' +
      '<div class="pc-card"><div class="pc-hd"><span>B</span><span>I</span><span>N</span><span>G</span><span>O</span></div><div class="pc-g">' +
      card.map(function (s, k) {
        return s === null
          ? '<button type="button" class="pc-s pc-free" aria-pressed="true" disabled>' + esc(g.free || "FREE") + '</button>'
          : '<button type="button" class="pc-s" data-k="' + k + '" aria-pressed="' + (st.marks[k] ? "true" : "false") + '">' + esc(s) + '</button>';
      }).join("") +
      '</div></div>' +
      '<div class="pc-win" role="status">BINGO!</div>' +
      '<div class="pc-acts">' +
      '<button type="button" class="pc-b pc-main" data-act="share">Share my card</button>' +
      '<a class="pc-b" data-act="x" target="_blank" rel="noopener" href="#">Post on X</a>' +
      '<a class="pc-b" data-act="fb" target="_blank" rel="noopener" href="#">Facebook</a>' +
      '<button type="button" class="pc-b" data-act="save">Save image</button>' +
      '<button type="button" class="pc-b" data-act="copy">Copy link</button>' +
      '</div>' +
      '<p class="pc-hint">Tap a square when it happens on the broadcast. Everyone who opens the link gets their own card.' +
      (embed ? ' <a href="' + esc(link("embed")) + '" target="_blank" rel="noopener">Play full screen</a>' : '') + '</p>' +
      (embed ? '' :
        '<details class="pc-emb"><summary>Put this playable card on your own site</summary>' +
        '<textarea readonly aria-label="Embed code">' + esc('<iframe src="https://bingocardgenerator.online/play/' + g.slug + '.html" title="' + g.title + '" width="100%" height="860" style="border:0;max-width:540px" allow="web-share; clipboard-write" loading="lazy"></iframe>') + '</textarea></details>') +
      '<button type="button" class="pc-new" data-act="new">Deal me a new card</button>' +
      '</div>';

    var root = el.firstChild;
    var xa = root.querySelector('[data-act="x"]'), fa = root.querySelector('[data-act="fb"]');
    function refreshLinks() {
      var text = won ? g.bingoText : g.shareText;
      xa.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(link("x")) + (g.hashtags ? "&hashtags=" + encodeURIComponent(g.hashtags.join(",")) : "");
      fa.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(link("facebook"));
    }
    refreshLinks();

    root.addEventListener("click", function (e) {
      var sq = e.target.closest(".pc-s[data-k]");
      if (sq) {
        var k = +sq.getAttribute("data-k");
        st.marks[k] = !st.marks[k];
        sq.setAttribute("aria-pressed", st.marks[k] ? "true" : "false");
        store(KEY, st);
        var now = hasBingo(st.marks);
        if (now && !won) { ev("play_bingo", { game: g.slug }); if (navigator.vibrate) try { navigator.vibrate(120); } catch (er) {} }
        won = now; root.classList.toggle("pc-bingo", won); refreshLinks();
        return;
      }
      var b = e.target.closest("[data-act]");
      if (!b) return;
      var act = b.getAttribute("data-act");
      if (act === "x" || act === "fb") { ev("share", { method: act === "x" ? "x" : "facebook", content_type: "play_card", item_id: g.slug }); return; }
      if (act === "copy") {
        var u = link("copy");
        var done = function () { b.textContent = "Copied!"; setTimeout(function () { b.textContent = "Copy link"; }, 1800); };
        if (navigator.clipboard) navigator.clipboard.writeText(u).then(done, function () { prompt("Copy this link:", u); });
        else prompt("Copy this link:", u);
        ev("share", { method: "copy_link", content_type: "play_card", item_id: g.slug });
        return;
      }
      if (act === "new") {
        if (!confirm("Deal a brand new card? Your marks on this one will be cleared.")) return;
        st = { seed: newSeed(), marks: [] }; for (var i = 0; i < 25; i++) st.marks.push(i === 12);
        store(KEY, st); ev("play_card_dealt", { game: g.slug, embed: embed, redeal: true }); run(el, g, embed); return;
      }
      if (act === "share" || act === "save") {
        b.disabled = true; var label = b.textContent; b.textContent = "Making your picture...";
        picture(card).then(function (blob) {
          var file = new File([blob], g.slug + "-bingo.png", { type: "image/png" });
          var data = { files: [file], title: g.title, text: (won ? g.bingoText : g.shareText) + " " + link("native") };
          if (act === "share" && navigator.canShare && navigator.canShare({ files: [file] })) {
            return navigator.share(data).then(function () { ev("share", { method: "native", content_type: "play_card", item_id: g.slug }); }, function () { /* cancelled */ });
          }
          var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file.name; document.body.appendChild(a); a.click(); a.remove();
          setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
          ev("share", { method: "download", content_type: "play_card", item_id: g.slug });
          if (act === "share") alert("Your card is saved as a picture. Post it to your story on TikTok, Instagram or Facebook, and paste the link: " + link("story"));
        }).catch(function () { alert("Sorry, the picture could not be made on this device. Try Copy link instead."); })
          .then(function () { b.disabled = false; b.textContent = label; });
      }
    });

    // The story-sized picture: the card as marked, the title, and the address.
    function picture(cardSquares) {
      var W = 1080, H = 1920, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
      var x = cv.getContext("2d");
      var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      return ready.then(function () {
        x.fillStyle = C.head || "#1B2A4A"; x.fillRect(0, 0, W, H);
        x.textAlign = "center"; x.textBaseline = "middle";
        x.fillStyle = C.mark || "#C9A227"; x.font = "700 40px Outfit, system-ui, sans-serif";
        x.fillText((g.kicker || "").toUpperCase(), W / 2, 170);
        x.fillStyle = C.headInk || "#F3E3B5"; x.font = "124px 'Bebas Neue', Impact, sans-serif";
        x.fillText(g.title.toUpperCase(), W / 2, 280);
        var pad = 70, top = 400, gw = W - pad * 2, gap = 14, cell = (gw - gap * 4) / 5;
        roundRect(x, pad - 26, top - 26, gw + 52, gw + 140, 30, C.bg || "#FBF6EA");
        "BINGO".split("").forEach(function (L, i) {
          roundRect(x, pad + i * (cell + gap), top, cell, 80, 14, C.head || "#1B2A4A");
          x.fillStyle = C.headInk || "#F3E3B5"; x.font = "64px 'Bebas Neue', Impact, sans-serif"; x.fillText(L, pad + i * (cell + gap) + cell / 2, top + 44);
        });
        var gt = top + 80 + gap;
        cardSquares.forEach(function (s, k) {
          var cx = pad + (k % 5) * (cell + gap), cy = gt + Math.floor(k / 5) * (cell + gap);
          var marked = st.marks[k];
          roundRect(x, cx, cy, cell, cell, 14, s === null ? (C.head || "#1B2A4A") : (marked ? (C.mark || "#C9A227") : "#FFFFFF"));
          if (s === null) {
            x.fillStyle = C.headInk || "#F3E3B5"; x.font = "54px 'Bebas Neue', Impact, sans-serif"; x.fillText(g.free || "FREE", cx + cell / 2, cy + cell / 2 + 4); return;
          }
          if (marked) { x.fillStyle = C.ink || "#1B2A4A"; x.font = "700 30px system-ui, sans-serif"; x.textAlign = "right"; x.fillText("\u2713", cx + cell - 10, cy + 24); x.textAlign = "center"; }
          x.fillStyle = C.ink || "#1B2A4A"; x.font = "600 25px Outfit, system-ui, sans-serif";
          wrap(x, s, cx + cell / 2, cy + cell / 2, cell - 16, 29);
        });
        var foot = gt + 5 * (cell + gap) + 70;
        if (won) { x.fillStyle = C.mark || "#C9A227"; x.font = "150px 'Bebas Neue', Impact, sans-serif"; x.fillText("BINGO!", W / 2, foot + 60); foot += 150; }
        x.fillStyle = C.headInk || "#F3E3B5"; x.font = "600 42px Outfit, system-ui, sans-serif";
        x.fillText("Get your free card:", W / 2, H - 170);
        x.fillStyle = C.mark || "#C9A227"; x.font = "700 44px Outfit, system-ui, sans-serif";
        x.fillText(g.page.replace(/^https?:\/\//, "").replace(/\.html$/, ""), W / 2, H - 110);
        return new Promise(function (res, rej) { cv.toBlob(function (b) { b ? res(b) : rej(); }, "image/png"); });
      });
    }
    function roundRect(x, X, Y, w, h, r, fill) {
      x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r);
      x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); x.fillStyle = fill; x.fill();
    }
    function wrap(x, text, cx, cy, maxW, lh) {
      var words = text.split(" "), lines = [], cur = "";
      words.forEach(function (w) { var t = cur ? cur + " " + w : w; if (x.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; });
      if (cur) lines.push(cur);
      var y0 = cy - (lines.length - 1) * lh / 2;
      lines.forEach(function (l, i) { x.fillText(l, cx, y0 + i * lh); });
    }
  }

  function boot() { Array.prototype.forEach.call(document.querySelectorAll(".play-card[data-src]"), mount); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();

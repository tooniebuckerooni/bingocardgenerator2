// Build the keyword landing pages from _content/pages/*.js.
//
// This site has no templating — every file carries its own head, style, header
// and footer. That is fine for three pages and a liability at seven: adding one
// page means editing the footer link row in every other file, and the FAQ has
// to be written twice (visible accordion + FAQPage schema), which is exactly
// how the schema on the older pages drifted out of sync with the copy.
//
// So: chrome and CSS live here and in _content/page-styles.css, each page's
// content lives in _content/pages/<slug>.js, and the FAQ is authored ONCE and
// rendered into both the accordion and the schema. Parity is structural.
//
//   node _tools/build-pages.js              # dry run
//   node _tools/build-pages.js --write
const fs = require("fs"), path = require("path");
const REPO = path.resolve(__dirname, "..");
const WRITE = process.argv.includes("--write");
const SITE = "https://bingocardgenerator.online";

const pages = fs.readdirSync(path.join(REPO, "_content/pages"))
  .filter((f) => f.endsWith(".js"))
  .map((f) => require(path.join(REPO, "_content/pages", f)));

const STYLES = fs.readFileSync(path.join(REPO, "_content/page-styles.css"), "utf8").trimEnd();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Footer link row + mobile nav list every real page, so a new page is reachable
// the moment it ships rather than waiting on a hand edit somewhere else.
const LINKS = [
  ["/", "Generator"],
  ["/custom-bingo-cards.html", "Custom Cards"],
  ["/bingo-card-maker.html", "Card Maker"],
  ["/online-bingo-generator.html", "Online"],
  ["/bingo-board-generator.html", "Boards"],
  ["/number-bingo-cards.html", "Number Bingo"],
  ["/music-bingo-generator.html", "Music Bingo"],
  ["/blog/", "Blog"],
];
const LEGAL = [["/terms.html", "Terms"], ["/privacy.html", "Privacy"], ["/refund.html", "Refund Policy"]];

const header = () => `<header>
  <a href="/" class="logo">BINGO<span>CARD</span>GENERATOR.ONLINE</a>
  <div class="nav-links">
    <a href="/">Generator</a>
    <a href="/blog/">Blog</a>
    <a href="/" class="nav-cta">Start Creating</a>
    <button class="mtog" onclick="togNav()" aria-label="Menu" aria-expanded="false" aria-controls="mnav">☰</button>
  </div>
</header>
<div class="mnav" id="mnav">
${LINKS.concat([["/terms.html", "Terms &amp; Conditions"], ["/privacy.html", "Privacy Policy"], ["/refund.html", "Refund Policy"]])
  .map(([h, t]) => `  <a href="${h}">${t}</a>`).join("\n")}
</div>`;

const footer = () => `<footer>
  <p>© 2026 BingoCardGenerator.Online · New Brunswick, Canada</p>
  <p style="margin-top:8px">Made by <a href="https://www.fatcityentertainment.com/">Fat City Entertainment</a> — music bingo &amp; trivia games tested on live audiences.</p>
  <p style="margin-top:8px">
${LINKS.concat(LEGAL).map(([h, t]) => `    <a href="${h}">${t}</a>`).join("\n")}
  </p>
</footer>`;

// One FAQ definition -> the visible accordion and the FAQPage schema.
const faqHtml = (faq) => faq.map((x) => `      <div class="faq-item" onclick="this.classList.toggle('open')">
        <button class="faq-q">${x.q} <span class="chev">▼</span></button>
        <div class="faq-a">${x.a}</div>
      </div>`).join("\n");

const stripTags = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

// A page may hand the generator more than a word list: `grid` sets the card
// size and `fill` the fill mode ("col"/"row", where a blank line starts a new
// block), both emitted as data attributes card-starter.js reads. `prefill` puts
// the list in the textarea so a page can ship a ready-made card. Pages that set
// none of these render exactly as before.
const starter = (p) => !p.starter ? "" : `
    <div class="starter">
      <h3>${p.starter.h}</h3>
      <p class="starter-lede">${p.starter.lede}</p>
      <label for="st-t">Game title <span style="text-transform:none;letter-spacing:0;font-weight:400">(optional)</span></label>
      <input type="text" id="st-t" maxlength="48" placeholder="${esc(p.starter.titlePlaceholder)}">
      <label for="st-w">Your squares — one per line</label>
      <textarea id="st-w" placeholder="${esc(p.starter.squaresPlaceholder)}">${esc(p.starter.prefill || "")}</textarea>
      <div class="starter-c" id="st-c">0 squares — need 25 more</div>
      <a class="starter-b" id="st-go" href="/"${
        p.starter.grid ? ` data-gw="${p.starter.grid[0]}" data-gh="${p.starter.grid[1]}"` : ""
      }${p.starter.fill ? ` data-fm="${p.starter.fill}"` : ""}>Open the Generator →</a>
      <p class="starter-n">${p.starter.note}</p>
    </div>`;

function jsonld(p) {
  const url = `${SITE}/${p.slug}.html`;
  const blocks = [
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: p.breadcrumb, item: url },
      ],
    },
    {
      "@context": "https://schema.org", "@type": "HowTo",
      name: p.howto.name,
      description: p.howto.description,
      step: p.howto.step.map((s) => ({ "@type": "HowToStep", name: s.name, text: s.text })),
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: p.faq.map((x) => ({
        "@type": "Question", name: stripTags(x.q),
        acceptedAnswer: { "@type": "Answer", text: stripTags(x.a) },
      })),
    },
    {
      // Matches the shape already on custom-bingo-cards.html and
      // music-bingo-generator.html. WebApplication stays homepage-only — the
      // tool runs at /, not here, and claiming otherwise would be a lie in
      // structured data.
      "@context": "https://schema.org", "@type": "Organization",
      "@id": "https://www.fatcityentertainment.com/#organization",
      name: "Fat City Entertainment",
      url: "https://www.fatcityentertainment.com/",
      logo: SITE + "/fce-logo.png",
      sameAs: [SITE, "https://www.fatcityentertainment.com/bingocardgenerator.html"],
    },
  ];
  return blocks.map((b) => `<script type="application/ld+json">\n${JSON.stringify(b, null, 2)}\n</script>`).join("\n\n");
}

function render(p) {
  const url = `${SITE}/${p.slug}.html`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="shortcut icon" href="/favicon.ico">
<script>try{document.documentElement.dataset.theme=localStorage.getItem('bcg_theme')||'light';}catch(e){}</script>
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.ogDescription || p.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="BingoCardGenerator.Online">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${SITE}/og-image.png">

<!-- GA4 + Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-97J4XBSHBW"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-97J4XBSHBW',{page_title:'${p.breadcrumb.replace(/'/g, "\\'")}'});gtag('config', 'AW-18347447832');</script>

${jsonld(p)}

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
${STYLES}
</style>
</head>
<body data-page="${p.slug}">

${header()}

<div class="wrap">

  <div class="hero">
    <div class="breadcrumb"><a href="/">Home</a> › ${p.breadcrumb}</div>
    <div class="eyebrow">${p.eyebrow}</div>
    <h1>${p.h1}</h1>
    <p class="answer">${p.answer}</p>
    <div class="hero-cta">
      <a href="/" class="btn-primary" onclick="gtag('event','pillar_cta_click',{placement:'hero',page:'${p.slug}'})">${p.heroCta}</a>
      <span class="cta-sub">Free to start · no login · print or play online</span>
    </div>
    <div class="services">
${p.chips.map((c) => `      <span class="svc">${c}</span>`).join("\n")}
    </div>
  </div>

  <div class="body">
${p.body.trimEnd()}
${starter(p)}

    <!-- FAQ -->
    <div class="faq-section">
      <h2>${p.faqHeading}</h2>

${faqHtml(p.faq)}
    </div>

    <div class="closing-cta">
      <h3>${p.closing.h}</h3>
      <p>${p.closing.p}</p>
      <a href="/" onclick="gtag('event','pillar_cta_click',{placement:'footer',page:'${p.slug}'})">${p.closing.cta}</a>
    </div>

  </div>
</div>

${footer()}
<script>
function togNav(){
  const n=document.getElementById('mnav'),b=document.querySelector('.mtog');
  const open=n.classList.toggle('open');
  b.setAttribute('aria-expanded',open?'true':'false');
  b.textContent=open?'✕':'☰';
}
</script>
<script src="/card-starter.js" defer></script>
</body>
</html>
`;
}

let changed = 0;
const built = [];
for (const p of pages) {
  const file = path.join(REPO, p.slug + ".html");
  const out = render(p);
  const cur = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  built.push(p.slug);
  if (cur === out) continue;
  changed++;
  console.log(`${WRITE ? "wrote" : "would write"}: ${p.slug}.html  (${out.length} bytes${cur ? ", was " + cur.length : ", new"})`);
  if (WRITE) fs.writeFileSync(file, out);
}

// Sitemap: the tool owns a marked block, the way the Fat City song library does.
// Fifty-plus hand-maintained <url> entries is where the hand-add rule stops making
// sense; four generated pages is already past it.
const smFile = path.join(REPO, "sitemap.xml");
let sm = fs.readFileSync(smFile, "utf8");
const today = new Date().toISOString().slice(0, 10);
const block = "  <!-- bcg:pages -->\n" + pages.map((p) =>
  `  <url>\n    <loc>${SITE}/${p.slug}.html</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.9</priority>\n  </url>`
).join("\n") + "\n  <!-- /bcg:pages -->";
// drop any hand entry for a page the block now owns, then insert/replace the block
let smOut = sm;
for (const p of pages) {
  smOut = smOut.replace(new RegExp(`  <url>\\s*<loc>${SITE}/${p.slug}\\.html</loc>[\\s\\S]*?</url>\\n`, "g"), "");
}
smOut = /<!-- bcg:pages -->/.test(smOut)
  ? smOut.replace(/  <!-- bcg:pages -->[\s\S]*?<!-- \/bcg:pages -->/, () => block)
  : smOut.replace("</urlset>", () => block + "\n</urlset>");
if (smOut !== sm) {
  changed++;
  console.log(`${WRITE ? "wrote" : "would write"}: sitemap.xml (${pages.length} page entries)`);
  if (WRITE) fs.writeFileSync(smFile, smOut);
}

console.log(`\npages: ${built.length} (${built.join(", ")})   changed: ${changed}`);
if (!WRITE && changed) console.log("(dry run — pass --write to apply)");

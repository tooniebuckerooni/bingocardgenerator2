// Rewrite every page's FAQPage JSON-LD from the FAQ that page actually shows.
//
// Google requires FAQPage content to be visible on the page. These files drifted:
// visible answers picked up extra sentences over time and the schema never
// followed, and a few schema questions had no visible counterpart at all. The
// page is the source of truth — this regenerates mainEntity from the .faq-item
// blocks, so question and answer always match what a reader sees.
//
// Idempotent. Run it after editing any FAQ copy.
//   node _tools/sync-faq-schema.js            # dry run
//   node _tools/sync-faq-schema.js --write
const fs = require("fs"), path = require("path");
const REPO = path.resolve(__dirname, "..");
const WRITE = process.argv.includes("--write");

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["_tools", "node_modules", ".git", "docs"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

// Visible text, as a reader sees it. Entities are decoded because the schema
// stores plain text, not HTML.
const strip = (t) =>
  t.replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–")
    .replace(/\s+/g, " ").trim();

// One .faq-item carries its own question and answer, so they can't be
// mis-paired the way two parallel lists could be.
function visibleFaqs(html) {
  return [...html.matchAll(/<div class="faq-item"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g)]
    .map((m) => {
      const q = m[1].match(/class="faq-q"[^>]*>([\s\S]*?)(?:<span|<\/button|<\/div)/);
      const a = m[1].match(/class="faq-a"[^>]*>([\s\S]*?)$/);
      return q && a ? { q: strip(q[1]), a: strip(a[1]) } : null;
    })
    .filter((x) => x && x.q && x.a);
}

let files = 0, synced = 0, added = 0, dropped = 0;
for (const f of walk(REPO)) {
  const src = fs.readFileSync(f, "utf8");
  const faqs = visibleFaqs(src);
  if (!faqs.length) continue;
  let out = src, touched = false;

  for (const m of src.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch { continue; }
    const nodes = data["@graph"] || [data];
    const page = nodes.find((n) => n["@type"] === "FAQPage");
    if (!page) continue;

    const before = JSON.stringify(page.mainEntity || []);
    const wanted = faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    }));
    if (JSON.stringify(wanted) === before) continue;

    const had = (page.mainEntity || []).length;
    added += Math.max(0, wanted.length - had);
    dropped += Math.max(0, had - wanted.length);
    synced++;
    page.mainEntity = wanted;

    // Re-serialise only this block, preserving the file's own indentation style.
    const indent = (m[0].match(/\n(\s*)/) || [, "  "])[1];
    const json = JSON.stringify(data, null, 2).split("\n")
      .map((l, i) => (i ? indent + l : l)).join("\n");
    out = out.replace(m[0], () =>
      `<script type="application/ld+json">\n${indent}${json}\n${indent}</script>`);
    touched = true;
  }

  if (touched) {
    files++;
    console.log(`${WRITE ? "synced" : "would sync"}: ${path.relative(REPO, f)} (${faqs.length} visible Q&As)`);
    if (WRITE) fs.writeFileSync(f, out);
  }
}
console.log(`\nfiles: ${files}  blocks synced: ${synced}  questions added: ${added}  removed: ${dropped}`);
if (!WRITE && files) console.log("(dry run — pass --write to apply)");

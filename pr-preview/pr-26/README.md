# bingocardgenerator.online

The next gen of bingo card making — built for music bingo, priced for printing costs.

Static site, no build step, no framework. GitHub Pages serves it; `CNAME` points
`bingocardgenerator.online` at it. The generator itself is a single
self-contained client-side app inside `index.html`.

## What lives where

| Path | What it is |
|---|---|
| `index.html` | **The whole product.** 133KB: the generator app (inline JS), its CSS, the marketing page, and the pricing/FAQ. Source of truth for design tokens, JSON-LD shape, and the `bcg_autosave` contract. |
| `card-starter.js` | The handoff a landing page uses to send a visitor into the generator with their squares already typed. |
| `custom-bingo-cards.html`, `bingo-card-maker.html`, `online-bingo-generator.html`, `bingo-board-generator.html` | **Generated — do not hand-edit.** Built by `_tools/build-pages.js` from `_content/pages/*.js`. |
| `music-bingo-generator.html` | Hand-maintained, predates the builder. |
| `blog/` | Three long-form posts. These out-rank the tool pages and are worth more of the next hour than another landing page. |
| `docs/` | `brand-entity-plan.md` (architecture, hub-and-spoke, WS-C) and `monetization-strategy.md` (the north star). Read both before a content decision. |
| `worker.js` | The Lemon Squeezy licence-verification Worker. |

## Tooling (`_tools/`)

Everything is dry-run by default; pass `--write` to apply. All are idempotent —
a second run is a no-op.

```sh
node _tools/build-pages.js --write        # rebuild the four generated pages + sitemap block
node _tools/sync-faq-schema.js --write    # FAQPage JSON-LD <- each page's visible FAQ
```

**Editing a generated page:** change `_content/pages/<slug>.js`, re-run
`build-pages.js --write`. Editing the `.html` directly loses the change on the
next build.

**Editing shared chrome or CSS:** `_content/page-styles.css` and the constants at
the top of `_tools/build-pages.js`. Adding a page to the `LINKS` array puts it in
every generated page's footer and mobile nav at once — `index.html` and
`music-bingo-generator.html` still need it added by hand.

**The FAQ is authored once.** `_content/pages/*.js` holds a `faq` array, and the
builder renders it into both the visible accordion and the FAQPage schema. That
is deliberate: the older pages drifted apart — visible answers grew and the
schema didn't follow — and `sync-faq-schema.js` exists to repair the pages the
builder doesn't own.

## Three things that are easy to get wrong

**The grid is selectable, and two things depend on its shape.** `gridW`/`gridH`
default to 5×5; presets cover 3×3/4×4/5×5/6×6 and a custom panel allows 2–8 each
way, so non-square cards like 4×7 are valid. `requiredSquares()` is `gridW*gridH`
— the full cell count, *not* cells-minus-free-space, so a 5×5 still asks for 25
exactly as it always has and every page saying "minimum 25" stays true.
Two derived rules, both with UI that explains itself rather than failing silently:
a **free space needs both sides odd** (`freeEligible()`) since an even grid has no
middle cell, and the **B-I-N-G-O header only renders at width 5** (`showBingoRow()`)
because the word is five letters. In both cases the user's toggle keeps its
preference and goes inert — it is not silently flipped.

`drawCardCanvas()` and `pdfDrawCard()` are deliberate mirrors of each other.
Change them together or the preview and the PDF drift apart.

**Branding is Pro.** Logo and the two branding text lines are gated behind a
pass (`brandingActive()` = `brandingOn && isPro`). Free users get everything
else, with a demo watermark on exports. If you change this, the claim appears in
five places: `index.html` lines ~61, ~914, ~974, ~1316 and **`terms.html`** —
that last one is the document a customer gets pointed at in a dispute.

## The autosave contract

`localStorage['bcg_autosave']` holds `{v:1, t:<title>, w:<newline-separated
squares>, gw:<grid width>, gh:<grid height>, …}`. `gw`/`gh` are optional and
default to 5 when absent, so blobs written before grid sizing still restore. On load, with no `?card=` param, `index.html` calls `applyState()`
on it and toasts the user. Any page can hand work to the generator by writing
that key and navigating to `/` — no forking required. `src:"starter"` marks a
landing-page handoff so the toast reads as a first arrival rather than a return.

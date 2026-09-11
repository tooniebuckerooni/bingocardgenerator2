---
name: bingo-game-landing-page
description: Build a new free, no-login "load-and-go" bingo game landing page for bingocardgenerator.online — a page with a ready-made square list that hands off into the generator in one click, like the existing Number Bingo, Alphabet Bingo, and Icebreaker Bingo pages. Use this whenever asked to add a new preset/preloaded bingo game, a new starter/handoff page, or another "free game" to the site — even if the user doesn't name this skill directly. Also consult it before touching card-starter.js, the GAMES cross-link module, or the NAV_GROUPS list in _tools/build-pages.js, since those are shared across the whole family.
---

# Bingo game landing page

The site has a small family of free, no-account "load-and-go" games — a
landing page with a ready-made list of squares that loads straight into the
generator with one click. Number Bingo, Alphabet Bingo, and Icebreaker Bingo
are the three that exist today; this skill is what building the fourth one
correctly requires.

## Step 1 — Inventory every preset option before writing a word of content

Do this first, before drafting copy or picking a grid size. Here's why it
matters: the first three games shipped setting only grid size and fill mode,
and it took a live production report from the site owner to discover we'd
also needed to set the free-space flag — two of three games were silently
dropping one square per card because nobody had checked the full list of
what the generator actually accepts. Don't repeat that.

The generator's complete state is defined in two places in `index.html`:
`collectState()` (what the generator saves) and `applyState()` (what a
starter hands over restores). Read both — this list is accurate as of this
session, but re-verify it against the live file, since it can drift:

| Field | What it controls | Values | Default | Set from a starter? |
|---|---|---|---|---|
| `t` | Title | text, ≤48 chars | empty | **Yes** — via `starter.titleValue`. Leaving this empty makes the preview fall back to a hardcoded "Music Bingo," which is wrong for every other game. |
| `w` | The squares, one per line | text | empty | Yes — the whole point of a starter. |
| `gw`, `gh` | Grid width/height | 2–8 each | 5, 5 | Yes, whenever not a plain 5×5. |
| `fm` | Fill mode | `simple` \| `col` \| `row` (blank line starts a new block) | `simple` | Yes, if the list is organized into ranges/categories (like Number Bingo's five B-I-N-G-O blocks). Omit for a flat list. |
| `fo` | Free space on/off | `true` \| `false` | `true` (on) | **Always decide this deliberately.** If the list count exactly fills the grid with nothing to spare (25 letters for 5×5, etc.), free space silently bumps one entry — turn it off (`freeOff: true`). If the game is a real/traditional bingo variant where a centre free space is expected (a numbers game), leave it on. |
| `fp` | Free space position | `center` (the only value that matters — even grids override it automatically) | `center` | No, leave default. |
| `ft` | Free space label text | text | `FREE` | Rarely — only if the game has a natural replacement word. |
| `br` | Show the B-I-N-G-O header row | boolean | `true` | Rarely — it only actually renders at width 5 regardless, and most games read fine with it on. |
| `fn` | Font | `oswald` \| `playfair` \| `fredoka` \| `righteous` \| `mono` | `oswald` | Optional — worth a moment's thought if a font obviously fits the game's tone (e.g. something playful for a kids' game). |
| `th` | Color theme | `eco` \| `elite` \| `classroom` \| `celebration` \| `retro` \| `custom` \| `midnight` | `eco` | Optional, but check the list — there's a theme literally called `classroom` that no page currently defaults to, including the classroom-audience one. Don't ship a default without at least considering whether one of these already fits. |
| `cc` | Custom theme's 5 colors | array of RGB triples | built-in palette | Only if `th: "custom"`. |
| `md` | Print vs. Share tab | `print` \| `share` | `print` | No, leave default. |
| `ly` | Layout | `portrait` \| `landscape` (2-up with a cut line) | `portrait` | Rarely — landscape suits a game whose whole pitch is bulk printing. |
| `pc`, `sc` | Card count (print / share tabs) | 1–999 | 5, 10 | No — let the visitor set their own. |
| `bo`, `bt`, `bt2`, `lu`, `ls` | Branding on/off, two text lines, logo URL, logo scale | — | off / empty | **Never.** Branding is Pro-gated; a free starter page setting these would be misleading. |

Every one of these flows through the same mechanism: a starter writes a
`{v:1, src:"starter", t, w, ...}` blob to `localStorage['bcg_autosave']` and
navigates to `/`, where `applyState()` reads it. `card-starter.js`'s own
header comment is the authoritative low-level contract for which `data-*`
attributes map to which fields — read it before adding a new one.

## Step 2 — Decide the grid, the fill mode, and the free-space call

Most games will keep most fields at their default. The point of step 1
isn't to set everything — it's to have actually looked at the full list and
made a call on each one relevant to this game, instead of silently
inheriting whatever the previous game happened to use. Write down (even
just in your own head, or in the page config's comments) *why* free space
is on or off for this game — that's the exact thing that went unstated last
time and caused the bug.

**The one hard rule, no exceptions:** the number of non-blank lines in the
square list must equal `gridW × gridH` exactly. The generator carves the
free space out of that count at render time — it is never subtracted from
the source list. A 25-item list for a 5×5 grid is correct whether or not
free space ends up on; a 24-item list is not.

## Step 3 — Build it through the existing template, not a bespoke page

Every game so far is generated from `_content/pages/<slug>.js` by
`node _tools/build-pages.js --write` — not hand-authored HTML. This gets you
FAQ/schema parity, sitemap updates, and nav/footer sync for free, and avoids
the exact kind of drift `_tools/sync-faq-schema.js` exists to repair.
Copy `_content/pages/alphabet-bingo.js` as the template. The fields that
matter for a game page:

```
slug, games: true, title, description (≤160 chars), ogDescription,
breadcrumb, eyebrow, h1, answer, heroCta, chips, faqHeading,
starter: { h, lede, titlePlaceholder, squaresPlaceholder, prefill,
           grid: [w, h], fill, freeOff, titleValue, ctaHandoff: true, note },
howto: { name, description, step: [...] },
body,     // raw HTML — intro + a couple of h2 sections
faq: [ {q, a}, ... ],
closing: { h, p, cta },
```

`games: true` is what opts a page into the shared "make it yours" callout
and the 3-free-games cross-link module — you don't write either by hand.
`ctaHandoff: true` is what makes the hero and closing CTAs (not just the
small starter button) carry the square list — every trigger with
`data-starter` gets wired up, which matters because binding only `#st-go`
was a real historical bug here.

Then register the new page in two places in `_tools/build-pages.js` so it
shows up sitewide automatically:
- Add it to the `GAMES` array (title + one-line blurb) so the other games'
  cross-link modules pick it up.
- Add it to the `NAV_GROUPS` "Free Games" group so it appears in every
  page's menu.

If it's meant to join the "3 free games" family specifically (as opposed to
some other kind of page), also add it to the hand-maintained menus in
`index.html` and `music-bingo-generator.html` — those two aren't templated
and need the same line added by hand.

## Step 4 — Messaging rules (unchanged from the original brief, still correct)

- Zero mention of price, "Pro," passes, watermarks, or upgrades anywhere on
  the page. If a FAQ answer needs to address "is this free?", answer
  honestly without naming a tier — e.g. "Yes — there's no account and no
  time limit. Open the generator, design your cards, and print or share
  when you're ready." Never promise something the free tier doesn't
  actually do (unwatermarked bulk export requires a pass; don't imply
  otherwise).
- State the free load-and-go promise up top, in the hero.
- The credibility/differentiation line has to be specific to that game's
  actual pain point — never a generic "made with care" line. What makes
  this generator's version of the idea better than a template someone could
  already find for free?

## Step 5 — Verify before shipping

1. `node _tools/build-pages.js` (dry run) — read the diff, make sure only
   the pages you expect changed, then `--write`.
2. `node _tools/sync-faq-schema.js` (dry run) — expect zero drift. If it
   reports changes, something in the visible FAQ and the schema disagree.
3. Browser check (Chromium is at `/opt/pw-browsers/chromium`; Playwright is
   installed globally — use `NODE_PATH=$(npm root -g)` to reach it from a
   repo with no local `node_modules`; serve the repo with
   `python3 -m http.server`, don't fetch the live site):
   - The starter counter should read "N squares ✓ ready" immediately on
     load, with no interaction.
   - Click the **hero** CTA specifically, not just the small starter
     button — confirms every `data-starter` trigger works, not only `#st-go`.
   - After landing on `/`, check `#wl`'s value matches the list, `#ct`'s
     value matches the intended title, and
     `JSON.parse(localStorage.getItem('bcg_autosave')).fo` matches the
     free-space decision from Step 1 — that's the check that would have
     caught the original bug before it shipped.

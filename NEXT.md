# What's next — 2026-09-09 (updated 2026-11-10)

## 2026-11-10: the Search Console verdict, and how to land what is in flight

**The four-week check came back, and the demotion has not lifted.** Search
Console, 28 days to 10 Nov against the previous 28:

- 1 click (was 15), 568 impressions (was 1,527).
- All 192 queries now sit at position 80 to 95; none is better than 30. "bingo
  card generator" 45 -> 92, "bingo card maker" 36 -> 96, "bingo maker online"
  9 -> 78. Everything falling to the same place at once is a site-wide
  demotion, not weak pages.
- Zero impressions for the four holiday posts, Election Night Bingo and
  Alphabet Bingo. Number Bingo and Icebreaker Bingo: 1 and 2 impressions.
- Over the same 28 days fatcityentertainment.com got 588 clicks, and its
  election night post, new that period, got 178 at position 7.

**What that changes:**

- **Do not build new landing pages or posts here until this lifts.** They are
  not being shown. Seasonal content goes on Fat City, with this site as the
  tool it links to. A play card (one JSON file for `play-card.js`) is fine,
  because Fat City sends the traffic to it.
- **The Fat City nav link to this site is `rel="nofollow"` since 10 Nov**
  (about 1,000 identical template links from one domain was the likeliest
  cause on that side; insurance, not proven). Links in Fat City's page copy
  stay followed. Details in that repo's `MERGE-PLAN.md` section 7.
- **Re-pull both exports around 8 Dec.** If the homepage is still at 80 or
  worse in January, the question is whether the generator moves onto
  fatcityentertainment.com. Owner's decision; the brand plan says no domain
  change today.

**Shipped 10 Nov:** new favicon (serif "B!" on a crimson tile, amber
exclamation mark). Five files, same names, no page markup changed.

**Branches, measured 10 Nov:**

| Branch | What | Collides with `main`? | Do |
|---|---|---|---|
| `claude/thanksgiving-bf` (6 Nov) | Thanksgiving Bingo play card: new page, `play/thanksgiving.*`, a share image, one line in `play-card.js`, a link from the Thanksgiving post, a sitemap entry | **No.** Test merge clean; it touches no favicon file | Owner's review, then merge. Thanksgiving is Thu 26 Nov, so it is only useful if it lands this week |
| `claude/markdown-execution-cq9j8a`, `claude/social-keyword-monitoring-agents-7sgfac`, `parity-free-tier` | June and July work, 70 to 95 commits behind | Yes | Stale. Never merge. Delete in the browser |
| `cloudflare/workers-autoconfig` | Shares no history with `main` | n/a | Leave alone; delete if Workers Builds was never set up |

Rules that keep it collision-free:

1. **Merge `main` into a branch before running `build-pages.js` on it.** The
   builder rewrites generated pages and the sitemap block from whatever is
   checked out.
2. **After the Thanksgiving branch lands**, the Fat City Thanksgiving post
   should link the play card as well as the blog post (that edit is in the
   other repo, from a fresh `main` there).
3. **A push to `main` deploys by itself** (`pages-deploy.yml`). Check the run
   went green; a preview deploy can hold the `gh-pages` ref for a moment.
4. **After 26 Nov** the Thanksgiving card stays up, evergreen, the same way
   Election Night did. Nothing to take down.

**Owner actions still open, newest first:**

1. **Re-paste `worker.js`** in the Cloudflare dashboard, then set
   `LS_PRODUCT_IDS` (unchanged from 4 Nov, below; nothing merged since touches
   `worker.js`).
2. **Search Console:** nothing to request while the demotion holds. Re-pull
   around 8 Dec.
3. **Delete the stale remote branches** in the browser.


## 2026-11-04: where things stand

- **Shipped since 10-15:** four holiday posts (10-19: Thanksgiving, Christmas,
  office holiday party, New Year's Eve); **Election Night Bingo** (PR #41, 10-31),
  a free card played on the phone (`play-card.js`, `play/election-night.json`),
  with its layout fixed for Android in PR #42; the Halloween Dabby mascot retired
  (10-31).
- **Election night ran with minimal results** (owner, 11-04). The homepage pill
  is gone and the page is evergreen (no dates), reachable from the sitemap only.
  Re-promote it before the next big election rather than leaving it in the nav.
- **Sitemap lastmod is honest again:** `build-pages.js` now moves a page's date
  only when that page's HTML changes, and the wrong dates were corrected (`/`,
  `music-bingo-generator.html`, the three game pages).
- **Owner actions, newest first:**
  1. **Re-paste `worker.js`** in the Cloudflare dashboard, then set
     `LS_PRODUCT_IDS` to the Generator pass product ids (the store is shared
     with Fat City, so today any active licence from that store unlocks Pro).
  2. **Re-pull Search Console around 8 Nov** (the four-week check after the
     10-11 fold, below): the homepage position on "bingo card generator", and
     the verdict on Number, Alphabet and Icebreaker Bingo that was due mid-October.
  3. Delete the stale remote branches in the browser. Thirteen of them still
     carry the strategy docs that moved to Drive on 10-15.
- **Next seasonal build:** office Christmas party bingo is one JSON file for
  `play-card.js` plus a page config.


## 2026-10-11 — four keyword pages folded into the homepage

On 2026-10-04 average position fell from ~40 to ~80 and impressions from
~55/day to ~25/day, with no deploy since 2026-09-11. The timing matches the
third wave (Oct 4-6) of Google's September 2026 spam update. No manual action
in Search Console. The most doorway-like thing on the site was the four
near-synonym keyword pages from 2026-08-30 (`custom-bingo-cards`,
`bingo-card-maker`, `online-bingo-generator`, `bingo-board-generator`), each
just a different way into the same tool. They are now redirect stubs to `/`
(`REDIRECTS` in `_tools/build-pages.js`), and the five FAQ answers the homepage
didn't already cover moved onto it.

**Owner actions:** in Search Console, submit the sitemap again, and run URL Inspection on
`/` → Request Indexing. Then leave it alone. Spam-update demotions get
reassessed slowly, often over weeks.

**The bar:** re-pull Performance in ~4 weeks (early November). The homepage's
position on "bingo card generator" (49 avg over Jul–Oct; ~59 for the page
overall) is the number to watch. Because of this, the "custom-bingo-cards moves off zero"
test further down no longer applies.


Everything below is either waiting on you, or waiting on data. Nothing here is
blocked on more code.

## Shipped this session — the "3 free load-and-go games" family

Alphabet Bingo (`alphabet-bingo.html`) and Icebreaker Bingo (`icebreaker-bingo.html`)
are live alongside Number Bingo, cross-linking each other from a shared module
(`GAMES` in `_tools/build-pages.js`). Number Bingo's FAQ lost its one payment
mention ("a pass removes the watermark") and all three now carry a
non-upsell "make it yours" callout (color theme, event/venue name, card
count, free space) right after the starter.

Worth being clear-eyed about: this was built on your go-ahead, not on
confirmed data. The section below already flagged Number Bingo itself as an
unproven capability bet, and that verdict is still six weeks out — it hasn't
moved just because two more pages shipped. Alphabet and Icebreaker Bingo are
a separate bet on different audiences (teachers/homeschoolers; onboarding
and mixer hosts) rather than confirmation of Number Bingo's own SEO thesis,
and the "fourth blog post over a fifth landing page" finding two sections
down is still an open, unresolved tension against building more landing
pages at all — not something this shipped past.

**New owner action:** request indexing for `alphabet-bingo.html` and
`icebreaker-bingo.html` in Search Console, same as the two below.

## Do these first (owner actions, ~10 minutes total)

1. **Request indexing on `custom-bingo-cards.html`.**
   Search Console → URL Inspection → paste
   `https://bingocardgenerator.online/custom-bingo-cards.html` → Request Indexing.
   Then do the same for `music-bingo-generator.html`.

   Why: the 2026-08-30 Coverage export shows **8 of 10 URLs indexed, 2 not** —
   one "Discovered – currently not indexed" and one "Crawled – currently not
   indexed". Cross-referenced against the Performance export (only `privacy`,
   `custom-bingo-cards` and `music-bingo-generator` had zero impressions), those
   two are almost certainly the pair. "Crawled – currently not indexed" means
   Google fetched the page and judged it not worth adding. It was 884 words, the
   thinnest page on the site. It is now 1,703. Requesting indexing is what gets
   that judgement reconsidered.

   Open the "Crawled – currently not indexed" row in the Coverage report to
   confirm which two URLs they actually are.

2. **Check the branding paywall on a device that has never bought a pass.**
   The Branding panel should show a PRO badge and be locked. Everything else
   stays free. Verified in headless Chromium including with Google Fonts
   blocked, but it is a live paywall and worth thirty seconds of your own eyes.

3. **Sanity-check a Pro download.** Activate a licence, put text on both
   branding lines, and download a PDF. Two lines should print — title on the
   first, promo on the second — and a promo line should sit *under* an uploaded
   logo rather than replacing it.

## Judge the number-bingo page

`number-bingo-cards.html` shipped 2026-09-03. It exists because column fill made
classic 1-75 cards possible for the first time, not because anyone measured the
demand — the keyword tool was on a plan that would not return volumes, so this is
a capability bet.

**The bar:** when you re-pull Search Console below, check this page too. If it is
still at zero impressions at the same point `custom-bingo-cards.html` is judged,
the fifth-landing-page instinct was wrong and the next unit of content work should
be a blog post aimed at the editorial cluster instead — which is what the numbers
already favour.

Request indexing for it in Search Console the same way as the other two above.

As of 2026-09-09 this page is 6 days old — nowhere near the ~6-week bar
below, so there is no new verdict here, just a reminder that "proven" isn't
the right word for it yet. Add `alphabet-bingo.html` and `icebreaker-bingo.html`
to the same re-pull when it happens; judge them on their own impressions
rather than folding them into this page's number, since they target
different searches entirely.

## Check back in ~6 weeks

Re-pull the Search Console Performance export. **The single number that says
whether any of this worked is whether `custom-bingo-cards.html` moves off zero
impressions.** Secondary: whether the homepage holds its position on "bingo card
generator" (357 impressions, position 70.3 as of 2026-08-27) — the four new
pages should not cost it anything.

Baseline to compare against, 3 months to 2026-08-27:
7 clicks · 3,687 impressions · 0.19% CTR · avg position 67.3, improving month
over month (76.3 → 70.6 → 71.8 → **60.5** in August).

## Held deliberately

- **`bingo-generator.html`** — the fifth page from the original brief. On hold
  by your call. Its internal-linking job is already covered by the footer
  cluster the other four carry. If it is ever revived it must carry the
  square starter. (The old "drop the grid-size route card" note no longer
  applies — grid sizes from 2×2 to 8×8 now ship.)
- **`index.html`'s hamburger and nav CTA are still 30px and 36px.** The five
  subpages went to 44px; the homepage header is a different, more elaborate
  component hand-tuned across nine breakpoints, and changing it deserves its own
  pass rather than a drive-by.
- **Fat City still has no PR preview.** bingocardgenerator2 does — open a PR
  here and `pages-preview.yml` deploys a clickable URL under
  `pr-preview/pr-<N>/`. Fat City serves `main` directly with no gh-pages branch,
  so giving it previews means changing how it deploys. Real project, not a
  quick add.

## Ideas the data supports, not yet built

The three blog posts out-rank every tool page on this site (positions 47–53 vs
the homepage's 68.6), and the best-ranking queries are editorial, not
transactional: "bingo night themes" (position 27.4), "teacher bingo" (24),
"themed bingo nights" (22), "bingo lesson plan" (47.4). **Blog-shaped content is
what ranks on this domain today.** A fourth post aimed at that cluster is
probably worth more than a fifth landing page.

# What's next — 2026-09-09

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

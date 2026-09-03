# What's next — 2026-08-30

Everything below is either waiting on you, or waiting on data. Nothing here is
blocked on more code.

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

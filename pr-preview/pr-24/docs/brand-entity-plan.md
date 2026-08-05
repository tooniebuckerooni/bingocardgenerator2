# Brand & Entity Plan — Gen 2 × Fat City Entertainment

> Status: planned, NOT yet implemented. Approved direction from Dustin (July 2026):
> keep the bingocardgenerator.online domain, adopt "by Fat City Entertainment"
> attribution, add a subtle pre-made-games pathway to the FCE store, and build
> reciprocal links with fatcityentertainment.com (FCE side handled in a separate
> chat — see WS-C for the hand-off prompt).

## Positioning guardrail (applies to every workstream)

**The general "bingo card generator" positioning is the flagship.** Music bingo
is a supporting spoke, not the brand. Structure everything hub-and-spoke:

- **Hub:** bingocardgenerator.online homepage = "bingo card generator" (all
  audiences: hosts, teachers, parties, training).
- **Spokes:** music bingo (easiest to win — FCE already ranks for "music bingo
  card generator"), teachers/classroom, parties/events. Spokes exist to earn
  links/mentions and funnel authority and users up to the hub.
- **Rule of thumb:** music-bingo copy may headline blog posts and landing
  spokes, never the homepage hero. The homepage mentions music bingo as one
  use case among several, exactly as it does today.

Both niches are compatible: spokes win first and lift the hub's authority for
the harder head term over time.

---

## WS-A — Entity attribution on Gen 2 (this repo)

**Goal:** make "Bingo Card Generator (Pro) by Fat City Entertainment" a clear,
machine-readable entity so search engines and AI assistants associate the tool
with the established FCE brand.

**Context:** index.html has JSON-LD blocks (~lines 25–160): WebApplication +
Product/Offers, FAQPage, HowTo. The site footer is `.site-footer`. Blog posts
live in `blog/`. FCE = fatcityentertainment.com, operated by the same owner
(New Brunswick, Canada; contact info@fatcityentertainment.com — already used in
terms.html).

**Tasks:**
1. Footer attribution on all pages: "Made by **Fat City Entertainment** — music
   bingo & trivia host resources since [year]" with a normal followed link to
   https://www.fatcityentertainment.com/. Subtle, one line, not sitewide-spammy
   (footer only).
2. JSON-LD: add/extend an `Organization` node — name "Fat City Entertainment",
   `url` fatcityentertainment.com, `sameAs` [bingocardgenerator.online, FCE
   social profiles if any]. Set it as `creator`/`publisher` of the
   WebApplication node (index.html) and `publisher` of blog `Article` schema.
   Keep the existing "BingoCardGenerator.Online" creator as `brand` or merge —
   one consistent entity, no duplicates.
3. Short "Who makes this?" line in the on-page FAQ + FAQ schema: built by Fat
   City Entertainment, hosts who run these games live weekly. (E-E-A-T copy —
   real-world expertise signal.)
4. Consistent naming everywhere: "Bingo Card Generator Pro by Fat City
   Entertainment" in og:site_name / title suffix ONLY if it doesn't bloat
   titles past ~60 chars — otherwise footer + schema is enough.

**Done when:** every page footers the attribution; schema validates (Rich
Results test) with one Organization entity linked both ways; blog articles
carry publisher.

**Depends on:** nothing. Safe to ship independently.

---

## WS-B — "Pre-made games" pathway to the FCE store (this repo)

**Goal:** catch visitors who don't want to build a game ("pre-made bingo
game", "ready-made music bingo") and route them to the FCE store — added ease
for them, a sale + backlink signal for FCE — without cannibalizing the
generator funnel.

**Context:** FCE store sells game packs (e.g.
https://www.fatcityentertainment.com/trivia-store.html and music bingo card
downloads). Gen 2's Step 01 has the import panel; FAQ section at the bottom of
index.html; blog posts have CTA blocks.

**Tasks:**
1. FAQ entry (page + FAQPage schema): "Do you sell ready-made bingo games?" →
   "Yes — our parent company Fat City Entertainment sells complete, host-tested
   music bingo and trivia game packs: cards plus matching playlists, ready to
   run tonight. [Browse pre-made games →]". This is the primary catch for
   "pre-made game" searchers and AI answers.
2. One subtle inline pathway near the effort moment: a small muted line under
   the Step 01 import panel — "Short on time? Get a **pre-made game pack**
   instead →" linking to the FCE store. Styled like the existing helper notes
   (`.fn2`-ish), not a banner.
3. Optional (only if it reads naturally): one sentence in the music-bingo blog
   post linking the store with anchor "pre-made music bingo games".
4. Anchor discipline: vary anchors ("pre-made game packs", "ready-to-run music
   bingo games", "Fat City's game store") — never repeat one exact-match anchor
   everywhere.

**Guardrail:** max one inline placement in the generator flow. The generator
page's job is conversion to passes; the store link is a service for
non-builders, not a competing CTA. Watch GA (`gev('fce_store_click')` on these
links) — if store clicks eat pass conversions, demote to FAQ-only.

**Done when:** FAQ + schema entry live, one inline pathway live, clicks
instrumented.

**Depends on:** WS-A landing first is nice (entity context) but not required.

---

## WS-C — FCE.com side (delegated to the other chat)

**Goal:** editorial, natural backlinks from fatcityentertainment.com (which
already ranks top-10 for "music bingo card generator") to Gen 2, coordinated
with WS-A/WS-B so the two sites read as one family, not a link scheme.

**Hand-off prompt for the FCE chat — paste as-is:**

> I run fatcityentertainment.com (FCE) and bingocardgenerator.online ("Gen 2",
> our next-gen bingo card generator, also by Fat City Entertainment). Gen 2 is
> adding a footer credit "Made by Fat City Entertainment" linking to FCE, an
> Organization schema marking FCE as publisher (with sameAs both ways), and a
> small "pre-made games" pathway that sends non-builders to the FCE store.
> Your job is the FCE side, and it must complement — not mirror-spam — that:
>
> 1. On FCE's bingo generator page (/bingocardgenerator.html, which ranks for
>    "music bingo card generator"): add one editorial paragraph presenting Gen 2
>    as the newer, more powerful generator — link to
>    https://bingocardgenerator.online/ with a natural anchor like "our new
>    bingo card generator" (NOT the exact-match anchor "bingo card generator"
>    every time; vary it).
> 2. On the store / game-pack pages: one line noting buyers can also "make your
>    own custom cards with our free bingo card generator" → link Gen 2. This is
>    the reciprocal of Gen 2's "pre-made games" link to the store.
> 3. If FCE has schema or an about page: name Fat City Entertainment
>    consistently and add sameAs → bingocardgenerator.online, so both sites
>    declare the same parent entity.
> 4. Do NOT add sitewide footer/sidebar links to Gen 2 (over-optimization
>    risk). 2–4 well-placed editorial links total is the target.
> 5. Positioning guardrail: FCE may talk music bingo all it wants (that's its
>    niche), but describe Gen 2 as a general bingo card generator "great for
>    music bingo" — Gen 2's flagship positioning is the general tool.
>
> Deliverable: the edited pages/copy plus a one-line summary of each link you
> placed (URL, anchor text, page) so it can be cross-checked against the Gen 2
> side.

**Done when:** 2–4 editorial FCE→Gen 2 links live with varied anchors; entity
naming consistent; link inventory reported back.

---

## Measurement (both sides, 30–60 days)

- Google Search Console on Gen 2: impressions/position for "bingo card
  generator" (hub) and "music bingo card generator" / "pre-made music bingo"
  (spokes). Expect spoke movement first.
- GA events: `fce_store_click` (WS-B), referral sessions from
  fatcityentertainment.com.
- GEO spot-checks monthly: ask ChatGPT/Perplexity "best music bingo card
  generator" and "make bingo cards from a Spotify playlist" — goal is Gen 2 or
  FCE appearing in answers; note which sources they cite.

## Explicit non-goals (for now)

- No domain change (BingoCards.Pro registered defensively at most, parked).
- No music-bingo takeover of the homepage hero.
- No sitewide reciprocal footer links between the two domains.

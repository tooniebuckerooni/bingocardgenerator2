# Bingo Card Generator — Monetization Strategy

> Status: proposal for review. No code has been changed by this document.
> Primary goal: **get real users into Gen 2** (bingocardgenerator.online).
> Secondary goal: keep the legacy generator on fatcityentertainment.com running smoothly.

---

## 1. The verdict on the original idea

**Idea:** make the legacy generator (fatcityentertainment.com) the free version and put the *entire* new version (this repo / bingocardgenerator.online) behind payment.

**Verdict: right instinct, wrong lever — adopt it with one modification.**

- The **split is correct**: legacy becomes the free, top-of-funnel product; Gen 2 becomes the premium product you actually want to grow. Two products competing on the same "free vs paid" axis is confusing; giving each a clear job fixes that.
- A **hard paywall on Gen 2 is the wrong lever** given your #1 goal. If nothing on bingocardgenerator.online works without paying, cold search traffic (the blog targets teachers, party planners, and music-bingo hosts) bounces before experiencing the product. You'd be optimizing for a clean "premium" story at the direct expense of the metric you said matters most: real users inside Gen 2.
- **Modification: gate the deliverable, not the experience.** Let anyone design a card and see a full live preview on Gen 2. Free users can export a **single, watermarked card** so they feel the output quality. Everything that makes the tool *useful for running a real game* — clean (unwatermarked) exports, multi-card PDF, bulk ZIP, custom branding, unlimited cards — requires a license.

This merges the two paywall options you were torn between ("pay to export" + "watermarked freemium") into one model: **free to design + watermarked free export, pay for clean/bulk output.** Every visitor becomes a real Gen 2 user; payment is the natural moment they hit when they're ready to run their event.

### Why this beats a hard paywall (scored against "more real users in Gen 2")

| Model | Cold-traffic activation | Conversion trigger | SEO value retained | Risk |
|---|---|---|---|---|
| Hard paywall | Very low | None until they pay blind | Low (bounce) | High |
| **Design-free + watermark export (recommended)** | High | Hits at moment of real intent (needs clean cards for an event) | High | Low |
| Current 10-card freemium | Medium | Weak (10 free cards is enough for small events → no reason to pay) | High | Medium |

The current freemium leaks because **10 free clean cards is enough to actually run a small game** — there's no forcing function. Watermarking the free export removes that leak while keeping the funnel open.

---

## 2. North-star framing (how to score every decision)

Every choice below is scored against one question: **does it put more real users inside Gen 2, and move them toward paying once they're there?**

- Acquisition (get them in) is priority 1 → legacy free tool + SEO + email list all feed Gen 2.
- Activation (they design a card) should be frictionless → no login wall, no pre-payment wall.
- Conversion (they pay) should trigger at real intent → the export/clean-output moment.
- Legacy stability is priority 2 → do the minimum to keep it a smooth free funnel; don't over-invest.

---

## 3. Pricing rethink

### Current state
- Gen 2: **$24/mo** subscription (LemonSqueezy), justified by a monthly music-bingo game pack. Free tier capped at 10 cards.
- Legacy: one-time **"lifetime access"** purchase in the Fat City store.

### Market context
- **Bingo Baker** — ~$25 **one-time** for unlimited cards/printing. This is the anchor most of your buyers will compare against.
- **myfreebingocards.com** — freemium; free with limits, paid upgrade for larger runs.
- **Canva / templates** — effectively free for DIY.

**Implication:** $24/**month** is a hard sell for the *generator alone*, because the closest competitor is a one-time $25. The subscription only makes sense when it's clearly buying an ongoing service (the monthly game packs), not just tool access. Right now the two are bundled, so subscription-averse buyers (most teachers, party planners, one-off event hosts) have no way to buy.

### You have two distinct audiences
1. **Recurring hosts** (music-bingo/trivia hosts running weekly events) — want fresh content continuously. A subscription fits them.
2. **One-off / occasional users** (teachers, party/wedding/corporate planners) — want to make cards for *one* event. A subscription actively repels them; they want to pay once.

Serving both with a single $24/mo product means you're leaving the entire second audience unmonetized (or pushed to the free tier forever).

### Proposal: split into two products

| Product | Price | What it unlocks | Target |
|---|---|---|---|
| **Generator Pro (one-time)** | **$39–49 lifetime** | Unlimited cards, clean/unwatermarked exports, multi-card PDF, bulk ZIP, custom branding, all themes, free-space positioning | One-off users; anyone comparing to Bingo Baker's one-time price. Priced slightly above Bingo Baker because Gen 2 has more (themes, branding, Spotify import). |
| **Host Club (subscription)** | **$15–19/mo or $99/yr** | Everything in Generator Pro **+** the monthly ready-to-run music-bingo game pack + new packs as released | Recurring hosts who want done-for-you content |

Rationale:
- The **one-time tier is the acquisition workhorse** — it converts the large occasional audience and matches the price frame buyers already have. It directly serves goal #1.
- The **subscription drops from $24 to $15–19** because it should be priced as *content-as-a-service*, not tool-access. Lower monthly + an annual option reduces churn and sticker shock. Existing $24/mo subscribers get grandfathered (see §6).
- Anyone who buys Generator Pro is a warm lead for Host Club — offer an upgrade path (credit the one-time price toward the first year).

> Final numbers are a starting recommendation. If you want to keep it simplest: **$44 one-time Generator Pro + $99/yr Host Club** and retire standalone monthly billing.

---

## 4. Legacy site recommendation

**Make legacy free, gated behind a lightweight email capture. Do not keep it paid.**

- Priority #1 is Gen 2 acquisition. The legacy tool's best possible job is to be a **lead magnet**: free to use, but asks for an email first, and every page prominently links "Try the new generator →" to bingocardgenerator.online.
- "Keep it paid" loses because it starves the funnel — the whole point of the split is that legacy feeds Gen 2. A paid legacy product that competes with a freemium Gen 2 is the confusion you're trying to eliminate.
- **Existing lifetime buyers must be grandfathered** — they keep access, and they get a migration offer to Gen 2 (see §6). Turning a product they *paid for* into a free lead magnet without taking care of them is the one move that generates refund requests and bad will.

---

## 5. Delegable workstreams

Each workstream below is self-contained: it states its own goal, context, exact touchpoints, done-criteria, and dependencies, so it can be handed to a separate agent without the rest of this document. Priority tags reflect the goals (Gen 2 acquisition = P1, legacy = P2).

---

### WS-A — Gen 2 acquisition & funnel  **(Priority 1)**

**Goal:** maximize the number of cold visitors who reach a designed card and hit a natural upgrade moment.

**Context:** Gen 2 is a single static `index.html` (~2,060 lines) served via GitHub Pages at bingocardgenerator.online. Blog under `blog/` targets three audiences (music-bingo hosts, teachers, party/event planners). Google Analytics is wired (`G-97J4XBSHBW`, index.html:164-165). SEO/schema block at index.html:60-73 currently advertises a $0 free tier.

**Tasks:**
- Add GA events for the key funnel steps: card designed, export attempted, watermark shown, upgrade clicked, checkout started. Instrument in the export handlers (`index.html:1943-2025`).
- Add in-app upgrade moments at real-intent points: when a free user exports (watermark + "get clean cards" CTA), when they hit the card cap, when they try branding/free-space (existing `.pro-cover` overlays at index.html:619-623, 652-654).
- Update blog post CTAs (`blog/`) to drive into the designer with audience-specific hooks.
- Update SEO/schema (index.html:60-73) to reflect the new offer once pricing is set (coordinate with WS-B).

**Done when:** GA dashboard shows the full funnel; every free-tier limit has a contextual upgrade CTA; blog posts link into the designer.

**Depends on:** WS-B for final pricing copy/links (can start instrumentation in parallel).

---

### WS-B — Gen 2 paywall & pricing implementation  **(Priority 1)**

**Goal:** implement the "free to design + watermarked free export, pay for clean/bulk output" model and the new two-product pricing.

**Context:** Pro gating lives in `applyProLocks` (index.html:1037-1069); entitlement stored in localStorage key `fce_pro`; checkout via `goCheckout()` → LemonSqueezy URL (index.html:915, 1036). Export handlers at index.html:1943-2025 (PNG/PDF/ZIP via jsPDF + JSZip loaded from CDN).

**Tasks:**
- Change the free tier from "10 clean cards" to "unlimited design, single **watermarked** export." Add a watermark render path to the canvas export for non-Pro users; gate clean export, multi-card PDF, and bulk ZIP behind Pro.
- Create the two LemonSqueezy products (Generator Pro one-time; Host Club subscription) and wire `goCheckout()` to route to the correct product. Update the hardcoded checkout URL(s).
- Update on-page pricing copy and the JSON-LD Product/Offer schema (index.html:60-73) to the new prices.
- Coordinate with WS-C: entitlement check must be trustworthy before removing the clean-export leak.

**Done when:** a non-Pro user can only produce a watermarked single card; both products are purchasable and unlock clean/bulk exports; schema matches live pricing.

**Depends on:** WS-C (entitlement must be fail-closed for exports before this is secure); pricing decision from §3.

---

### WS-C — Licensing hardening  **(Priority 1, blocks secure launch)**

**Goal:** make the paywall actually hold, since a tighter model is only worth building if it can't be trivially bypassed.

**Context:** License verification calls an external **Cloudflare Worker** (`https://bcg-license-verify.dustinramsbottom.workers.dev`, index.html:916) whose source is **not in this repo**. Current weaknesses:
- Entitlement re-check **fails open** when the worker is unreachable (index.html:1031-1032) — offline = free Pro.
- Hardcoded bypass codes `FATCITY-PRO-2025` and `FCE-GEN2-PRO` are visible in page source (index.html:917).
- Entitlement is client-side localStorage (`fce_pro`), so exports can be unlocked from the console.

**Tasks:**
- Remove or rotate the hardcoded bypass codes; if beta access is still needed, move it server-side.
- Change export gating from **fail-open to fail-closed**: if entitlement can't be verified, exports stay watermarked rather than unlocking.
- Strongest option: move clean-export authorization server-side — have the Worker issue a short-lived signed token that the export path requires. If that's too heavy, document the accepted risk explicitly.

**Done when:** no bypass code unlocks Pro; an unverified/offline client cannot get a clean export; decision on server-side export tokens is recorded (implemented or consciously deferred).

**Depends on:** access to the Worker deployment (outside this repo).

---

### WS-D — Legacy site transition  **(Priority 2)**

**Goal:** convert fatcityentertainment.com's generator into a free, email-gated lead magnet that funnels to Gen 2, without harming existing buyers.

**Context:** Lives entirely outside this repo (Fat City site + store). Currently sold as "Bingo Card Generator Pro" with lifetime access (`/store/p65/bingocardgeneratorpro.html`). Store/product pages and the generator page (`/bingocardgenerator.html`) are the touchpoints.

**Tasks:**
- Put the legacy generator behind a lightweight email capture (feeds the same list Gen 2 marketing uses).
- Add prominent "Try the new generator →" CTAs on the generator page, store page, and relevant blog/tutorial pages.
- Retire or reframe the paid store listing (grandfather existing buyers — see WS-E). Redirect the old purchase CTA to either the free tool or a Gen 2 landing offer.

**Done when:** legacy generator is free behind email capture; every legacy touchpoint links to Gen 2; the paid listing no longer sells new lifetime licenses.

**Depends on:** WS-E comms should go out before/with the store change so existing buyers aren't surprised.

---

### WS-E — Comms & buyer migration  **(Priority 2)**

**Goal:** protect goodwill with people who already paid, and convert them into Gen 2 users/subscribers.

**Context:** Two groups to handle: (1) legacy **lifetime** buyers (Fat City store), (2) current **$24/mo** Gen 2 subscribers. Refund policy is in `refund.html` (this repo) and the Fat City store terms.

**Tasks:**
- Email legacy lifetime buyers: they keep legacy access, plus a migration offer to Gen 2 (e.g. free Generator Pro or discounted Host Club year). Frame the legacy tool going free as "we're making it free for everyone; here's your thank-you upgrade."
- Email current $24/mo subscribers: grandfather their price or move them to Host Club at the new lower rate; make sure the monthly game pack promise is honored either way.
- Check `refund.html` and store terms for anything that constrains changing/retiring a "lifetime" product; adjust copy if needed.

**Done when:** both buyer groups have been contacted with a concrete offer; no one who paid loses access; refund/terms reviewed for consistency.

**Depends on:** pricing (§3) and legacy plan (WS-D) finalized.

---

## 6. Sequencing, risks, rollback

### Suggested order
1. **WS-C (harden licensing)** first — nothing else is safe to gate until entitlement holds.
2. **WS-B (paywall + pricing)** — implement the model and products once C is trustworthy.
3. **WS-A (funnel/instrumentation)** — in parallel with B; instrumentation can start immediately.
4. **WS-E (comms)** — before flipping legacy, so buyers are prepped.
5. **WS-D (legacy transition)** — last, once Gen 2 is the clearly-better paid destination.

### Risks
- **Cannibalization:** a good free legacy tool could satisfy users who'd otherwise pay for Gen 2. Mitigate by keeping legacy deliberately basic and always pointing "up" to Gen 2.
- **Subscriber churn:** moving $24/mo users to a new structure risks cancellations. Grandfather aggressively; the game pack is the retention anchor.
- **Watermark backlash:** if the watermark is obnoxious, it reads as user-hostile. Keep it tasteful (footer mark, not across the faces) so free output is still shareable.
- **Bypass exposure:** until WS-C ships, assume the paywall is porous; don't announce a "premium" repositioning before it's real.

### What to measure (first 30 days)
- Export-paywall hit rate (designs → export attempts → upgrade clicks).
- Free→paid conversion by product (one-time vs subscription).
- Email capture rate on legacy and list→Gen 2 click-through.
- Subscriber retention through the pricing change.

### Rollback position
Every change is reversible: re-raise the free tier's card cap, drop the watermark, re-enable the legacy paid listing. If 30-day conversion drops without an offsetting rise in Gen 2 activation, revert to the current freemium and keep only the pricing split (one-time + subscription), which is the lowest-risk win here.

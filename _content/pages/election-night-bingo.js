// "election night bingo" — US midterms, Tuesday 3 November 2026. Built
// 2026-10-26 with Fat City Entertainment (fat-city-entertainment ELECTION-PLAN.md).
//
// Different from the three load-and-go games: the headline feature is a card
// you PLAY ON YOUR PHONE and share (play-card.js, data in play/election-night.json),
// because election night is watched on a couch, not run from a printer. The
// starter below is the second path, for a host printing a stack for a party.
//
// Non-partisan by rule: broadcast moments only. No candidate, party or
// officeholder names, nothing that depends on who wins, no voting logistics.
// Navy, cream and gold, never one party's colour.
//
// Starter: 25 squares on a 5 x 5 with the free space ON. The free centre is the
// tradition people expect, and with 25 lines the generator leaves a different
// one out of each card, which is variety rather than a bug (see the skill's
// free-space rule: this is the deliberate case).
//
// Not in GAMES or NAV_GROUPS: it is seasonal. After election week it stays live
// as an evergreen page for 2027 locals and 2028; no takedown needed.
module.exports = {
  slug: "election-night-bingo",
  title: "Election Night Bingo: Free Card to Play on Your Phone | US Midterms 2026",
  description:
    "Free election night bingo for the US midterms. Get your own card on your phone, tap squares as the results come in, and share it. Non-partisan.",
  ogDescription:
    "Everyone who opens the link gets their own free card. Tap squares as the broadcast happens, share it when you hit BINGO. No parties, no candidates.",
  ogImage: "images/election-night-bingo-og.png",
  breadcrumb: "Election Night Bingo",
  eyebrow: "US Midterms · Tuesday, 3 November",
  h1: "Election Night Bingo",
  answer:
    "That's your free card, and it's yours alone: <strong>everyone who opens this page gets a different one.</strong> Tap a square when it happens on the broadcast, shout when you fill a line, then share your card. Every square is something that happens on every results night. No candidates, no parties, nothing that depends on who wins.",
  heroCta: "Printing for a party? Load all 25 squares →",
  chips: ["Watch parties", "Bars and pubs", "Dorms and group chats", "Classrooms", "Newsrooms", "Works whoever you're rooting for"],
  faqHeading: "Election night bingo FAQ",
  play: "/play/election-night.json",

  starter: {
    h: "Hosting a watch party? Print a stack",
    lede: "The same squares, ready for the generator, so you can print a different card for everyone in the room. Swap in a square for your own crowd if you like.",
    titlePlaceholder: "e.g. Election Night at The Rusty Anchor",
    titleValue: "Election Night Bingo",
    squaresPlaceholder: "One square per line.",
    prefill: "Someone says \"too early to call\"\nA network projects a winner\nThe touchscreen map gets zoomed in\n\"Bellwether county\"\nExit poll numbers\nA concession speech\nA victory speech runs long\n\"Too close to call\"\nSomeone mentions a recount\nMail-in ballots still being counted\n\"Record turnout\"\nA swing state graphic\nThe anchor checks a laptop on air\n\"Path to 218\"\nA long line at a polling place\nAn \"I Voted\" sticker on screen\nSplit screen of two headquarters\nBalloons or confetti on standby\n\"Decision Desk\"\nA precinct \"still out\"\nSomeone says \"historic\"\nThe Senate balance graphic\nA live shot from a county clerk's office\nCoverage goes past midnight\nA reporter outside in the cold",
    grid: [5, 5],
    ctaHandoff: true,
    note: "Nothing is sent anywhere. The list is held in this browser and handed to the generator when you continue.",
  },

  howto: {
    name: "How to Play Election Night Bingo",
    description: "Open the page, get your own card, mark squares as the broadcast happens, and share it.",
    step: [
      { name: "Get your card", text: "Open the page on your phone. Your card is dealt automatically, different from everyone else's, and it stays the same if you refresh." },
      { name: "Mark squares as they happen", text: "Tap a square when it happens on the broadcast. A full row, column or diagonal is BINGO." },
      { name: "Share it", text: "Tap Share my card to send a picture of your card to your story or group chat, with the link so your friends can get their own." },
    ],
  },

  body: `
    <p>Election night is long. The polls close, the maps light up, and then everyone watches an anchor tap a touchscreen for four hours. A bingo card gives the room something to do together besides refresh their phones, and it works whoever you're rooting for, because none of the squares care who wins.</p>

    <h2>Why Every Square Is About the Broadcast</h2>
    <p>"Too close to call." The giant map. A victory speech that runs long. These happen on every channel, every election, so a card full of them fills up at the same pace no matter what the results are. There are no candidate names, no party colours and no predictions anywhere on it. Bring it to a room with mixed politics and it still works, which is the whole point of a party game.</p>

    <h2>Share Your Card</h2>
    <p>The Share button turns your card, marks and all, into a story-sized picture with the link on it. On a phone it opens your share sheet, so it goes straight to your Instagram or TikTok story, Facebook, or a group chat. Your friends tap the link and get their own card. Hit BINGO and the picture says so.</p>

    <div class="note">
      <p><strong>Running a blog or a newsroom live page?</strong> Open "Put this playable card on your own site" under the card for an embed code. Each of your readers gets their own card too.</p>
    </div>

    <h2>Hosting a Watch Party</h2>
    <p>Phones are the easy way, but a printed card on the coffee table is half the fun. Use the starter below to load all 25 squares into the generator and print a different card for each guest. Small prizes help: a line wins first pick of the snacks, a full card wins the remote.</p>
  `,

  faq: [
    { q: "Is election night bingo free?",
      a: "Yes. Your card on this page is free, there's no account and nothing to download. Open the page and play." },
    { q: "Does everyone get the same card?",
      a: "No. Every phone gets its own card, dealt from a pool of 30 squares, so the people in the room fill different lines at different times. Refreshing keeps your card; Deal me a new card swaps it." },
    { q: "Is it partisan?",
      a: "No. Every square is a moment from the broadcast itself: projections, maps, speeches, the anchor's laptop. There are no candidate names, no party colours, and nothing that depends on who wins." },
    { q: "How do I share it to my Instagram or TikTok story?",
      a: "Tap Share my card on your phone and pick Instagram, TikTok or any app from the share sheet. If your browser can't share pictures, the card saves to your photos instead, ready to post." },
    { q: "Can I print cards for a watch party?",
      a: "Yes. Use the starter on this page to load all 25 squares into the generator, set how many cards you need, and print a different one for each guest." },
    { q: "When is election night?",
      a: "The US midterm elections are on Tuesday, 3 November 2026. Results coverage usually runs from early evening Eastern time until well past midnight." },
  ],

  closing: {
    h: "Print a Stack for Your Watch Party",
    p: "All 25 squares, one click away in the generator. Free to start, no account needed.",
    cta: "Open the Generator with the Squares Loaded →",
  },
};

// "thanksgiving bingo card": a free card you PLAY ON YOUR PHONE at the table
// (play-card.js, data in play/thanksgiving.json), built 6 Nov 2026 with Fat City
// Entertainment on the Election Night engine. The starter below is the second
// path, for a host printing a stack.
//
// Different job from /blog/thanksgiving-bingo.html, which is the article about
// running a Thanksgiving bingo game: this page IS the game. The post links here;
// the slug ends in -card so the two never compete for the same query.
//
// Family table moments only (see the JSON's _rules): nothing political, nothing
// that teases a guest, no brand or parade names. Harvest rust and cream.
//
// Not in GAMES or NAV_GROUPS: it is seasonal, like election-night-bingo.js.
// No dates in the copy, so it stays true every November.
module.exports = {
  slug: "thanksgiving-bingo-card",
  title: "Thanksgiving Bingo: Free Card to Play on Your Phone at the Table",
  description:
    "Free Thanksgiving bingo you play on your phone. Everyone at the table gets their own card. Tap squares as dinner happens, then share it. No download.",
  ogDescription:
    "Everyone who opens the link gets their own free card. Tap a square when it happens at dinner and share your card when you hit BINGO.",
  ogImage: "images/thanksgiving-bingo-og.png",
  breadcrumb: "Thanksgiving Bingo",
  eyebrow: "Thanksgiving · Free · The whole table",
  h1: "Thanksgiving Bingo",
  answer:
    "That's your free card, and it's yours alone: <strong>everyone who opens this page gets a different one.</strong> Tap a square when it happens at dinner, shout when you fill a line, then share your card. Every square is something that happens at most Thanksgiving tables, whatever is on the menu.",
  heroCta: "Printing for the table? Load all 25 squares →",
  chips: ["Family dinner", "Friendsgiving", "The kids' table", "Office potlucks", "Group chats", "Grandparents on FaceTime"],
  faqHeading: "Thanksgiving bingo FAQ",
  play: "/play/thanksgiving.json",

  starter: {
    h: "Hosting dinner? Print a card for every seat",
    lede: "The same squares, ready for the generator, so every guest gets a different card. Swap in a square only your family would get.",
    titlePlaceholder: "e.g. Thanksgiving at Grandma's",
    titleValue: "Thanksgiving Bingo",
    squaresPlaceholder: "One square per line.",
    prefill: "Someone says \"I'm so full\"\nFootball on in the background\nThe parade is on TV\nSomeone asks for the recipe\nA kid sneaks a roll\nGrace runs long\n\"What are you thankful for?\"\nSomeone naps on the couch\nTwo kinds of pie\nSomeone unbuttons their pants\nA dish is still in the oven\nSomebody brings store-bought\nThe kids' table is mentioned\nLeftover containers come out\n\"Pass the gravy\"\nA group photo is taken\nThe dog gets a scrap\nSomeone is running late\nA baby photo comes out\nCranberry from a can\nSomeone FaceTimes in\nBlack Friday plans come up\nSomeone says \"just a sliver\"\nSeconds before the pie\nBoard games come out",
    grid: [5, 5],
    ctaHandoff: true,
    note: "Nothing is sent anywhere. The list is held in this browser and handed to the generator when you continue.",
  },

  howto: {
    name: "How to Play Thanksgiving Bingo",
    description: "Open the page, get your own card, mark squares as dinner happens, and share it.",
    step: [
      { name: "Get your card", text: "Open the page on your phone. Your card is dealt automatically, different from everyone else's, and it stays the same if you refresh." },
      { name: "Mark squares as they happen", text: "Tap a square when it happens at the table. A full row, column or diagonal is BINGO." },
      { name: "Share it", text: "Tap Share my card to send a picture of your card to your story or the family group chat, with the link so everyone can get their own." },
    ],
  },

  body: `
    <p>Thanksgiving dinner runs on the same moments every year. Somebody is running late, grace goes long, the pie debate starts before the plates are cleared. A bingo card turns all of it into a game the whole table can play, from the kids' table to the grandparents dialling in on video.</p>

    <h2>A Card for Every Seat</h2>
    <p>Send the link to the family group chat before dinner. Everyone who opens it gets their own card, dealt from a pool of 30 squares, so people fill different lines at different times and nobody wins on the same square. No account, no app, nothing to print.</p>

    <h2>Share Your Card</h2>
    <p>The Share button turns your card, marks and all, into a story-sized picture with the link on it. On a phone it opens your share sheet, so it goes straight to your Instagram or TikTok story, Facebook, or a group chat. Hit BINGO and the picture says so.</p>

    <div class="note">
      <p><strong>Want a quiz after the pie?</strong> Fat City Entertainment has a <a href="https://www.fatcityentertainment.com/trivia-show-maker/?round=thanksgiving&amp;utm_source=bingocardgenerator&amp;utm_medium=referral&amp;utm_campaign=thanksgiving-2026">free 10-question Thanksgiving trivia round</a> that opens ready to print.</p>
    </div>

    <h2>Hosting Dinner</h2>
    <p>Phones are the easy way, but a printed card at each place setting is a nice touch. Use the starter below to load 25 squares into the generator and print a different card for each guest. Small prizes help: a line wins first slice of pie, a full card gets out of doing the dishes.</p>
  `,

  faq: [
    { q: "Is Thanksgiving bingo free?",
      a: "Yes. Your card on this page is free, with no account and nothing to download. Open the page and play." },
    { q: "Does everyone get the same card?",
      a: "No. Every phone gets its own card, dealt from a pool of 30 squares, so people fill different lines at different times. Refreshing keeps your card; Deal me a new card swaps it." },
    { q: "Is it OK for kids?",
      a: "Yes. Every square is an ordinary dinner moment, like the parade on TV, a second slice of pie or the dog getting a scrap. Nothing political and nothing that pokes fun at a guest." },
    { q: "How do I share it to my Instagram or TikTok story?",
      a: "Tap Share my card on your phone and pick Instagram, TikTok or any app from the share sheet. If your browser can't share pictures, the card saves to your photos instead, ready to post." },
    { q: "Can I print cards for the table?",
      a: "Yes. Use the starter on this page to load 25 squares into the generator, set how many cards you need, and print a different one for each guest." },
    { q: "Does it work for Friendsgiving?",
      a: "Yes. Every square happens at a Friendsgiving as easily as a family dinner, and the group chat link works the same way." },
  ],

  closing: {
    h: "Print a Card for Every Seat",
    p: "25 squares, one click away in the generator. Free to start, no account needed.",
    cta: "Open the Generator with the Squares Loaded →",
  },
};

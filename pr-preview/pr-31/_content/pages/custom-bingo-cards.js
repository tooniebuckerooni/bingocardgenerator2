// "custom bingo cards" — the personalization cluster.
// Search Console: the cluster is ~310 impressions at an average position near 55,
// the best non-blog cluster on the site. "personalized bingo cards" (pos 44.5),
// "custom made bingo cards" (46.5) and "customizable bingo cards" (50.9) rank
// better than the head term and had no page speaking to them.
module.exports = {
  slug: "custom-bingo-cards",
  title: "Custom Bingo Cards for Any Occasion | Free to Try",
  description:
    "Design custom bingo cards for classrooms, weddings, parties, and corporate events — your words, your theme, your rules. Free to try; print or share a link.",
  ogDescription:
    "Personalized bingo cards built from your own words, for the exact room you're running. Free to start — print instantly or share digital cards online.",
  breadcrumb: "Custom Bingo Cards",
  eyebrow: "Custom Bingo Cards",
  h1: "Custom Bingo Cards for Your Classroom, Party, or Event",
  answer:
    "To make custom bingo cards: <strong>type your own words, phrases, or questions into the square list, pick a look, and the generator builds a unique randomized card for every player</strong> — ready to print or share online in minutes. No templates to work around, no design skills, no account.",
  heroCta: "Make Custom Cards →",
  chips: ["Classrooms", "Parties", "Weddings", "Corporate Events", "Fundraisers", "…or anything you can imagine"],
  faqHeading: "Custom bingo cards FAQ",

  starter: {
    h: "Start your card here",
    lede: "Type your squares now and open the generator with them already loaded — pick the look and download on the next screen.",
    titlePlaceholder: "e.g. Ms. Rivera's Unit 4 Review",
    squaresPlaceholder:
      "One square per line.\n\nphotosynthesis\nchlorophyll\nstomata\nxylem\nphloem\n\nMinimum 25 squares.",
    note: "Nothing is sent anywhere — your list is held in this browser and handed to the generator when you continue.",
  },

  howto: {
    name: "How to Make Custom Bingo Cards",
    description:
      "Type your own squares, personalize the look, then print a set or share digital cards.",
    step: [
      { name: "Type your list", text: "Type at least 25 words, phrases, or questions specific to your classroom, party, or event." },
      { name: "Personalize the look", text: "Pick a card size, a font, a colour theme or your own custom colours, and a card title. Matching the cards to a wedding palette or a company brand costs nothing. A Pro pass also prints your logo or two lines of your own branding on every card." },
      { name: "Download or share", text: "Get a print-ready PDF, a ZIP of card images, or individual shareable links players open on their phones." },
    ],
  },

  body: `
    <p>A custom bingo card is a card built from <em>your</em> content instead of a pre-made template — your words, your theme, your look. Instead of bending a classroom lesson or a wedding reception to fit somebody else's squares, you build the card around what is actually happening in the room.</p>

    <h2>What Makes a Bingo Card "Custom"</h2>
    <p>Template bingo cards arrive pre-filled with generic numbers or words you can't change. A custom card starts from a blank list: you type at least 25 words, phrases, or trivia questions — vocabulary terms, inside jokes, song titles, sponsor names, whatever the event actually needs — and the generator turns that list into a full set of randomized cards. No two players get the same arrangement, and every square is something you chose.</p>
    <p>"Custom" also covers how the card looks. Pick one of five card fonts, a color theme, and a card title; a Pro pass adds your logo, or two lines of your own text, to every card in the set. The content is what makes it <strong>yours</strong>; the styling is what makes it look finished.</p>
    <div class="note">
      <p><strong>You need 25 things to say.</strong> That is the real constraint — not the software. Twenty-five vocabulary terms is a unit; twenty-five wedding prompts is an afternoon's thinking. Everything below is about finding those twenty-five for the room you're actually in.</p>
    </div>

    <h2>Custom Bingo Cards for Every Occasion</h2>
    <p>The same generator adapts to whatever you're running. Here is what "custom" actually looks like for the events people build cards for most — including the squares themselves, because that is the part that takes the longest.</p>

    <h3>Classrooms</h3>
    <p>Vocabulary review, math facts, historical dates, science terms, a Friday filler, or something a substitute can run without prep. Type the term list once and every student gets a different card, so nobody can play by copying their neighbour.</p>
    <div class="gcard">
      <h4>Example squares — Grade 5 life science</h4>
      <p>photosynthesis · chlorophyll · stomata · xylem · phloem · cell wall · vacuole · mitochondria · osmosis · germination · pollination · chloroplast · transpiration · nucleus · membrane · producer · consumer · decomposer · food chain · habitat</p>
    </div>
    <p>For unit-review formats, grading-free ways to run it, and the word-count mistakes that make a class set repetitive, see our <a href="/blog/bingo-for-teachers-classroom-ideas.html">classroom bingo guide</a>.</p>

    <h3>Weddings &amp; Showers</h3>
    <p>Two approaches work, and which one fits depends on whether your guests already know each other. For a room full of strangers, "find someone who…" prompts get people talking. For a room that mostly knows the couple, squares that riff on their history land better. Print landscape and you get two cards per sheet — a table-card format guests can fill in over cocktail hour.</p>
    <div class="gcard">
      <h4>Example squares — reception mingling</h4>
      <p>knew the couple before they dated · has been to three weddings this year · caught a bouquet · flew in from another province · went to school with the bride · cried during the vows · is wearing borrowed shoes · has a photo of the couple on their phone</p>
    </div>
    <p>More prompt examples, plus formats for showers and engagement parties, are in our <a href="/blog/bingo-night-ideas-parties-weddings-corporate-events.html">wedding and event bingo ideas</a>.</p>

    <h3>Corporate Events &amp; Team Building</h3>
    <p>Onboarding weeks, conference icebreakers, offsites, and holiday parties all work the same way, and the trick is the same each time: use things specific to <em>your</em> company rather than generic office jargon. That is the difference between a card people recognize and one they have already seen on the internet. Add your logo with a Pro pass and the set looks like it belongs to the company. (For the meeting-bingo version — one shared board on the projector — see the <a href="/bingo-board-generator.html">bingo board generator</a>.)</p>
    <div class="gcard">
      <h4>Example squares — new-hire onboarding week</h4>
      <p>found the good coffee machine · learned an acronym nobody expanded · met someone from a team you'll never work with · badge didn't work on the first try · sat in on a meeting you didn't need · got added to a channel with 400 people · finally matched a face to a Slack avatar</p>
    </div>

    <h3>Fundraisers &amp; Community Events</h3>
    <p>Sponsor names, silent-auction items, or theme-night terms turn a card into a subtle sponsor shout-out or a scavenger-hunt-style mixer — without needing a designer to lay it out. Galas, church socials, school fun nights, and legion fundraisers all run on the same set.</p>

    <h3>Anything Else</h3>
    <p>If it can be reduced to a list of short items — 25 for a classic 5×5, or as few as 9 if you pick a 3×3 — it can be a custom bingo card: book clubs, family reunions, conference booths, gym challenges, road trips, a season finale watch party. There is no fixed category list to work around.</p>

    <h2>How to Make Your Custom Cards</h2>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><div class="step-body"><strong>Type your list.</strong> At least 25 words, phrases, or questions specific to your classroom, party, or event.</div></div>
      <div class="step"><div class="step-num">2</div><div class="step-body"><strong>Personalize the look.</strong> Pick a font, a color theme, and a card title. On a Pro pass, add your logo — or two lines of your own text, so a host can print the venue on one line and "Every Thursday · 8pm" on the next.</div></div>
      <div class="step"><div class="step-num">3</div><div class="step-body"><strong>Hand them out.</strong> Print the set, or send every player their own link. Whichever you pick, each person's card is shuffled separately.</div></div>
    </div>
    <p>Want the full walkthrough — every setting, screen by screen? See the <a href="/bingo-card-maker.html">bingo card maker guide</a>.</p>

    <h2>Digital or Printable — Your Choice</h2>
    <p>You do not have to decide up front. One square list produces both a printable set and a shareable one, which is what a hybrid event needs — half the room holding paper, half opening a link on their phone. A class that turns into a snow day, a reception that moves indoors: the same build covers it.</p>
    <p>Designing and previewing costs nothing either way, and the free download is watermarked rather than blocked, so you can run a test page on your own printer before paying for anything. <a href="/">Plans and current pricing are on the homepage.</a></p>

    <div class="tip">
      <p><strong>We run these games ourselves.</strong> Our parent company, Fat City Entertainment, hosts bingo and trivia nights in front of live audiences every week. The customization here — branding, themes, free-space placement, the landscape cut line — comes from what actually holds up in a room, not from a features checklist.</p>
    </div>

    <h2>More Ways to Build a Set</h2>
    <ul>
      <li>Want the mechanics in depth — every font, theme, and toggle? See the <a href="/bingo-card-maker.html">bingo card maker</a>.</li>
      <li>Running it from a phone with no printer in sight? See the <a href="/online-bingo-generator.html">online bingo generator</a>.</li>
      <li>Building one shared board for a meeting or a watch party instead of a stack? See the <a href="/bingo-board-generator.html">bingo board generator</a>.</li>
      <li>Squares coming from a playlist rather than a word list? Use the <a href="/music-bingo-generator.html">music bingo generator</a>.</li>
    </ul>`,

  faq: [
    { q: "What are custom bingo cards?",
      a: "Custom bingo cards are bingo cards filled with your own words, phrases, or theme instead of standard numbers — built for a specific classroom, party, team, or event rather than a generic template." },
    { q: "How do I personalize bingo cards for a classroom, wedding, or work event?",
      a: "Type your own squares — vocabulary terms, guest-mingling prompts, company-specific terms, whatever fits the room — then choose a font, color theme, and card title. A Pro pass also adds a logo or two lines of your own branding text to every card." },
    { q: "Can I add my own logo or branding to custom cards?",
      a: "Yes, with a Pro pass. Upload a logo and it prints on every card in a branding strip, or type two lines of your own text instead — a title on the first line and anything you want to promote on the second. Squares themselves are text, so photos per square aren't supported." },
    { q: "Is making custom bingo cards free?",
      a: "You can build a whole set, preview it, and download it without paying — the free download carries a demo watermark, which is enough to check spelling and font size on a test page before an event. A pass removes the watermark and unlocks custom branding; current plans are on the homepage." },
    { q: "What's the difference between custom and template bingo cards?",
      a: "Template cards use pre-filled words you can't change. A custom bingo card generator lets you enter your own words, phrases, or theme instead, so every card matches your exact classroom, party, or event." },
    { q: "How many personalized cards can I make from one list?",
      a: "Up to 999 per batch. Every one is shuffled separately, so a class of thirty or a reception of two hundred can all play without duplicates. The lever on how varied they feel is your list length: the floor is however many squares your grid has — 25 for a 5×5, 9 for a 3×3 — and going well past it makes a large batch look far less repetitive." },
    { q: "Can I make digital custom bingo cards, not just printable ones?",
      a: "Yes. Switch to Share Online and every custom card gets its own link players open on a phone or laptop — no printing required." },
  ],

  closing: {
    h: "Make Your Custom Cards",
    p: "Free to start. Print or share online. No account needed.",
    cta: "Create Cards Now →",
  },
};

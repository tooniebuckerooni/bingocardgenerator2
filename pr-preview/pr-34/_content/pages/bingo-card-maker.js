// "bingo card maker" — the making/craft angle: hands-on control over every part
// of the card. Search Console: the maker/creator cluster is ~352 impressions but
// the worst-positioned on the site (head term at 83.0). It also picks up "bingo
// sheet maker" and "bingo sheet creator" (34 impressions), a synonym pair no
// page on the site had ever used.
module.exports = {
  slug: "bingo-card-maker",
  title: "Bingo Card Maker | Build Custom Bingo Cards Free",
  description:
    "Free bingo card maker: type your own words, pick fonts and colors, set the layout, and generate bingo cards to print or share online. No login needed.",
  ogDescription:
    "A bingo card maker with the controls in your hands — your words, your fonts, your colors, your layout. Free to start, no account required.",
  breadcrumb: "Bingo Card Maker",
  eyebrow: "Bingo Card Maker",
  h1: "Bingo Card Maker — Build Cards That Are Actually Yours",
  answer:
    "To make a bingo card with this bingo card maker: <strong>type your own squares, choose a font, a color theme, and a layout, then download a print-ready PDF or share digital cards online</strong>. No templates to work around, no design software, no account required.",
  heroCta: "Start Making Cards →",
  chips: ["Your words", "Your fonts", "Your colors", "Your layout", "Your branding", "…all in one grid"],
  faqHeading: "Bingo card maker FAQ",

  starter: {
    h: "Start making here",
    lede: "Type your squares now and the maker opens with them already in place — every font, color, and layout control is on the next screen.",
    titlePlaceholder: "e.g. Friday Night Bingo",
    squaresPlaceholder:
      "One square per line.\n\nDon't Stop Believin'\nSweet Caroline\nMr. Brightside\nAfrica\nDancing Queen\n\nMinimum 25 squares.",
    note: "Stays on your device. We don't have an account to put it in.",
  },

  howto: {
    name: "How to make a bingo card with a bingo card maker",
    description:
      "Type your own squares, pick a font, color theme, and layout, then download or share your bingo cards.",
    step: [
      { name: "Type or paste your squares", text: "Add at least 25 words, phrases, or trivia questions to the square list — there is no pre-written template to work around." },
      { name: "Choose a font and color theme", text: "Pick one of five card fonts and a colour theme — the ink-saving Eco Print default, four colour presets that still print well, or set your own colours — then set the cell font size." },
      { name: "Set the layout and the extras", text: "Decide whether there is a free space and where it sits, toggle the B-I-N-G-O header row, and choose portrait or landscape." },
      { name: "Download or share your cards", text: "Generate a print-ready PDF, a ZIP of card images, or one link per player. Set the count to 1 for a single card or up to 999 for a full room." },
    ],
  },

  body: `
    <p>A bingo card maker is not a template picker. It is a blank grid — 5×5 by default, or anything from 2 to 8 squares a side, set independently, so it does not have to be square — and a set of controls: you bring the content, and the generator handles the grid, the randomization, and the print formatting. Every part of the card that can be set, you set.</p>

    <h2>How to Make a Bingo Card From Scratch</h2>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><div class="step-body"><strong>Type or paste your squares.</strong> At least 25 words, phrases, or trivia questions. Nothing is pre-filled, and nothing is off limits — the maker doesn't care whether your squares are song titles, vocabulary words, or things your manager says.</div></div>
      <div class="step"><div class="step-num">2</div><div class="step-body"><strong>Choose a font and color theme.</strong> Five card fonts, five colour themes plus your own custom colours, and a cell font size from 6pt to 22pt. Long entries auto-hyphenate so they still fit the square instead of overflowing it.</div></div>
      <div class="step"><div class="step-num">3</div><div class="step-body"><strong>Set the layout and the extras.</strong> Free space on or off, centred or randomly placed; the B-I-N-G-O header row on or off; portrait for one card a page or landscape for two with a cut line.</div></div>
      <div class="step"><div class="step-num">4</div><div class="step-body"><strong>Download or share.</strong> A print-ready PDF, a ZIP of card images, or a link per player. Set the count to 1 for a single card or up to 999 for a full room.</div></div>
    </div>
    <div class="note">
      <p><strong>Minimum 25 squares for a 5×5 card.</strong> A 5×5 card needs 25 items to fill it; a smaller grid needs fewer and a larger one needs more, and the counter under the square list always shows the number for the size you picked. Add more than the minimum and the randomizer draws from a bigger pool, which cuts repetition across a large batch — the single biggest thing that makes a class set or a bar night feel varied.</p>
    </div>

    <h2>Every Piece of the Card Is Yours to Set</h2>
    <p>This is the difference between a maker and a template: nothing is locked.</p>
    <div class="grid">
      <div class="gcard">
        <h3>Your words, not somebody else's list</h3>
        <p>Squares come from you — vocabulary terms, inside jokes, trivia questions, song titles, whatever the room needs. There is no fixed word bank to work around and nothing pre-filled to delete first.</p>
      </div>
      <div class="gcard">
        <h3>Five fonts, five different moods</h3>
        <p>Oswald, Playfair Display, Fredoka One, Righteous, or a clean monospace. Font size runs 6pt to 22pt, and long entries auto-hyphenate rather than spilling out of the square.</p>
      </div>
      <div class="gcard">
        <h3>Color themes for print or for screens</h3>
        <p>Eco Print is the default: black and white, minimal ink, built for running off a stack. Elite, Classroom, Celebration and Retro add colour while still printing sensibly — there is no dark theme to burn through a cartridge by accident. Or pick Custom and set the background, square text, title bar, title text and free space yourself; the picker measures the contrast as you go so the words stay readable.</p>
      </div>
      <div class="gcard">
        <h3>Free space, header row, and the small stuff</h3>
        <p>Decide whether there is a free space and whether it sits centred or lands somewhere random, and turn the B-I-N-G-O header row off entirely, which matters more than it sounds: the letters are wrong the moment your squares are predictions, buzzwords, or vocabulary rather than a bingo game.</p>
      </div>
    </div>
    <p>On a Pro pass you can also print your own branding on every card: upload a logo, or type two lines of text — a venue or host name on the first, and whatever you want to promote on the second, like <em>Every Thursday · 8pm · $5 a card</em>.</p>

    <h2>Bingo Sheet Maker, Bingo Card Creator, Same Thing</h2>
    <p>Sheet, card, board, creator, maker — people search all of these and mean roughly one thing, so it is worth saying plainly that this tool produces a single artefact: a printable grid filled with your content, 5×5 and 25 squares unless you pick another size. Whichever word brought you here, the file you download is the same one.</p>
    <p>The words do carry a hint about use, though. "Sheet" usually means a page handed out to a class or a table; "card" usually means one of a stack, one per player. If you meant the third sense — one shared board on a screen for a meeting or a watch party — the <a href="/bingo-board-generator.html">bingo board generator</a> is the page for that.</p>

    <h2>One Maker, Any List You Bring</h2>
    <p>The same maker builds cards for classrooms, office parties, weddings, and full music bingo nights — the only thing that changes is what goes in the square list. Planning around a specific occasion? See <a href="/custom-bingo-cards.html">custom bingo cards</a> for example squares by event. Working from a playlist instead of a word list? The <a href="/music-bingo-generator.html">music bingo generator</a> handles the playlist import. Need it to work on a phone with nothing installed? That's the <a href="/online-bingo-generator.html">online bingo generator</a>.</p>
    <div class="tip">
      <p><strong>Built by people who host these nights.</strong> Fat City Entertainment runs music bingo and trivia in front of live audiences every week. The fonts, the themes, the landscape cut line, the ink-saving default — each one exists because of something that went wrong in a room first.</p>
    </div>
    <p>For classroom-specific ideas, see our guide to <a href="/blog/bingo-for-teachers-classroom-ideas.html">classroom bingo</a>; for parties and events, see <a href="/blog/bingo-night-ideas-parties-weddings-corporate-events.html">bingo night ideas for parties, weddings and corporate events</a>.</p>

    <h2>Print It, Share It, or Both</h2>
    <p>The layout choice is the last control, and it is really a question about scissors. Portrait gives one full-size card to a page — the right call for a classroom set where the cards get handed out as they are. Landscape puts two to a page with a cut line down the middle, which halves your paper and costs you one pass with a guillotine. Or skip paper: Share Online gives each player a link to open on their own phone.</p>
    <p>Free exports carry a small demo watermark. A pass clears it and unlocks branding — <a href="/">pricing is on the homepage</a>.</p>`,

  faq: [
    { q: "Is this bingo card maker free to use?",
      a: "Making a card is free — writing your squares, choosing a font and color theme, setting the layout, and previewing the result all cost nothing. Downloads carry a small demo watermark until you activate a Day Pass, Monthly, or Annual pass, which unlock clean PDF, PNG, ZIP, and share-link downloads plus custom branding." },
    { q: "Can I write my own words instead of using a template?",
      a: "Yes — that is the whole point of a maker rather than a template. Type at least 25 words, phrases, trivia questions, or anything else into the square list and the generator turns your list into randomized 5×5 cards, or whatever grid size you choose. Nothing is pre-filled for you." },
    { q: "Can I add my own logo or images to the cards?",
      a: "You can add a logo or two lines of your own text on a Pro pass, and it prints in a branding strip above or below the card grid. Each square itself is text rather than an image slot, so photos per square aren't supported — your fonts, colors, and logo carry the branding." },
    { q: "What fonts and colors can I choose from?",
      a: "Five card fonts — Oswald, Playfair Display, Fredoka One, Righteous, or a monospace style — and five colour themes: the ink-saving Eco Print black-and-white default, plus Elite, Classroom, Celebration and Retro, all of which still print well — or set your own colours for the background, square text, title bar, title text and free space. Font size is adjustable from 6pt to 22pt, with long words auto-hyphenated so nothing gets cut off." },
    { q: "Do I need Canva or design experience to make a bingo card?",
      a: "No. A bingo card maker replaces the parts of Canva or a slide template you would normally fight with — layout, spacing, grid alignment — with a few dropdowns and toggles. You bring the words and pick the look; the generator handles the design and the randomization." },
    { q: "What is the difference between a bingo card maker and a bingo sheet maker?",
      a: "Nothing, on this site. Sheet, board, and card are three words people use for the same grid, and the file you download is identical. The only real difference is how many you make: one for a shared board, or a stack with one per player." },
    { q: "How many unique cards can I make from one list, and will squares repeat?",
      a: "Up to 999 cards from a single square list, each with its own randomized layout, so a full room can play without two players holding an identical card. More squares in your original list means less repetition across a large batch." },
  ],

  closing: {
    h: "Make Your Bingo Card",
    p: "Free to start. Print or share online. No account needed.",
    cta: "Start Making →",
  },
};

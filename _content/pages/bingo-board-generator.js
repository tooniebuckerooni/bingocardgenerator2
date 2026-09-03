// "bingo board generator" — the single shared board, and the card-vs-board
// terminology question. Search Console: 187 impressions across 23 "board"
// queries, a much bigger cluster than the head term alone suggests, and the
// "bingo board maker / creator / randomizer" variants belong here rather than on
// the card-maker page.
//
// The grid defaults to 5x5 but is selectable — presets 3x3/4x4/5x5/6x6 plus a
// custom 2-8 each way, so non-square boards like 4x7 are valid. A free space
// works at ANY size — only CENTRING it needs both sides odd; on an even grid it
// is placed randomly. The differentiation from the card-maker page is occasion
// and usage pattern, not grid size.
module.exports = {
  slug: "bingo-board-generator",
  title: "Bingo Board Generator | Build a Custom Bingo Board Free",
  description:
    "Build a custom bingo board in minutes — for meeting bingo, prediction boards, watch parties, or the classroom. Free to design, no login required.",
  ogDescription:
    "Turn your own words, phrases, or predictions into a ready-to-play bingo board. Free to start — print it or share it online in minutes.",
  breadcrumb: "Bingo Board Generator",
  eyebrow: "Bingo Board Generator",
  h1: "Bingo Board Generator — From One Board to a Full Room",
  answer:
    "To build a bingo board: <strong>type your own words, phrases, or predictions into the square list, pick a theme, and the generator turns them into a ready-to-play board</strong> — one for a meeting or a watch party, or a batch of uniquely randomized boards for a full room. No login, no design skills.",
  heroCta: "Make a Bingo Board →",
  chips: ["Meeting bingo", "Prediction boards", "Watch parties", "Classrooms", "Team offsites", "…one board or forty"],
  faqHeading: "Bingo board generator FAQ",

  starter: {
    h: "Start your board here",
    lede: "Type the squares now — the generator opens with your board already loaded and every look and layout control on the next screen.",
    titlePlaceholder: "e.g. Monday Standup Bingo",
    squaresPlaceholder:
      "One square per line.\n\nlet's take this offline\ncircle back\nper my last email\nsomeone's mic stays muted\n\nMinimum 25 squares.",
    note: "Kept on this device and passed straight through to the next screen.",
  },

  howto: {
    name: "How to Make a Bingo Board",
    description:
      "Type your squares, pick a look, set the layout, then print the board or share it online.",
    step: [
      { name: "Add your squares", text: "Type at least 25 words, phrases, or predictions — meeting buzzwords, awards-show guesses, vocabulary words, whatever the board is for." },
      { name: "Pick a look", text: "Choose a font, a color theme, and a board title. A Pro pass also prints a logo or two lines of your own text on every board." },
      { name: "Set the layout", text: "Toggle the free space on or off — centred on an odd grid, placed randomly on an even one — then choose portrait for one board per page or landscape for two with a cut line." },
      { name: "Generate and deliver", text: "Download a print-ready PDF, a ZIP of board images, or individual shareable links — set the count to 1 for a single board or up to 999 for a packed room." },
    ],
  },

  body: `
    <p>Type your squares, pick a look, and the generator builds the board. What changes between a single board for a meeting and forty for a classroom is one number — everything else about the process is the same.</p>

    <h2>"Board" or "Card"? Same Grid, Real Difference</h2>
    <p>Search "bingo board" or "bingo card" and you land on the same kind of generator — ours included. The file you download does not change based on which word you typed. What usually <em>is</em> different is what people plan to do with it.</p>
    <p>"Card" searches skew toward a printed stack for a full classroom or party, one per player. "Board" searches skew toward a single shared thing: a meeting-bingo board dropped into a group chat, a predictions board for tonight's game, or one board up on a projector that the whole room plays off.</p>
    <p>This generator builds either from the same square list. Set the number of boards to 1 and you have a board. Set it to 40 and you have a stack of cards. The label is up to you.</p>
    <div class="note">
      <p><strong>A bingo board here starts as the classic 5×5, 25-square grid</strong>, so 25 items fills it. You can also pick 3×3, 4×4, or 6×6, or set any width and height from 2 to 8 — boards don't have to be square. What you control completely is what goes in each square, plus the font, the color theme, and whether there is a free space.</p>
    </div>

    <h2>Bingo Boards for Meetings, Predictions &amp; Game Nights</h2>

    <h3>📋 Meeting &amp; buzzword bingo</h3>
    <p>Turn a status meeting into something worth attending. Type the phrases you know are coming, then build one board per attendee or a single shared one for the projector.</p>
    <div class="gcard">
      <h4>Example squares — the standup that could have been an email</h4>
      <p>let's take this offline · circle back · per my last email · someone's mic stays muted · a screen-share shows the wrong tab · "quick question" (it isn't) · a dog appears on camera · the roadmap slide gets skipped · "can everyone see my screen?" · we run five minutes over</p>
    </div>

    <h3>🎬 Prediction boards for shows and events</h3>
    <p>Awards shows, season finales, election-night coverage, the family holiday dinner — anything with predictable beats makes a good prediction board. Guess the moments, put them in the squares, and mark them off as they happen. One board per person makes it a race; one shared board makes it a running commentary.</p>
    <div class="gcard">
      <h4>Example squares — awards-night watch party</h4>
      <p>someone thanks their agent first · the orchestra plays a speech out · a presenter fumbles a name · an obvious snub gets a reaction shot · someone forgets to thank their partner · a montage runs long · the host makes a joke about the length</p>
    </div>

    <h3>🎓 Classroom &amp; group boards</h3>
    <p>Not every classroom board needs thirty printed copies. A single vocabulary or icebreaker board works fine on a shared screen for a small group or a first-day activity. Need one per student instead? See our guide to <a href="/custom-bingo-cards.html">custom bingo cards</a>, which covers class sets and the word-count trap that makes them repetitive.</p>

    <h2>Printed Board or Shareable Link — However It Gets Played</h2>
    <p>A single board usually wants a screen, not a printer. Share Online turns each board into its own link — drop it in the group chat before a meeting, or pull it up mid-stream during an awards show, and nobody has to be handed anything. Print is still there when the board belongs on a wall or a table, and it is the better choice the moment you're making more than a handful.</p>
    <div class="tip">
      <p><strong>Single-board formats are a real request, not a hypothetical.</strong> Our parent company, Fat City Entertainment, runs live bingo nights for a living, and "can I just have one board on the screen" comes up constantly — for staff meetings, holiday parties, and watch nights where nobody wants to hand out paper.</p>
    </div>

    <h2>Looking for Something Else?</h2>
    <ul>
      <li>Need one printed card per player for a full classroom or party? See <a href="/custom-bingo-cards.html">custom bingo cards</a>.</li>
      <li>Want the deeper how-to on designing a board from scratch? See the <a href="/bingo-card-maker.html">bingo card maker</a>.</li>
      <li>Playing on phones with no printer involved? See the <a href="/online-bingo-generator.html">online bingo generator</a>.</li>
      <li>Turning a playlist into the game instead? Use the <a href="/music-bingo-generator.html">music bingo generator</a>.</li>
    </ul>`,

  faq: [
    { q: "What's the difference between a bingo board and a bingo card?",
      a: "Nothing in the file itself — both come from the same generator, at whatever grid size you pick. Board is the word a lot of people use for a single shareable one, as in meeting bingo or prediction bingo, while card usually means a printed set with one per player. Use whichever term fits how you're playing." },
    { q: "Can I make just one board, or do I need a full set?",
      a: "Either. Set the number of boards to 1 for a single meeting or prediction board, or generate more — every board is uniquely randomized, so a group doesn't end up with duplicates." },
    { q: "Does the board have to be a 5x5 grid?",
      a: "No. 5x5 is the default because it is the classic, but you can pick 3x3, 4x4, or 6x6 with one click, or set any width and height from 2 to 8 under custom size — so a 4x7 board is fine too. A free space works at any size: it sits dead centre when both sides are odd, and lands somewhere different on every card when they are not. You also fully control the words in every square, the font, and the color theme." },
    { q: "Can I use this for meeting or buzzword bingo?",
      a: "Yes. Type the phrases you expect to hear — corporate jargon, a coworker's go-to line, whatever your meeting is known for — as your squares, and generate one board per attendee or a single shared one for the screen." },
    { q: "Can I make a prediction board for a show, game, or event?",
      a: "Yes. Type your predicted moments as squares — an awards-show cliche, a plot twist you're calling, an election-night talking point — and mark them off as they happen." },
    { q: "Can I make the board digital instead of printing it?",
      a: "Yes. Switch to Share Online and each board becomes its own link that opens on a phone, a laptop, or the big screen — no printing needed." },
    { q: "Is it free to make a bingo board?",
      a: "Building one costs nothing, including the download — free exports carry a demo watermark. Since a single meeting or prediction board is usually thrown on a screen rather than printed, plenty of people never need more than the free tier. A pass removes the watermark and unlocks branding when you do." },
  ],

  closing: {
    h: "Build Your Board",
    p: "Free to start. Print it or share it online. No account needed.",
    cta: "Make a Bingo Board →",
  },
};

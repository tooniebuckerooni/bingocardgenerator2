// "online bingo generator" — immediacy and zero install.
// Search Console: ~291 impressions across the cluster. Note the head term sits at
// position 70.1 while "digital bingo card generator" (50.8) and "virtual bingo
// card generator" (64.2) rank considerably better — so this page covers digital
// and virtual explicitly rather than leading on "online" alone.
//
// The "no login" framing is deliberately NOT the lede: close variants of that
// phrase already appear 21 times across the site, and leading with it here would
// have made this the near-duplicate page. Immediacy carries it instead.
module.exports = {
  slug: "online-bingo-generator",
  title: "Online Bingo Generator | Make Bingo Cards in Your Browser",
  description:
    "Make bingo cards online in seconds — nothing to install, works in any browser on any device. Print them or play digitally with a link per player. Free to start.",
  ogDescription:
    "An online bingo generator that runs in the browser you already have open. Virtual or printable cards in minutes — free to start.",
  breadcrumb: "Online Bingo Generator",
  eyebrow: "Online Bingo Generator",
  h1: "Online Bingo Generator — Cards in the Time You'd Spend Installing One",
  answer:
    "To make bingo cards online: <strong>open the generator in whatever browser you already have, type your squares, and download or share the cards</strong>. It runs on the page — nothing to install, nothing to update, and it works the same on a phone, a Chromebook, or a school laptop with locked-down permissions.",
  heroCta: "Make Cards Online →",
  chips: ["Any browser", "Any device", "Virtual or printed", "Nothing to install", "Ready in minutes"],
  faqHeading: "Online bingo generator FAQ",

  starter: {
    h: "Start right here",
    lede: "You can begin before you even leave this page. Type your squares and the generator opens with them loaded.",
    titlePlaceholder: "e.g. Team Trivia — Round One",
    squaresPlaceholder:
      "One square per line.\n\nsomeone joins from an airport\nthe roadmap slide gets skipped\na dog appears on camera\n\n25 squares for a 5 x 5 card.",
    note: "No upload, no round trip — the browser carries it across for you.",
  },

  howto: {
    name: "How to Use the Online Bingo Generator",
    description:
      "Type your squares in the browser, customize instantly, then print or share digital cards.",
    step: [
      { name: "Add your squares in the browser", text: "Type or paste your words, names, or trivia answers straight into the page — 25 fills a classic 5 x 5, and the counter tells you the number for whatever grid size you pick — or bulk-import a CSV or TXT list. There is no file to download or open separately." },
      { name: "Customize and watch it update", text: "Choose a card size, a font, a colour theme or your own colours, and a layout. Every change previews on screen immediately, and the colour picker checks the contrast as you go, so there is no export-and-check step." },
      { name: "Print or play digitally", text: "Download a print-ready PDF, or generate a share link per player that opens on any device — both are ready the moment you click generate." },
    ],
  },

  body: `
    <p>Most tools that call themselves a bingo generator still put something between you and a finished card: a desktop program to install, a mobile app to find, or an email address to hand over before you have seen a single square. This one is the page. Open it and the generator is already there.</p>

    <h2>What "Online" Actually Means Here</h2>
    <p>The whole tool runs in the browser tab. There is no installer, no app store, no update to approve later, and nothing left on your hard drive when you're done. That matters more than it sounds: a teacher on a school-issued laptop usually <em>cannot</em> install software, and a host who decided on bingo the same week as the event does not have time to wait for one.</p>
    <p>It also means the thing you're looking at is the thing you're making. The card preview on screen is drawn with the same layout code that produces the PDF, so what you see is genuinely what prints — no export-and-check loop.</p>

    <h2>Virtual, Digital, or Printed — the Same Cards Either Way</h2>
    <p>Two different jobs get called "online bingo," and this generator does both from one square list.</p>
    <div class="grid">
      <div class="gcard">
        <h3>Made online, played on paper</h3>
        <p>Build in the browser, print at the end. One card to a page, or two with a cut line if you'd rather halve the paper. Eco Print is the black-and-white default for a reason — a class set is thirty pages, and colour ink is not free.</p>
      </div>
      <div class="gcard">
        <h3>Made online, played online</h3>
        <p>Switch to Share Online and every card becomes its own link. Send them ahead of a video call and each player opens their own card on a phone or laptop — the format people mean when they search for virtual or digital bingo cards.</p>
      </div>
    </div>
    <p>Nothing is decided up front. The same list produces both, so a hybrid event — half the room in person, half on a call — runs off one build.</p>

    <h2>Built for Right Now, Not for Later</h2>
    <h3>Nothing to install, on any device</h3>
    <p>Because the generator is a web page rather than software, it behaves the same on a school laptop, a personal phone, a shared classroom tablet, or a desktop. Whatever you already have open is the right device; there is no "desktop version" to go and find.</p>
    <h3>See the whole thing before you commit</h3>
    <p>Design a full set, preview every square, and download a watermarked copy to check the print — all before anyone asks you for anything. The watermark is the only thing separating a free download from a paid one, so you can confirm the cards are right on your own printer first.</p>
    <h3>Come back and it's still there</h3>
    <p>Work saves in your browser automatically. Close the tab, come back next week to build a different set for a different class or party, and you open the same page and start again — no re-download, no re-install, no licence file to hunt for.</p>

    <h2>Where a Browser Generator Actually Wins</h2>
    <p><strong>Teachers</strong> between periods, building a vocabulary review before the next class walks in — with time for something that opens instantly, not for an install request to IT.</p>
    <p><strong>Party and event hosts</strong> who decided on bingo the same week as the event and need finished cards tonight.</p>
    <p><strong>Remote and hybrid teams</strong> playing over a video call, who need links to drop straight into the chat rather than a file everyone has to open in the right app first.</p>
    <p>If speed is not the thing you're optimizing for, one of the other entrances will fit better: <a href="/custom-bingo-cards.html">custom bingo cards</a> works through what to put in the squares for a given occasion, the <a href="/bingo-card-maker.html">bingo card maker</a> goes control by control through the design side, the <a href="/bingo-board-generator.html">bingo board generator</a> covers the one-shared-board formats, and the <a href="/music-bingo-generator.html">music bingo generator</a> takes a playlist as its input.</p>

    <div class="tip">
      <p><strong>We use it the same way.</strong> Fat City Entertainment runs music bingo and trivia nights every week, often building the night's cards the same afternoon. The tool is browser-only because that is what actually gets used between a sound check and a first round.</p>
    </div>

    <h2>What It Costs</h2>
    <p>Nothing, to find out whether it works for you. The free tier is not a trial with a timer — you can design, preview, and actually download, and what you get back is watermarked rather than withheld. Run a page on your own printer, check the font size at arm's length, then decide. <a href="/">Plans and pricing are on the homepage.</a></p>`,

  faq: [
    { q: "Is there a free online bingo generator?",
      a: "Yes. You can build, customize, preview, and download bingo cards at bingocardgenerator.online without paying. Free downloads carry a small demo watermark; a Day Pass, Monthly, or Annual pass removes it." },
    { q: "Do I need to download an app to make bingo cards online?",
      a: "No. The generator runs entirely in your browser — add your squares, pick a theme, and generate cards without installing anything on your phone, tablet, or computer." },
    { q: "Can I play bingo online without printing the cards?",
      a: "Yes. Instead of exporting a PDF, generate a share link for each player so they can open their card on a phone or tablet and mark squares as you call them. This is what people usually mean by virtual or digital bingo cards." },
    { q: "What is the difference between virtual bingo cards and printable ones?",
      a: "Only the delivery. Both come from the same square list and the same generator: a printable set is a PDF you run off, and a virtual set is one link per player that opens in a browser. You can produce both from one build, which is what a hybrid event needs." },
    { q: "Does the online bingo generator work on mobile phones and tablets?",
      a: "Yes. Because it runs in the browser rather than as installed software, it works the same way on a phone, tablet, Chromebook, or desktop — anything with a modern web browser." },
    { q: "Will my work still be there if I close the tab?",
      a: "Yes. Your card saves in the browser automatically, so reopening the page picks up where you left off. It is stored on your own device rather than in an account." },
    { q: "What is the difference between this and a downloadable bingo app?",
      a: "A downloadable app needs installing, updating, and often an account before you can use it. This generator opens directly in a browser tab, needs no install, and takes you from blank squares to finished cards in one sitting." },
  ],

  closing: {
    h: "Make Your Cards Online",
    p: "Free to start. Print them or play with a link. No account needed.",
    cta: "Open the Generator →",
  },
};

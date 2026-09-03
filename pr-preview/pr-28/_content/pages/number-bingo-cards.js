// "number bingo" — the classic 1-75 card. This page exists because column fill
// shipped: before it, the generator could not produce a real number card at all,
// since B has to draw from 1-15, I from 16-30 and so on. The starter below hands
// over all five ranges already blocked out, so the page is a tool rather than an
// explanation of one.
module.exports = {
  slug: "number-bingo-cards",
  title: "Printable Number Bingo Cards 1-75 | Free Generator",
  description:
    "Make classic 1-75 number bingo cards free — B 1-15, I 16-30, N 31-45, G 46-60, O 61-75, each card randomized. Print a set as PDF or share links. No account.",
  ogDescription:
    "Classic number bingo cards with the proper column ranges, randomized per player. Start with all 75 numbers already loaded — print or share in minutes.",
  breadcrumb: "Number Bingo Cards",
  eyebrow: "Number Bingo",
  h1: "Printable Number Bingo Cards, 1-75",
  answer:
    "To make classic number bingo cards: <strong>turn on fill by column and give each column its own range — B 1-15, I 16-30, N 31-45, G 46-60, O 61-75</strong>. Every card is randomized separately within those ranges, so a room full of players each get a different card that still plays by the standard rules. The starter below has all five ranges filled in already.",
  heroCta: "Open the Generator with 1-75 Loaded \u2192",
  chips: ["Church halls", "Fundraisers", "Senior centres", "Family game night", "Fetes", "Classic 75-ball rules"],
  faqHeading: "Number bingo cards FAQ",

  starter: {
    h: "Start with all 75 numbers",
    lede: "The five column ranges are already blocked out below, separated by blank lines. Open the generator and it arrives set to fill by column on a 5 \u00d7 5 card \u2014 pick a look and print.",
    titlePlaceholder: "e.g. Saturday Night Bingo",
    squaresPlaceholder: "One number per line, blank line between columns.",
    prefill: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n\n16\n17\n18\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41\n42\n43\n44\n45\n\n46\n47\n48\n49\n50\n51\n52\n53\n54\n55\n56\n57\n58\n59\n60\n\n61\n62\n63\n64\n65\n66\n67\n68\n69\n70\n71\n72\n73\n74\n75",
    grid: [5, 5],
    fill: "col",
    ctaHandoff: true,   // hero and closing buttons hand over the numbers too
    note: "Nothing is sent anywhere \u2014 the list is held in this browser and handed to the generator when you continue.",
  },

  howto: {
    name: "How to Make Number Bingo Cards",
    description:
      "Set the five column ranges, choose a look, then print a set or share digital cards.",
    step: [
      { name: "Load the number ranges", text: "Use the starter on this page to open the generator with 1-75 already blocked into five columns, or type them yourself with a blank line between each range." },
      { name: "Turn on fill by column", text: "In step one, open the fill panel and choose By column. The first block fills the B column, the second the I column, and so on down the card." },
      { name: "Print or share", text: "Set how many cards you need \u2014 up to 999, each randomized separately \u2014 then download a print-ready PDF or share individual links." },
    ],
  },

  body: `
    <p>Classic bingo is a numbers game. Each column draws from its own range \u2014 B from 1 to 15, I from 16 to 30, N from 31 to 45, G from 46 to 60, O from 61 to 75 \u2014 and that structure is what makes a called number like "I-24" mean something. A generator that shuffles one flat list of 75 numbers across the whole grid does not produce a real bingo card; it produces a grid of numbers that happens to look like one.</p>

    <h2>Why Column Ranges Matter</h2>
    <p>If numbers land anywhere, a caller announcing "B-7" has to let players hunt the whole card, and any pre-printed calling equipment stops matching. Keeping each column in its own range is the difference between a card you can run a real game with and a novelty print-out. That is why this page exists: the generator can now fill each column from its own list, so the standard ranges are simply five blocks of numbers.</p>

    <div class="note">
      <p><strong>Each card is randomized on its own.</strong> Order inside every column is shuffled per card, so printing forty cards gives forty different arrangements that all still obey the B-I-N-G-O ranges. Nobody ends up holding a duplicate.</p>
    </div>

    <h2>The Free Space</h2>
    <p>The centre square of a 5 \u00d7 5 number card is traditionally free, and that is the default here \u2014 it takes the middle slot of the N column, exactly as a printed card does. You can turn it off, rename it, or keep it; on grid sizes without a true middle square the generator places it randomly instead.</p>

    <h2>Shorter Rounds and Other Sizes</h2>
    <p>75-ball is the classic, but it is not the only way to run a room. A 3 \u00d7 3 card with three ranges makes a fast round for children or a warm-up game, and a 4 \u00d7 4 suits a shorter session. Set the card size first and give each column a block that matches \u2014 the counter under the square list tells you how many entries the size you picked needs.</p>

    <h2>Printing a Set</h2>
    <p>Number cards are usually printed in bulk, so the defaults are built for it: Eco Print is black and white with minimal ink, landscape puts two cards on a page with a cut line down the middle, and a single PDF holds the whole batch. If you would rather the cards match a venue or a fundraiser's colours, the custom colour picker sets the background, the numbers, the title bar and the free space, and checks the contrast as you go so the numbers stay readable across a hall.</p>
  `,

  faq: [
    { q: "What are the number ranges on a bingo card?",
      a: "On a standard 75-ball card the columns are B 1-15, I 16-30, N 31-45, G 46-60 and O 61-75. Each column only ever holds numbers from its own range, which is what lets a caller announce a letter and a number together and have players know where to look." },
    { q: "How do I make bingo cards with numbers instead of words?",
      a: "Use the starter on this page, which loads all five ranges already separated into blocks, or type them yourself with a blank line between each range and switch the fill mode to By column. Each block then fills one column of the card." },
    { q: "Are the numbers different on every card?",
      a: "Yes. Every card is shuffled separately within each column range, so a set of 40 cards gives 40 different arrangements that all still follow the standard B-I-N-G-O ranges. You can generate up to 999 in one batch." },
    { q: "Is the centre square free?",
      a: "By default, yes \u2014 the middle of the N column is the free space, the same as a printed card. You can turn it off or rename it in step two." },
    { q: "Can I make number cards smaller than 5 x 5?",
      a: "Yes. Pick 3x3 or 4x4 from the card size dropdown, or set any width and height from 2 to 8, then give each column a block of numbers to match. A 3x3 makes a quick round for younger players." },
    { q: "Is it free to make number bingo cards?",
      a: "Designing and previewing is free with no account. Downloads on the free tier carry a small demo watermark; a pass removes it and unlocks clean PDF, PNG, ZIP and share-link downloads." },
  ],

  closing: {
    h: "Make Your Number Bingo Cards",
    p: "All 75 numbers are one click away. Free to start, print or share online, no account needed.",
    cta: "Open the Generator \u2192",
  },
};

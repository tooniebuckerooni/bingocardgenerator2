// "alphabet bingo" — A-Y letter cards for classrooms and homeschool. Z is
// dropped on purpose (least-used letter, the one every teacher already
// expects cut) to keep a clean 25-square 5x5 card. Part of the 3 free
// load-and-go games family alongside number-bingo-cards and icebreaker-bingo.
module.exports = {
  slug: "alphabet-bingo",
  games: true,
  title: "Printable Alphabet Bingo Cards A-Y | Free Generator",
  description:
    "Make printable alphabet bingo cards free — A through Y, shuffled differently on every card so no two kids can copy off each other. No account needed.",
  ogDescription:
    "Alphabet bingo cards for the classroom, A to Y, shuffled differently every time. Start with all 25 letters already loaded.",
  breadcrumb: "Alphabet Bingo",
  eyebrow: "Alphabet Bingo",
  h1: "Free Printable Alphabet Bingo Cards, A-Y",
  answer:
    "To make alphabet bingo cards: load all 25 letters, A through Y, and let the generator shuffle a fresh order onto every card. <strong>Z is left off on purpose</strong> — it's the letter every teacher already expects to see cut, and dropping it keeps the grid at a clean 25 without stretching for a rarely-used tile. The starter below has all 25 letters ready to go.",
  heroCta: "Open the Generator with A-Y Loaded →",
  chips: ["Classrooms", "Homeschool", "Daycare & ESL", "Circle time", "Fast finishers", "No two cards alike"],
  faqHeading: "Alphabet bingo cards FAQ",

  starter: {
    h: "Start with all 25 letters",
    lede: "A through Y are already typed in below, one per line. Open the generator and every card gets its own shuffled order — built for a room of kids who sit close enough to see each other's cards.",
    titlePlaceholder: "e.g. Ms. Rivera's Class",
    titleValue: "Alphabet Bingo",
    squaresPlaceholder: "One letter per line.",
    prefill: "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK\nL\nM\nN\nO\nP\nQ\nR\nS\nT\nU\nV\nW\nX\nY",
    grid: [5, 5],
    ctaHandoff: true,
    note: "Nothing is sent anywhere — the list is held in this browser and handed to the generator when you continue.",
  },

  howto: {
    name: "How to Make Alphabet Bingo Cards",
    description: "Load all 25 letters, let each card shuffle its own order, then print a class set.",
    step: [
      { name: "Load the alphabet", text: "Use the starter on this page to open the generator with A through Y already typed in, or type your own 25-square list." },
      { name: "Let every card shuffle separately", text: "Leave the fill mode on its default setting — each card gets its own random order, so cards sitting side by side don't match." },
      { name: "Print a class set", text: "Set how many cards you need — one per student, plus a few spares — then download a print-ready PDF." },
    ],
  },

  body: `
    <p>Alphabet bingo looks simple, but the free printables most teachers find online are all the same file: the same 25 letters, in the same order, on every card. Sit two kids at the same table and one copies the other in about ten seconds. A real class set needs every card shuffled on its own — this generator does that automatically, so the letters are the same but the layout never repeats.</p>

    <h2>Every Card Shuffles on Its Own</h2>
    <p>Type or load the 25 letters once, and each card that prints gets its own random arrangement. Twenty-eight students get twenty-eight different layouts, all built from the same list, so a fast finisher glancing at a neighbor's card sees a different puzzle, not a shortcut.</p>

    <div class="note">
      <p><strong>Same letters, different card every time.</strong> That's the actual fix for kids comparing cards — not a bigger word bank, just a real shuffle per card, the same way a real bingo card works.</p>
    </div>

    <h2>Why the Alphabet Stops at Y</h2>
    <p>Z is left off on purpose. It's the least-used letter on a bingo-style card and the one every teacher already expects to see cut, so this generator drops it rather than stretching the grid to fit a tile nobody needs. That keeps the card at a clean 5 × 5 — 25 letters, 25 squares, no filler.</p>

    <h2>Smaller Grids for Younger Players</h2>
    <p>Kindergarten and early elementary classes often want a shorter round. Pick 3 × 3 or 4 × 4 from the card size dropdown and give it a matching block of letters — a 3 × 3 needs just nine, so pull the first nine from the list and go.</p>

    <h2>Printing a Class Set</h2>
    <p>Eco Print keeps it black and white and cheap to run off for a whole class; the custom color picker works too if you want the set to match a classroom theme or a specific unit. One PDF holds the whole batch, so a class set of thirty is still one download.</p>
  `,

  faq: [
    { q: "Why does the alphabet stop at Y?",
      a: "Z is the least-used letter on a bingo-style card and the one most teachers already leave out. Dropping it keeps the grid at a clean 25 letters for a standard 5 x 5 card." },
    { q: "Does every card really get a different letter order?",
      a: "Yes. Each card is shuffled on its own from the same 25 letters, so two cards printed side by side almost never match — which is what stops a fast finisher from just copying a neighbor." },
    { q: "Can I use this for younger kids with a smaller grid?",
      a: "Yes. Pick 3x3 or 4x4 from the card size dropdown, or set a custom size from 2 to 8, and match the letter list to it — a 3x3 only needs the first nine letters." },
    { q: "Is the center square free?",
      a: "By default, yes, on a 5 x 5 card. You can turn it off or rename it in step two, the same as any other card made here." },
    { q: "Can I use numbers or sight words instead of letters?",
      a: "Yes. The starter loads the alphabet, but the square list is just text — clear it and type sight words, numbers, or anything else your lesson needs." },
    { q: "Is it free to make alphabet bingo cards?",
      a: "Yes — there's no account and no time limit. Open the generator, load the letters, and design your cards." },
  ],

  closing: {
    h: "Make Your Alphabet Bingo Cards",
    p: "All 25 letters are one click away. Free to start, a fresh shuffle on every card, no account needed.",
    cta: "Open the Generator →",
  },
};

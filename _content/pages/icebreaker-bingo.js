// "icebreaker bingo" — 25 host-paced get-to-know-you prompts, for any room of
// strangers (onboarding, mixers, first days), not a 21+ bar crowd. Pacing is
// the actual pitch: easy openers, real conversation starters, a couple of
// fun ones. Part of the 3 free load-and-go games family.
module.exports = {
  slug: "icebreaker-bingo",
  games: true,
  title: "Printable Icebreaker Bingo Cards | Free Generator",
  description:
    "Make icebreaker bingo cards free — 25 host-paced prompts for onboarding, mixers, and first days, not the same tired find-someone-who list. No account needed.",
  ogDescription:
    "Get-to-know-you bingo with prompts paced like a real host runs them — easy openers, real conversation starters, and a couple of fun ones. Start with all 25 loaded.",
  breadcrumb: "Icebreaker Bingo",
  eyebrow: "Icebreaker Bingo",
  h1: "Free Icebreaker Bingo for Breaking the Ice in Any Room",
  answer:
    "To run icebreaker bingo well, the squares need pacing, not just a topic: <strong>a few instant, easy ones so everyone gets moving, several that force a real conversation, and one or two that create an actual moment</strong>. The starter below has all 25 prompts loaded in that order, built by people who run rooms of strangers for a living.",
  heroCta: "Open the Generator with 25 Prompts Loaded →",
  chips: ["New-hire onboarding", "Conferences & mixers", "Wedding welcome tables", "First day of class", "Team offsites", "General audience"],
  faqHeading: "Icebreaker bingo FAQ",

  starter: {
    h: "Start with 25 ready-to-run prompts",
    lede: "These are paced the way a real host runs a room — easy ones first, a few real conversation starters, a couple of fun ones. Edit any line, or use them as-is.",
    titlePlaceholder: "e.g. New Hire Welcome",
    titleValue: "Icebreaker Bingo",
    squaresPlaceholder: "One prompt per line.",
    prefill: "Has the same first-letter last name as someone here\nHas lived in three or more cities\nCan name a movie from just one line of dialogue\nHas met someone semi-famous\nIs wearing something they made themselves\nHas a hidden talent nobody's guessed yet\nHas been to this city before today\nKnows all the words to a song everyone here would recognize\nHas the same go-to order at coffee shops every time\nHas been the first to arrive at an event more than once this year\nIs left-handed\nHas re-read the same book more than twice\nHas a favorite word in a language other than English\nHas been on live TV, the radio, or in a local newspaper\nHas grown a plant, vegetable, or herb from seed\nHas visited another country in the past year\nCan play a musical instrument, even just a little\nHas won a raffle, contest, or door prize before\nHas the same favorite season as you\nCan do a spot-on impression of a movie or cartoon character\nHas handwriting they're genuinely proud of\nKnows how to say \"thank you\" in three or more languages\nHas been part of a flash mob, group photo, or crowd shot that made the news\nCan name their elementary school teacher from memory\nHas a go-to karaoke song ready at all times",
    grid: [5, 5],
    freeOff: true, // 25 prompts exactly fill the grid — a free space would drop one
    ctaHandoff: true,
    note: "Nothing is sent anywhere — the list is held in this browser and handed to the generator when you continue.",
  },

  howto: {
    name: "How to Run Icebreaker Bingo",
    description: "Load 25 paced prompts, print a set, then let the room mingle until a line fills.",
    step: [
      { name: "Load the prompts", text: "Use the starter on this page to open the generator with 25 ready-paced prompts already typed in, or write your own for the room you're running." },
      { name: "Print or share a set", text: "One per guest is enough — print landscape for two cards a page, or share individual links for a screen-based mixer." },
      { name: "Call it when someone fills a line", text: "Standard bingo rules apply: a row, column, or diagonal of people met wins. Keep a small prize on hand for the first call." },
    ],
  },

  body: `
    <p>An icebreaker only works if the room actually moves. The free templates most people find are the same 25 squares everyone has already seen — "find someone who has a pet," "find someone born in another country" — and a room that has done this before stalls out in the first two minutes. The fix isn't a new topic, it's pacing: a few squares anyone can answer in passing, several that need an actual conversation, and one or two that make people laugh.</p>

    <h2>Why Pacing Matters More Than Topics</h2>
    <p>A card that's all hard questions never fills a line, and a card that's all easy ones is over before anyone's talked to a stranger. The prompt list below is built the way a host actually runs a room: instant openers first, real conversation starters in the middle, and a couple of prompts that tend to turn into an actual moment.</p>

    <div class="note">
      <p><strong>Kept general-audience.</strong> Nothing here touches health, money, or family — this set is built for a workplace, a classroom, or mixed company, not a bar crowd.</p>
    </div>

    <h2>Built by People Who Run Rooms for a Living</h2>
    <p>This generator's parent company runs live music bingo and trivia nights professionally, which means pacing a room of strangers into actually talking to each other is the job, not a guess. The prompt order below is the same instinct: get everyone moving fast, then slow down for the ones worth a real answer.</p>

    <h2>Printing or Sharing a Set</h2>
    <p>Print landscape for two cards a page and hand them out at the door, or share a link for a screen-based version at a virtual or hybrid event. Either way, every card shuffles the 25 prompts into its own order, so the room doesn't fill in a predictable pattern.</p>
  `,

  faq: [
    { q: "What makes a good icebreaker bingo prompt?",
      a: "Pacing, not just topic. A few instant, easy prompts get the room moving right away, several need an actual conversation, and one or two should create a real moment — a card that's all hard questions never fills a line." },
    { q: "Are these prompts appropriate for a workplace or classroom?",
      a: "Yes. The set avoids health, finances, family status, and anything else personal — it's built for mixed company, not a 21-and-up crowd." },
    { q: "Can I write my own prompts instead?",
      a: "Yes. Clear the starter list and type your own 25 — the generator treats them exactly the same, including the per-card shuffle." },
    { q: "How many people does this work for?",
      a: "Any size room. Print one card per guest — landscape fits two to a page — or share individual links for a smaller or hybrid group." },
    { q: "Is the center square free?",
      a: "Not by default here — with 25 prompts exactly filling a 5 x 5 card, a free space would bump one off. Turn it on in step two if you'd rather have one." },
    { q: "Is it free to make icebreaker bingo cards?",
      a: "Yes — there's no account and no time limit. Open the generator, load the prompts, and design your cards." },
  ],

  closing: {
    h: "Run Your Icebreaker Bingo",
    p: "25 host-paced prompts are one click away. Free to start, print or share online, no account needed.",
    cta: "Open the Generator →",
  },
};

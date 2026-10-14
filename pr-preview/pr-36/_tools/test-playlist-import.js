// Check the playlist importer against the file shapes people actually upload.
//
// The import has to tell song from artist in files that disagree about the
// order: CSVs name their columns, plain-text lists don't, and the text reader
// was once "fixed" by flipping its assumption, which fixed some files and
// reversed everyone else's. So each sample here pins the song and artist the
// importer must find. Add a sample whenever a real export surprises us.
//
// It runs the parser straight out of index.html (the block between the
// PLAYLIST-PARSE markers), so it tests the code that ships, not a copy.
//   node _tools/test-playlist-import.js
const fs = require("fs"), path = require("path");
const REPO = path.resolve(__dirname, "..");

const html = fs.readFileSync(path.join(REPO, "index.html"), "utf8");
const a = html.indexOf("// PLAYLIST-PARSE:BEGIN"), b = html.indexOf("// PLAYLIST-PARSE:END");
if (a < 0 || b < a) { console.error("PLAYLIST-PARSE markers not found in index.html"); process.exit(1); }
const { decodePlaylist, parsePlaylist, fmtTrack } =
  new Function(html.slice(a, b) + "\nreturn {decodePlaylist, parsePlaylist, fmtTrack};")();

const utf8 = (s) => new TextEncoder().encode(s);
const utf16le = (s, bom = true) => new Uint8Array(Buffer.concat([bom ? Buffer.from([0xff, 0xfe]) : Buffer.alloc(0), Buffer.from(s, "utf16le")]));
const cp1252 = (s) => new Uint8Array([...s].map((c) => ({ "é": 0xe9, "ö": 0xf6 })[c] ?? c.charCodeAt(0)));

// [name, file name, bytes, expected [song, artist] pairs in order]
// (or { noTitle: true } for a file that should be refused with a reason)
const SAMPLES = [
  ["TuneMyMusic TXT (artist first)", "Fathers Day.txt",
    utf8("Beyoncé - Daddy Lessons\nKeith Urban - Song For Dad\n"),
    [["Daddy Lessons", "Beyoncé"], ["Song For Dad", "Keith Urban"]]],
  ["TuneMyMusic CSV", "Fathers Day.csv",
    utf8("Track name,Artist name,Album,Playlist name,Type,ISRC\nDaddy Lessons,Beyoncé,Lemonade,Fathers Day,Playlist,USSM11603109\n\"Hello, Goodbye\",The Beatles,Magical Mystery Tour,Fathers Day,Playlist,GBAYE0601640\n"),
    [["Daddy Lessons", "Beyoncé"], ["Hello, Goodbye", "The Beatles"]]],
  ["Exportify CSV", "fathers_day.csv",
    utf8('"Track URI","Track Name","Album Name","Artist Name(s)","Release Date","Duration (ms)","Popularity"\n"spotify:track:1","Daddy Lessons","Lemonade","Beyoncé","2016-04-23","287000","61"\n'),
    [["Daddy Lessons", "Beyoncé"]]],
  ["Exportify CSV, older columns", "fathers_day.csv",
    utf8('"Track URI","Track Name","Artist URI(s)","Artist Name(s)","Album URI","Album Name","Album Artist URI(s)","Album Artist Name(s)"\n"u","Song For Dad","a","Keith Urban","b","Fuse","c","Keith Urban"\n'),
    [["Song For Dad", "Keith Urban"]]],
  ["Apple Music Export Playlist (UTF-16, tabs, CR)", "Fathers Day.txt",
    utf16le("Name\tArtist\tComposer\tAlbum\tGrouping\tWork\r\"Heroes\"\tDavid Bowie\t\tHeroes\t\t\rDaddy Lessons\tBeyoncé\t\tLemonade\t\t\r"),
    [["Heroes", "David Bowie"], ["Daddy Lessons", "Beyoncé"]]],
  ["UTF-16 with no BOM", "list.txt",
    utf16le("Name\tArtist\r\nJolene\tDolly Parton\r\n", false),
    [["Jolene", "Dolly Parton"]]],
  ["Excel CSV saved in Windows-1252", "list.csv",
    cp1252("Title,Artist\nDaddy Lessons,Beyoncé\n"),
    [["Daddy Lessons", "Beyoncé"]]],
  ["Excel CSV with semicolons", "list.csv",
    utf8("Title;Artist\nDaddy Lessons;Beyoncé\n"),
    [["Daddy Lessons", "Beyoncé"]]],
  ["CSV with a line break inside quotes", "list.csv",
    utf8('Title,Artist,Notes\n"Daddy Lessons","Beyoncé","dance floor\nfiller"\nJolene,Dolly Parton,\n'),
    [["Daddy Lessons", "Beyoncé"], ["Jolene", "Dolly Parton"]]],
  ["CSV content in a .txt file", "list.txt",
    utf8("Track name,Artist name,Album\nDaddy Lessons,Beyoncé,Lemonade\n"),
    [["Daddy Lessons", "Beyoncé"]]],
  ["one-column CSV of 'Artist - Song' lines", "list.csv",
    utf8("Beyoncé - Daddy Lessons\nKeith Urban - Song For Dad\n"),
    [["Daddy Lessons", "Beyoncé"], ["Song For Dad", "Keith Urban"]]],
  ["headerless two-column CSV (song first)", "list.csv",
    utf8("Song 2,Blur\nDaddy Lessons,Beyoncé\n"),
    [["Song 2", "Blur"], ["Daddy Lessons", "Beyoncé"]]],
  ["song-first list, told apart by (feat. …)", "list.txt",
    utf8("Daddy Lessons - Beyoncé\nSong For Dad - Keith Urban\nLose Control (feat. Ciara & Fat Man Scoop) - Missy Elliott\n"),
    [["Daddy Lessons", "Beyoncé"], ["Song For Dad", "Keith Urban"], ["Lose Control (feat. Ciara & Fat Man Scoop)", "Missy Elliott"]]],
  ["song-first list, told apart by a repeated artist", "list.txt",
    utf8("Shake It Off - Taylor Swift\nBlank Space - Taylor Swift\nHello - Adele\n"),
    [["Shake It Off", "Taylor Swift"], ["Blank Space", "Taylor Swift"], ["Hello", "Adele"]]],
  ["version tag stays on the song (artist first)", "list.txt",
    utf8("Queen - Don't Stop Me Now - Remastered 2011\nEagles - Hotel California\n"),
    [["Don't Stop Me Now - Remastered 2011", "Queen"], ["Hotel California", "Eagles"]]],
  ["version tag stays on the song (song first)", "list.txt",
    utf8("Hotel California - 2013 Remaster - Eagles\nDreams - Fleetwood Mac\n"),
    [["Hotel California - 2013 Remaster", "Eagles"], ["Dreams", "Fleetwood Mac"]]],
  ["numbering, CRLF, M3U lines and a song starting with #", "list.txt",
    utf8("#EXTM3U\r\n1. Garbage - #1 Crush\r\n2) Beyoncé - Daddy Lessons\r\n\r\n"),
    [["#1 Crush", "Garbage"], ["Daddy Lessons", "Beyoncé"]]],
  ["Google Takeout CSV (IDs only) is refused", "playlist.csv",
    utf8("Video ID,Playlist Video Creation Timestamp\ndQw4w9WgXcQ,2023-01-01T00:00:00+00:00\n"),
    { noTitle: true }],
];

let fail = 0;
for (const [name, file, bytes, want] of SAMPLES) {
  const res = parsePlaylist(decodePlaylist(bytes), file);
  const got = res.tracks.map((t) => [t.t, t.a]);
  const ok = want.noTitle ? !!res.noTitle && !got.length : JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"}  ${name}`);
  if (!ok) console.log(`        want ${JSON.stringify(want)}\n        got  ${JSON.stringify(got)}${res.noTitle ? " (noTitle)" : ""}`);
}

// The four "Squares show" formats.
const tr = { t: "Daddy Lessons", a: "Beyoncé" };
const FMT = { title: "Daddy Lessons", artist: "Beyoncé", title_artist: "Daddy Lessons – Beyoncé", artist_title: "Beyoncé – Daddy Lessons" };
for (const [f, want] of Object.entries(FMT)) {
  const ok = fmtTrack(tr, f) === want;
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"}  format ${f} → ${fmtTrack(tr, f)}`);
}
const solo = { t: "Jolene", a: "" };
for (const f of Object.keys(FMT)) if (fmtTrack(solo, f) !== "Jolene") { fail++; console.log(`FAIL  format ${f} without an artist`); }

console.log(fail ? `\n${fail} failed` : "\nall passed");
process.exit(fail ? 1 : 0);

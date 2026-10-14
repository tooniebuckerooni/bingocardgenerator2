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
const { decodePlaylist, parsePlaylist, fmtTrack, readBoxList } =
  new Function(html.slice(a, b) + "\nreturn {decodePlaylist, parsePlaylist, fmtTrack, readBoxList};")();

const utf8 = (s) => new TextEncoder().encode(s);
const utf16le = (s, bom = true) => new Uint8Array(Buffer.concat([bom ? Buffer.from([0xff, 0xfe]) : Buffer.alloc(0), Buffer.from(s, "utf16le")]));
const cp1252 = (s) => new Uint8Array([...s].map((c) => ({ "é": 0xe9, "ö": 0xf6 })[c] ?? c.charCodeAt(0)));

// [name, file name, bytes, expected [song, artist] pairs in order]
// (or { noTitle: true } / { links: true } for a file refused with a reason)
const SAMPLES = [
  // The first rows of real TuneMyMusic exports (Oct 2026): UTF-8 with a BOM,
  // TXT is "Artist - Track", CSV carries a "Playlist name" column.
  ["TuneMyMusic TXT", "My Deezer Library.txt",
    utf8("\uFEFFThe Canton Spirituals - Father I'm Coming Home (Live)\nLuther Vandross - Dance With My Father\n047 - I Love You Daddy\nJhené Aiko - So Good (feat. Kendrick Lamar)\n"),
    [["Father I'm Coming Home (Live)", "The Canton Spirituals"], ["Dance With My Father", "Luther Vandross"], ["I Love You Daddy", "047"], ["So Good (feat. Kendrick Lamar)", "Jhené Aiko"]]],
  ["TuneMyMusic CSV", "My Deezer Library.csv",
    utf8('\uFEFFTrack name,Artist name,Album,Playlist name,Type,ISRC,Deezer - id\n"Dance With My Father","Luther Vandross","Dance With My Father","FATHER’S DAY SONGS","Playlist","USJAY0300056","15397232"\n"Wind Beneath My Wings","Gerald Levert","Father And Son","FATHER’S DAY SONGS","Playlist","USEW29500105","3920161"\n'),
    [["Dance With My Father", "Luther Vandross"], ["Wind Beneath My Wings", "Gerald Levert"]]],
  ["TuneMyMusic CSV from YouTube: blank artists, read like the TXT", "My YouTube Music Library.csv",
    utf8('\uFEFFTrack name,Artist name,Album,Playlist name,Type,ISRC\n"Xavi - La Diabla","","","Popular Music Videos","Playlist",""\n"Drake - You Broke My Heart","","","Popular Music Videos","Playlist",""\n'),
    [["La Diabla", "Xavi"], ["You Broke My Heart", "Drake"]]],
  ["Spotify links instead of names are refused", "playlist.txt",
    utf8("https://open.spotify.com/track/0skYUMpS0AcbpjcGsAbRGj\nhttps://open.spotify.com/track/0O6u0VJ46W86TxN9wgyqDj\n"),
    { links: true }],
  // A customer's TuneMyMusic export of a Spotify playlist (Oct 2026), rebuilt
  // from his screenshot. The live importer read "Playlist name" as the song,
  // so every square came out "BINGO - Love Songs #1 – <artist>".
  ["TuneMyMusic CSV of a Spotify playlist (a customer's file)", "My Spotify Library.csv",
    utf8('\uFEFFTrack name,Artist name,Album,Playlist name,Type,ISRC,Spotify - id\n'
      + '"Halo","Beyoncé","I AM...SASHA FIERCE","BINGO - Love Songs #1","Playlist","USSM10804556","3ERa3mEeOnrh2Mc47qM6T1"\n'
      + '"Make You Feel My Love","Adele","19","BINGO - Love Songs #1","Playlist","GBBKS0700586","5FgPwJ7Nh2FVmIXviKl2VF"\n'
      + '"I Don\'t Want to Miss a Thing - From ""Armageddon"" Soundtrack","Aerosmith","Armageddon - The Album","BINGO - Love Songs #1","Playlist","USSM19801545","225xvV8r1yKMHErSWivnow"\n'
      + '"Nothing Compares 2 U","Sinéad O\'Connor","I Do Not Want What I Haven\'t Got","BINGO - Love Songs #1","Playlist","GBAYK9000017","5GHY1DFWKz3Prg2V0Iodqo"\n'),
    [["Halo", "Beyoncé"], ["Make You Feel My Love", "Adele"], ["I Don't Want to Miss a Thing - From \"Armageddon\" Soundtrack", "Aerosmith"], ["Nothing Compares 2 U", "Sinéad O'Connor"]]],
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
  ["covers playlist: repeated songs don't flip the order", "Christmas.txt",
    utf8("Bing Crosby - White Christmas\nMichael Bublé - White Christmas\nMariah Carey - Silent Night\nFrank Sinatra - Silent Night\n"),
    [["White Christmas", "Bing Crosby"], ["White Christmas", "Michael Bublé"], ["Silent Night", "Mariah Carey"], ["Silent Night", "Frank Sinatra"]]],
  ["brackets in an artist's name aren't a song mark", "list.txt",
    utf8("(G)I-DLE - Queencard\nBTS (방탄소년단) - Dynamite\n"),
    [["Queencard", "(G)I-DLE"], ["Dynamite", "BTS (방탄소년단)"]]],
  ["a song with only a version tag after the dash stays whole", "list.txt",
    utf8("Hotel California - 2013 Remaster\nDreams - 2004 Remaster\nAfrica\n"),
    [["Hotel California - 2013 Remaster", ""], ["Dreams - 2004 Remaster", ""], ["Africa", ""]]],
  ["headerless CSV whose first song is named like a column (Time)", "list.csv",
    utf8("Time,Pink Floyd\nMoney,Pink Floyd\n"),
    [["Time", "Pink Floyd"], ["Money", "Pink Floyd"]]],
  ["headerless CSV whose first song is named like a column (Name)", "list.csv",
    utf8("Name,Goo Goo Dolls\nIris,Goo Goo Dolls\nJolene,Dolly Parton\n"),
    [["Name", "Goo Goo Dolls"], ["Iris", "Goo Goo Dolls"], ["Jolene", "Dolly Parton"]]],
  ["one-column CSV list with a comma in one line", "list.csv",
    utf8("Beyoncé - Daddy Lessons\nEarth, Wind & Fire - September\nKeith Urban - Song For Dad\n"),
    [["Daddy Lessons", "Beyoncé"], ["September", "Earth, Wind & Fire"], ["Song For Dad", "Keith Urban"]]],
  ["padding inside quotes is trimmed", "list.txt",
    utf8('"Adele - Hello "\n" Toto - Africa"\n"Queen - Bohemian Rhapsody"\n'),
    [["Hello", "Adele"], ["Africa", "Toto"], ["Bohemian Rhapsody", "Queen"]]],
  ["one stray byte keeps a UTF-8 file UTF-8", "list.txt",
    new Uint8Array([...utf8("Beyoncé - Daddy Lessons\nJhené Aiko - So Good "), 0xff, ...utf8("\n")]),
    [["Daddy Lessons", "Beyoncé"], ["So Good \uFFFD", "Jhené Aiko"]]],
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
  const ok = want.noTitle ? !!res.noTitle && !got.length
    : want.links ? !!res.links && !got.length
    : JSON.stringify(got) === JSON.stringify(want);
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

// A list pasted into the box: read when it is mostly "X - Y" pairs, in
// TuneMyMusic's order unless the list says otherwise; " – " lines are this
// importer's own output, read in the order the pills last wrote them.
const BOX = [
  ["pasted TuneMyMusic lines", ["Luther Vandross - Dance With My Father", "", "Gerald Levert - Wind Beneath My Wings"], "title",
    [["Dance With My Father", "Luther Vandross"], ["Wind Beneath My Wings", "Gerald Levert"]]],
  ["own output, last written Song – Artist", ["Dance With My Father – Luther Vandross", "Wind Beneath My Wings – Gerald Levert"], "title_artist",
    [["Dance With My Father", "Luther Vandross"], ["Wind Beneath My Wings", "Gerald Levert"]]],
  ["own output, last written Artist – Song", ["Luther Vandross – Dance With My Father", "Gerald Levert – Wind Beneath My Wings"], "artist_title",
    [["Dance With My Father", "Luther Vandross"], ["Wind Beneath My Wings", "Gerald Levert"]]],
  ["not a song list", ["Teacher", "Principal", "Lunch - Cafeteria", "Recess"], "title", null],
];
for (const [name, lines, prev, want] of BOX) {
  const r = readBoxList(lines, prev);
  const got = r && r.tracks.map((t) => [t.t, t.a]);
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) fail++;
  console.log(`${ok ? "ok  " : "FAIL"}  box: ${name}`);
  if (!ok) console.log(`        want ${JSON.stringify(want)}\n        got  ${JSON.stringify(got)}`);
}

console.log(fail ? `\n${fail} failed` : "\nall passed");
process.exit(fail ? 1 : 0);

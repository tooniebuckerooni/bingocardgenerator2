// No streaming/firehose option exists for YouTube, so this is a plain
// polling search bounded by a publishedAfter cursor per keyword. Free quota
// is 10,000 units/day and search.list costs 100 units per call, so each
// keyword can only be checked roughly ~100 times/day total across all
// keywords - keep the cron interval and keyword count in mind.
async function checkYoutube(apiKey, keywords, state, maxResultsPerKeyword, onMatch) {
  if (!apiKey) {
    console.log("YOUTUBE_API_KEY not set, skipping YouTube check.");
    return;
  }
  const ytState = state.youtube || {};

  for (const keyword of keywords) {
    const publishedAfter = ytState[keyword] || new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("q", keyword);
    url.searchParams.set("type", "video");
    url.searchParams.set("order", "date");
    url.searchParams.set("publishedAfter", publishedAfter);
    url.searchParams.set("maxResults", String(maxResultsPerKeyword));
    url.searchParams.set("key", apiKey);

    const res = await fetch(url);
    if (!res.ok) {
      console.error(`YouTube fetch failed for "${keyword}": ${res.status} ${await res.text()}`);
      continue;
    }
    const json = await res.json();
    let newest = publishedAfter;
    for (const item of json.items || []) {
      const text = `${item.snippet.title} ${item.snippet.description}`;
      onMatch({
        source: "YouTube",
        keyword,
        author: item.snippet.channelTitle,
        text: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      });
      if (item.snippet.publishedAt > newest) newest = item.snippet.publishedAt;
    }
    ytState[keyword] = newest;
  }

  state.youtube = ytState;
}

module.exports = { checkYoutube };

const { findMatches } = require("./match");

const USER_AGENT = process.env.REDDIT_USER_AGENT || "keyword-monitor/1.0 (personal keyword alerts)";

// Reddit has no full-text search over comments, so instead of querying
// /search.json (submissions only, indexed with lag) we poll the sitewide
// "newest first" listings directly and grep every item ourselves. This is
// the same approach bots like F5Bot use for Reddit coverage.
async function fetchListing(url, before) {
  const fullUrl = before ? `${url}&before=${before}` : url;
  const res = await fetch(fullUrl, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) {
    throw new Error(`Reddit fetch failed: ${res.status} ${await res.text()}`);
  }
  const json = await res.json();
  return json.data.children.map((c) => c.data);
}

async function checkReddit(keywords, state, onMatch) {
  const redditState = state.reddit || { lastCommentName: null, lastPostName: null };

  const comments = await fetchListing(
    "https://www.reddit.com/r/all/comments.json?limit=100",
    redditState.lastCommentName
  );
  for (const c of comments) {
    const matches = findMatches(c.body, keywords);
    for (const kw of matches) {
      onMatch({
        source: "Reddit (comment)",
        keyword: kw,
        author: `u/${c.author}`,
        text: c.body,
        url: `https://www.reddit.com${c.permalink}`
      });
    }
  }
  if (comments.length > 0) redditState.lastCommentName = comments[0].name;

  const posts = await fetchListing(
    "https://www.reddit.com/r/all/new.json?limit=100",
    redditState.lastPostName
  );
  for (const p of posts) {
    const matches = findMatches(`${p.title} ${p.selftext || ""}`, keywords);
    for (const kw of matches) {
      onMatch({
        source: "Reddit (post)",
        keyword: kw,
        author: `u/${p.author}`,
        text: p.title,
        url: `https://www.reddit.com${p.permalink}`
      });
    }
  }
  if (posts.length > 0) redditState.lastPostName = posts[0].name;

  state.reddit = redditState;
}

module.exports = { checkReddit };

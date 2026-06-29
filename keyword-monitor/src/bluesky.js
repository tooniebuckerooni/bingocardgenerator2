const WebSocket = require("ws");
const { findMatches } = require("./match");

const JETSTREAM_URL =
  "wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post";

// Bluesky's Jetstream firehose pushes every public post the instant it's
// created - this is true real-time streaming, not polling. A GitHub Actions
// job isn't a 24/7 host though, so each run connects, listens for
// `listenMs`, then disconnects. Run it on a tight cron to minimize gaps.
function listenBluesky(keywords, listenMs, onMatch) {
  return new Promise((resolve) => {
    const ws = new WebSocket(JETSTREAM_URL);
    const timer = setTimeout(() => {
      ws.close();
    }, listenMs);

    ws.on("message", (raw) => {
      let event;
      try {
        event = JSON.parse(raw.toString());
      } catch {
        return;
      }
      const text = event?.commit?.record?.text;
      if (!text) return;
      const matches = findMatches(text, keywords);
      for (const kw of matches) {
        const did = event.did;
        const rkey = event.commit.rkey;
        onMatch({
          source: "Bluesky",
          keyword: kw,
          author: did,
          text,
          url: `https://bsky.app/profile/${did}/post/${rkey}`
        });
      }
    });

    ws.on("error", (err) => {
      console.error("Bluesky stream error:", err.message);
    });

    ws.on("close", () => {
      clearTimeout(timer);
      resolve();
    });
  });
}

module.exports = { listenBluesky };

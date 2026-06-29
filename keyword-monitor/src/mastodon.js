const EventSource = require("eventsource");
const { findMatches } = require("./match");

// Mastodon has no fediverse-wide search; you only ever see what a given
// instance already knows about (its local posts + whatever federated in).
// Each configured instance exposes a public live stream
// (/api/v1/streaming/public) of every post it sees, in real time - so like
// Bluesky this is true streaming, just scoped to one instance's view of the
// fediverse rather than all of it. Add more instances in config.json for
// broader (still partial) coverage.
function listenInstance(instance, keywords, listenMs, onMatch) {
  return new Promise((resolve) => {
    const token = instance.accessTokenEnv ? process.env[instance.accessTokenEnv] : null;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const es = new EventSource(`${instance.baseUrl}/api/v1/streaming/public`, { headers });

    const timer = setTimeout(() => es.close(), listenMs);

    es.addEventListener("update", (e) => {
      let status;
      try {
        status = JSON.parse(e.data);
      } catch {
        return;
      }
      const text = (status.content || "").replace(/<[^>]+>/g, " ");
      const matches = findMatches(text, keywords);
      for (const kw of matches) {
        onMatch({
          source: `Mastodon (${instance.baseUrl})`,
          keyword: kw,
          author: status.account?.acct,
          text,
          url: status.url
        });
      }
    });

    es.onerror = (err) => {
      console.error(`Mastodon stream error (${instance.baseUrl}):`, err.message || err);
    };

    es.addEventListener("close", () => {
      clearTimeout(timer);
      resolve();
    });

    setTimeout(() => {
      es.close();
      clearTimeout(timer);
      resolve();
    }, listenMs + 1000);
  });
}

async function listenMastodon(instances, keywords, listenMs, onMatch) {
  await Promise.all(instances.map((inst) => listenInstance(inst, keywords, listenMs, onMatch)));
}

module.exports = { listenMastodon };

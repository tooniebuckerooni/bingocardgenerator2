const fs = require("fs");
const path = require("path");
const { loadState, saveState } = require("./state");
const { sendDiscordAlert } = require("./discord");
const { checkReddit } = require("./reddit");
const { listenBluesky } = require("./bluesky");
const { listenMastodon } = require("./mastodon");
const { checkYoutube } = require("./youtube");

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config.json"), "utf8"));
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

async function main() {
  const state = loadState();
  const keywords = config.keywords;
  let matchCount = 0;

  const onMatch = async (match) => {
    matchCount++;
    console.log(`MATCH [${match.source}] "${match.keyword}": ${match.url}`);
    await sendDiscordAlert(webhookUrl, match);
  };

  await Promise.all([
    checkReddit(keywords, state, onMatch).catch((e) => console.error("Reddit check failed:", e)),
    checkYoutube(process.env.YOUTUBE_API_KEY, keywords, state, config.youtube.maxResultsPerKeyword, onMatch).catch(
      (e) => console.error("YouTube check failed:", e)
    ),
    listenBluesky(keywords, config.bluesky.listenMs, onMatch).catch((e) =>
      console.error("Bluesky listen failed:", e)
    ),
    listenMastodon(config.mastodon.instances, keywords, config.mastodon.listenMs, onMatch).catch((e) =>
      console.error("Mastodon listen failed:", e)
    )
  ]);

  saveState(state);
  console.log(`Done. ${matchCount} match(es) found this run.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

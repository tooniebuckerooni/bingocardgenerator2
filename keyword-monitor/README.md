# Keyword Monitor

Watches Reddit, Bluesky, Mastodon, and YouTube for keyword mentions and posts alerts to Discord. Runs on a GitHub Actions cron, so no server to maintain.

## Setup

1. Create a Discord webhook (Server Settings → Integrations → Webhooks) and copy its URL.
2. In this repo's GitHub settings → Secrets and variables → Actions, add:
   - `DISCORD_WEBHOOK_URL` (required)
   - `YOUTUBE_API_KEY` (optional - get one free from Google Cloud Console, enable "YouTube Data API v3"; without it, YouTube checks are skipped)
   - `REDDIT_USER_AGENT` (optional - a string like `keyword-monitor/1.0 (by /u/yourname)`; Reddit works without it but is more likely to rate-limit you)
   - `MASTODON_SOCIAL_TOKEN` (optional - an access token from `https://mastodon.social/settings/applications` with `read` scope; some instances allow the public stream without one)
3. Edit `config.json` and change `"keywords"` to whatever you want to track. Default is `["bingo cards"]`.
4. Push to this branch/repo. The workflow (`.github/workflows/keyword-monitor.yml`) runs every 5 minutes (GitHub's practical minimum for scheduled workflows) and can also be triggered manually from the Actions tab ("Run workflow").

## How each source actually works

- **Reddit** - polling. There's no full-text search API for Reddit comments, so this polls the sitewide "newest" comment and post listings every run and greps them locally, tracking the last-seen item so nothing gets re-alerted. Same approach bots like F5Bot use for Reddit.
- **Bluesky** - true real-time streaming via the public Jetstream firehose. Every run connects, listens live for ~4 minutes, then disconnects (GitHub Actions isn't a 24/7 host). Back-to-back 5-minute runs keep the gaps small.
- **Mastodon** - true real-time streaming, but scoped to whatever instance(s) you configure in `config.json` (default: mastodon.social). There's no fediverse-wide search; you only see what that instance's public stream has. Add more instances for broader (still partial) coverage.
- **YouTube** - polling via the official Search API, since there's no streaming option. Free quota is 10,000 units/day and each search call costs 100 units, so budget roughly 100 calls/day total across however many keywords you track.

## Why this beats "just searching post history"

A one-off search only shows what already exists *right now* and has no memory between runs - re-run it tomorrow and you re-scan everything with no way to tell what's new. This setup either listens to a live stream (Bluesky, Mastodon) or polls with a saved cursor (`state.json`) so it only ever alerts on genuinely new items, never re-notifying for the same post twice.

## Known limitations

- Twitter/X, TikTok, and Facebook/Instagram aren't included - none currently offer a free, ToS-compliant way to do keyword search or streaming for third parties.
- `state.json` is committed back to the repo by the workflow after each run to persist cursors between runs. If you fork/rename things, make sure the workflow still has `contents: write` permission.
- Reddit's sitewide listings only return the most recent ~100 items per poll; during a traffic spike it's theoretically possible to miss something between polls. Tightening the schedule reduces this risk.

async function sendDiscordAlert(webhookUrl, { source, keyword, author, text, url }) {
  if (!webhookUrl) {
    console.log(`[no webhook configured] ${source} match "${keyword}": ${url}`);
    return;
  }
  const snippet = text.length > 350 ? text.slice(0, 350) + "…" : text;
  const body = {
    embeds: [
      {
        title: `New "${keyword}" mention on ${source}`,
        description: snippet,
        url,
        author: author ? { name: author } : undefined,
        timestamp: new Date().toISOString()
      }
    ]
  };
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    console.error(`Discord webhook failed: ${res.status} ${await res.text()}`);
  }
}

module.exports = { sendDiscordAlert };

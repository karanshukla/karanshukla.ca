// Fetches recent public commits for karanshukla and generates a witty summary
// via GitHub Models (Mistral). Writes the result to karan-resume/src/data/pulse.json.
// Run by the pulse.yml GitHub Actions workflow every 3 days.
import { writeFileSync } from "fs";

const GITHUB_USER = "karanshukla";
const OUTPUT_PATH = "karan-resume/src/data/pulse.json";
const token = process.env.GH_MODELS_TOKEN;

if (!token) {
  console.error("GH_MODELS_TOKEN is not set");
  process.exit(1);
}

// 1. Fetch recent public events
const eventsRes = await fetch(
  `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=50`,
  {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  },
);

if (!eventsRes.ok) {
  console.error("GitHub API error:", eventsRes.status, await eventsRes.text());
  process.exit(1);
}

const events = await eventsRes.json();

// Keep commits from the last 90 days
const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
const commits = events
  .filter(
    (e) => e.type === "PushEvent" && new Date(e.created_at).getTime() > cutoff,
  )
  .flatMap((e) =>
    (e.payload.commits ?? []).map((c) => ({
      message: c.message.split("\n")[0],
      repo: e.repo.name.replace(`${GITHUB_USER}/`, ""),
    })),
  )
  .slice(0, 20);

if (commits.length === 0) {
  console.log("No recent commits found — pulse.json unchanged.");
  process.exit(0);
}

const commitText = commits.map((c) => `[${c.repo}] ${c.message}`).join("\n");

// 2. Call GitHub Models (Mistral)
const modelRes = await fetch(
  "https://models.github.ai/inference/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-ai/Mistral-small",
      messages: [
        {
          role: "system",
          content:
            'you are a witty technical writer. summarize what a developer named karan has been working on recently based on their commit messages. write 2-3 short sentences, casual and interesting. use all lowercase. be specific about what they built or fixed. no filler phrases like "it looks like" or "the developer".',
        },
        {
          role: "user",
          content: `recent commits:\n${commitText}`,
        },
      ],
      max_tokens: 180,
      temperature: 0.7,
    }),
  },
);

if (!modelRes.ok) {
  console.error("Model API error:", modelRes.status, await modelRes.text());
  process.exit(1);
}

const modelData = await modelRes.json();
const summary = modelData.choices[0].message.content.trim();

// 3. Write pulse.json
const pulse = {
  summary,
  generatedAt: new Date().toISOString(),
  commitCount: commits.length,
};

writeFileSync(OUTPUT_PATH, JSON.stringify(pulse, null, 2) + "\n");
console.log(
  `pulse.json updated (${commits.length} commits): ${summary.slice(0, 80)}...`,
);

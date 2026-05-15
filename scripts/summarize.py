"""
Fetches recent public commits for karanshukla and generates a witty summary
via GitHub Models (Mistral). Writes the result to karan-resume/src/data/pulse.json.
Run by the pulse.yml GitHub Actions workflow every 3 days.
"""

import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta

GITHUB_USER = "karanshukla"
OUTPUT_PATH = "karan-resume/src/data/pulse.json"

token = os.environ.get("GH_MODELS_TOKEN")
if not token:
    print("GH_MODELS_TOKEN is not set", file=sys.stderr)
    sys.exit(1)

# 1. Fetch recent public events
req = urllib.request.Request(
    f"https://api.github.com/users/{GITHUB_USER}/events/public?per_page=50",
    headers={
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "pulse-summarizer/1.0",
    },
)

try:
    with urllib.request.urlopen(req) as resp:
        events = json.loads(resp.read())
except Exception as e:
    print(f"GitHub API error: {e}", file=sys.stderr)
    sys.exit(1)

# Keep commits from the last 7 days
cutoff = datetime.now(timezone.utc) - timedelta(days=7)
commits = []

for event in events:
    if event.get("type") != "PushEvent":
        continue
    created_at = datetime.fromisoformat(event["created_at"].replace("Z", "+00:00"))
    if created_at < cutoff:
        continue
    repo = event["repo"]["name"].replace(f"{GITHUB_USER}/", "")
    for commit in event.get("payload", {}).get("commits", []):
        msg = commit.get("message", "").split("\n")[0]
        commits.append(f"[{repo}] {msg}")
        if len(commits) >= 20:
            break
    if len(commits) >= 20:
        break

if not commits:
    print("No recent commits found -- pulse.json unchanged.")
    sys.exit(0)

commit_text = "\n".join(commits)

# 2. Call GitHub Models (Mistral)
payload = json.dumps({
    "model": "mistral-ai/mistral-medium-2505",
    "messages": [
        {
            "role": "system",
            "content": (
                "you are a witty technical writer. summarize what a developer named karan "
                "has been working on recently based on their commit messages. write 1-2 short "
                "sentences, all lowercase, casual and specific. stay under 160 characters total. "
                "no filler phrases like \"it looks like\" or \"the developer\". "
                "example: \"building out a personal site with new sections and layout improvements. "
                "recent work includes drawer fixes and cat photo additions.\""
            ),
        },
        {
            "role": "user",
            "content": f"recent commits:\n{commit_text}",
        },
    ],
    "max_tokens": 80,
    "temperature": 0.7,
}).encode()

model_req = urllib.request.Request(
    "https://models.github.ai/inference/chat/completions",
    data=payload,
    headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(model_req) as resp:
        model_data = json.loads(resp.read())
except urllib.error.HTTPError as e:
    print(f"Model API error: {e.code} {e.read().decode()}", file=sys.stderr)
    sys.exit(1)

summary = model_data["choices"][0]["message"]["content"].strip()

# 3. Write pulse.json
pulse = {
    "summary": summary,
    "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z"),
    "commitCount": len(commits),
}

with open(OUTPUT_PATH, "w") as f:
    json.dump(pulse, f, indent=2)
    f.write("\n")

print(f"pulse.json updated ({len(commits)} commits): {summary[:80]}...")

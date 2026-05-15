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

github_token = os.environ.get("GITHUB_TOKEN")


def gh_get(url):
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "pulse-summarizer/1.0",
    }
    if github_token:
        headers["Authorization"] = f"Bearer {github_token}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


# 1. Fetch recent public events
events_url = f"https://api.github.com/users/{GITHUB_USER}/events/public?per_page=50"
print(f"[debug] fetching events: {events_url}")
print(f"[debug] github_token present: {bool(github_token)}")

try:
    events = gh_get(events_url)
except Exception as e:
    print(f"GitHub API error: {e}", file=sys.stderr)
    sys.exit(1)

print(f"[debug] total events returned: {len(events)}")

# Keep commits from the last 7 days
cutoff = datetime.now(timezone.utc) - timedelta(days=7)
print(f"[debug] cutoff date: {cutoff.isoformat()}")
commits = []

for event in events:
    if event.get("type") != "PushEvent":
        continue
    created_at = datetime.fromisoformat(event["created_at"].replace("Z", "+00:00"))
    if created_at < cutoff:
        continue

    repo = event["repo"]["name"]
    payload = event.get("payload", {})
    before = payload.get("before", "")
    head = payload.get("head", "")
    inline_commits = payload.get("commits", [])

    print(f"[debug] PushEvent: {repo} at {event['created_at']} | inline={len(inline_commits)} | before={before[:7]} head={head[:7]}")

    # Use inline commits if present, otherwise compare before..head
    if inline_commits:
        for commit in inline_commits:
            msg = commit.get("message", "").split("\n")[0]
            short_repo = repo.replace(f"{GITHUB_USER}/", "")
            commits.append(f"[{short_repo}] {msg}")
    elif before and head and before != "0" * 40:
        compare_url = f"https://api.github.com/repos/{repo}/compare/{before}...{head}"
        print(f"[debug]   falling back to compare API: {compare_url}")
        try:
            compare = gh_get(compare_url)
            for commit in compare.get("commits", []):
                msg = commit["commit"]["message"].split("\n")[0]
                # skip bot commits
                author = commit.get("author") or {}
                if author.get("login", "").endswith("[bot]"):
                    continue
                short_repo = repo.replace(f"{GITHUB_USER}/", "")
                commits.append(f"[{short_repo}] {msg}")
                print(f"[debug]     got commit: {msg[:60]}")
        except Exception as e:
            print(f"[debug]   compare API error: {e}")

    if len(commits) >= 20:
        break

print(f"[debug] commits within 7 days: {len(commits)}")

if not commits:
    print("No recent commits found -- pulse.json unchanged.")
    sys.exit(0)

commit_text = "\n".join(commits[:20])

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
print(f"[debug] summary ({len(summary)} chars): {summary}")

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

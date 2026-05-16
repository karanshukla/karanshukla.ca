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
push_summaries = []
commit_count = 0

for event in events:
    if event.get("type") != "PushEvent":
        continue
    created_at = datetime.fromisoformat(event["created_at"].replace("Z", "+00:00"))
    if created_at < cutoff:
        continue

    repo = event["repo"]["name"]
    short_repo = repo.replace(f"{GITHUB_USER}/", "")
    payload = event.get("payload", {})
    before = payload.get("before", "")
    head = payload.get("head", "")
    inline_commits = payload.get("commits", [])

    print(f"[debug] PushEvent: {repo} at {event['created_at']} | inline={len(inline_commits)} | before={before[:7]} head={head[:7]}")

    msgs = [c.get("message", "").split("\n")[0] for c in inline_commits]
    files_info = []

    if before and head and before != "0" * 40:
        compare_url = f"https://api.github.com/repos/{repo}/compare/{before}...{head}"
        print(f"[debug]   calling compare API: {compare_url}")
        try:
            compare = gh_get(compare_url)
            if not msgs:
                for commit in compare.get("commits", []):
                    author = commit.get("author") or {}
                    if author.get("login", "").endswith("[bot]"):
                        continue
                    msgs.append(commit["commit"]["message"].split("\n")[0])
            all_files = compare.get("files", [])
            for f in all_files[:6]:
                files_info.append(f"{f['filename']} +{f.get('additions', 0)}-{f.get('deletions', 0)}")
            if len(all_files) > 6:
                files_info.append(f"...+{len(all_files) - 6} more files")
        except Exception as e:
            print(f"[debug]   compare API error: {e}")

    if not msgs:
        continue

    lines = [f"[{short_repo}] {m}" for m in msgs]
    if files_info:
        lines.append("  changed: " + ", ".join(files_info))

    push_summaries.append("\n".join(lines))
    commit_count += len(msgs)
    print(f"[debug]   {len(msgs)} commits, {len(files_info)} file entries")

    if commit_count >= 20:
        break

print(f"[debug] push events within 7 days: {len(push_summaries)}, total commits: {commit_count}")

if not push_summaries:
    print("No recent commits found -- pulse.json unchanged.")
    sys.exit(0)

commit_text = "\n\n".join(push_summaries)

# 2. Call GitHub Models (Mistral)
payload = json.dumps({
    "model": "mistral-ai/mistral-medium-2505",
    "messages": [
        {
            "role": "system",
            "content": (
                "you are a witty technical writer. summarize what a developer named karan "
                "has been working on recently based on their commit messages. write 3 simple "
                "sentences, all lowercase, casual and specific. stay under 300 characters total. "
                "no filler phrases like \"it looks like\" or \"the developer\". "
                "focus on highlighting impactful code changes and interesting code"
            ),
        },
        {
            "role": "user",
            "content": f"recent commits:\n{commit_text}",
        },
    ],
    "max_tokens": 150,
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
    "commitCount": commit_count,
}

with open(OUTPUT_PATH, "w") as f:
    json.dump(pulse, f, indent=2)
    f.write("\n")

print(f"pulse.json updated ({commit_count} commits): {summary[:80]}...")

"""
Fetches recent public commits for karanshukla and generates a witty summary
via Mistral Console API. Writes the result to src/data/pulse.json.
Run by the pulse.yml GitHub Actions workflow every 3 days.
"""

import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta

GITHUB_USER = "karanshukla"
OUTPUT_PATH = "src/data/pulse.json"
# Tried best-first; a rate-limited (429) model, or one whose output fails
# usable_summary(), falls through to the next.
MODELS = [
    "mistral-large-latest",
    "mistral-medium-latest",
    "mistral-small-latest",
    "ministral-14b-latest",
    "ministral-8b-latest",
]
# GitHubPulse.tsx clamps the summary to 4 lines; longer text gets cut mid-word.
MAX_SUMMARY_CHARS = 280

token = os.environ.get("MISTRAL_API_KEY")
if not token:
    print("MISTRAL_API_KEY is not set", file=sys.stderr)
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

    print(
        f"[debug] PushEvent: {repo} at {event['created_at']} | inline={len(inline_commits)} | before={before[:7]} head={head[:7]}"
    )

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
                files_info.append(
                    f"{f['filename']} +{f.get('additions', 0)}-{f.get('deletions', 0)}"
                )
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

print(
    f"[debug] push events within 7 days: {len(push_summaries)}, total commits: {commit_count}"
)

if not push_summaries:
    print("No recent commits found -- pulse.json unchanged.")
    sys.exit(0)

commit_text = "\n\n".join(push_summaries)

# 2. Call Mistral Console API
messages = [
    {
        "role": "system",
        "content": (
            "you write the one-line activity blurb on a software engineer's portfolio site. "
            "summarize what karan has been working on, based on the commit messages below. "
            "rules: 2-3 short sentences, all lowercase, plain text only (no markdown, "
            "asterisks, backticks or emoji). "
            f"stay under {MAX_SUMMARY_CHARS - 40} characters. "
            "write in a clear, matter-of-fact tone like a changelog written by a person: "
            "name the project and what changed. no jokes, slang, hype or exclamation marks. "
            "always say karan, never a pronoun. "
            "ignore merged prs, version bumps, dependency updates, typo fixes, test-only "
            "changes and workflow changes. mention at most three changes, most significant first.\n\n"
            "example of the right style:\n"
            "karan added a table hold warning for guests, polished the native guest app with "
            "platform-specific ui tweaks, and fixed the lookup sheet's draggable area."
        ),
    },
    {
        "role": "user",
        "content": f"recent commits:\n{commit_text}",
    },
]


def call_model(model):
    body = json.dumps(
        {
            "model": model,
            "messages": messages,
            "max_tokens": 200,
            "temperature": 0.3,
        }
    ).encode()
    req = urllib.request.Request(
        "https://api.mistral.ai/v1/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    for attempt in range(2):
        try:
            with urllib.request.urlopen(req) as resp:
                return json.loads(resp.read())
        except urllib.error.HTTPError as e:
            print(f"Model API error ({model}): {e.code} {e.read().decode()}", file=sys.stderr)
            # A 429 here is a quota, not a burst limit: waiting 15s never cleared it.
            if e.code < 500 or attempt == 1:
                return None
            print(f"[debug] retrying {model} in 15s", file=sys.stderr)
            time.sleep(15)
    return None


def usable_summary(text):
    cleaned = re.sub(r"[*_`#]", "", text).strip().strip('"').strip()
    cleaned = re.sub(r"\s+", " ", cleaned).lower()
    if not cleaned or len(cleaned) > MAX_SUMMARY_CHARS:
        return None
    return cleaned


summary = None
for model in MODELS:
    model_data = call_model(model)
    if model_data is None:
        continue
    raw = model_data["choices"][0]["message"]["content"]
    summary = usable_summary(raw)
    if summary:
        print(f"[debug] summarized with {model}")
        break
    print(f"[debug] rejected {model} output ({len(raw)} chars): {raw}")

# A rate-limited or down model must not block the build and deploy steps that
# follow this script in pulse.yml -- keep the previous summary instead, but
# surface it as a workflow warning so a stale pulse doesn't hide behind a green run.
if summary is None:
    print(f"::warning::No usable summary from {', '.join(MODELS)} -- pulse.json unchanged.")
    sys.exit(0)

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

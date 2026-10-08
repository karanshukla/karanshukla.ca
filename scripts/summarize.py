"""
Fetches recent public commits for karanshukla and generates a witty summary
via the Anthropic Messages API. Writes the result to src/data/pulse.json.
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
MODEL = "claude-haiku-5-5"
# GitHubPulse.tsx clamps the summary to 6 lines; longer text gets cut mid-word.
MAX_SUMMARY_CHARS = 400

API_BASE = "https://api.anthropic.com"
api_key = os.environ.get("ANTHROPIC_API_KEY")
FEDERATION_ENV = [
    "ANTHROPIC_FEDERATION_RULE_ID",
    "ANTHROPIC_ORGANIZATION_ID",
    "ANTHROPIC_SERVICE_ACCOUNT_ID",
]
if not api_key and not all(os.environ.get(name) for name in FEDERATION_ENV):
    print(
        "No Anthropic credentials: set ANTHROPIC_API_KEY, or "
        + ", ".join(FEDERATION_ENV)
        + " (Workload Identity Federation, GitHub Actions only)",
        file=sys.stderr,
    )
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

# 2. Call Anthropic Messages API
system_prompt = (
    "you write the one-line activity blurb on a software engineer's portfolio site. "
    "summarize what karan has been working on, based on the commit messages below. "
    "rules: two or three short sentences, all lowercase, plain text only (no markdown, "
    "asterisks, backticks or emoji). "
    f"hard limit: {MAX_SUMMARY_CHARS - 40} characters in total, so be selective. "
    "write in a clear, matter-of-fact tone like a changelog written by a person: "
    "name the project and what changed. no jokes, slang, hype or exclamation marks. "
    "always say karan, never a pronoun. "
    "ignore merged prs, version bumps, dependency updates, typo fixes, test-only "
    "changes and workflow changes. mention at most three changes, most significant first.\n\n"
    "example of the right style:\n"
    "karan added a table hold warning for guests, polished the native guest app with "
    "platform-specific ui tweaks, and fixed the lookup sheet's draggable area."
)
messages = [{"role": "user", "content": f"recent commits:\n{commit_text}"}]


def github_identity_token():
    request_url = os.environ["ACTIONS_ID_TOKEN_REQUEST_URL"]
    req = urllib.request.Request(
        f"{request_url}&audience={API_BASE}",
        headers={
            "Authorization": f"Bearer {os.environ['ACTIONS_ID_TOKEN_REQUEST_TOKEN']}",
            "User-Agent": "pulse-summarizer/1.0",
        },
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())["value"]


def exchange_for_access_token():
    # Identity tokens are single-use, so every exchange needs a freshly minted one.
    payload = {
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": github_identity_token(),
        "federation_rule_id": os.environ["ANTHROPIC_FEDERATION_RULE_ID"],
        "organization_id": os.environ["ANTHROPIC_ORGANIZATION_ID"],
        "service_account_id": os.environ["ANTHROPIC_SERVICE_ACCOUNT_ID"],
    }
    workspace_id = os.environ.get("ANTHROPIC_WORKSPACE_ID")
    if workspace_id:
        payload["workspace_id"] = workspace_id
    req = urllib.request.Request(
        f"{API_BASE}/v1/oauth/token",
        data=json.dumps(payload).encode(),
        headers={"content-type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())["access_token"]


def auth_headers():
    if api_key:
        return {"x-api-key": api_key}
    return {"authorization": f"Bearer {exchange_for_access_token()}"}


def call_model(conversation):
    body = json.dumps(
        {
            "model": MODEL,
            "max_tokens": 1024,
            "output_config": {"effort": "low"},
            "system": system_prompt,
            "messages": conversation,
        }
    ).encode()
    for attempt in range(2):
        try:
            req = urllib.request.Request(
                f"{API_BASE}/v1/messages",
                data=body,
                headers={
                    **auth_headers(),
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                method="POST",
            )
            with urllib.request.urlopen(req) as resp:
                return json.loads(resp.read())
        except urllib.error.HTTPError as e:
            print(f"Model API error ({MODEL}): {e.code} {e.read().decode()}", file=sys.stderr)
            if e.code not in (429, 529) and e.code < 500 or attempt == 1:
                return None
            print(f"[debug] retrying {MODEL} in 15s", file=sys.stderr)
            time.sleep(15)
    return None


def usable_summary(text):
    cleaned = re.sub(r"[*_`#]", "", text).strip().strip('"').strip()
    cleaned = re.sub(r"\s+", " ", cleaned).lower()
    if not cleaned or len(cleaned) > MAX_SUMMARY_CHARS:
        return None
    return cleaned


def summary_text(model_data):
    return "".join(
        block.get("text", "")
        for block in model_data.get("content", [])
        if block.get("type") == "text"
    )


summary = None
conversation = messages
for attempt in range(2):
    model_data = call_model(conversation)
    if model_data is None:
        break
    raw = summary_text(model_data)
    summary = usable_summary(raw)
    if summary:
        print(f"[debug] summarized with {MODEL}")
        break
    print(f"[debug] rejected {MODEL} output ({len(raw)} chars): {raw}")
    conversation = messages + [
        {"role": "assistant", "content": raw},
        {
            "role": "user",
            "content": (
                f"that was {len(raw)} characters. rewrite it as two or three short sentences under "
                f"{MAX_SUMMARY_CHARS - 40} characters, keeping only the most significant changes."
            ),
        },
    ]

# A rate-limited or down API must not block the build and deploy steps that
# follow this script in pulse.yml -- keep the previous summary instead, but
# surface it as a workflow warning so a stale pulse doesn't hide behind a green run.
if summary is None:
    print(f"::warning::No usable summary from {MODEL} -- pulse.json unchanged.")
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

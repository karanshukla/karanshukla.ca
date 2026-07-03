"""
Publishes site.standard.publication and site.standard.document records to
the karanshukla.ca PDS so blog posts show up in Standard.site readers (e.g.
standard-reader.app). See https://standard.site for the lexicon spec.

Idempotent: keeps a manifest at src/data/standardSiteRecords.json mapping
each post slug to its record AT-URI/CID plus a content hash, so re-runs
only create/update records that actually changed, and delete records for
posts that have been removed. Run by the standard-site.yml GitHub Actions
workflow whenever a file under src/data/posts/ changes.
"""

import hashlib
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

PDS_URL = os.environ.get("PDS_URL") or "https://pds.karanshukla.ca"
# Accepts either a handle or a DID (com.atproto.server.createSession takes
# either). Prefer a DID here since it never changes even if the handle does -
# record creation resolves to the account's DID either way, so this only
# affects login, not the records themselves.
IDENTIFIER = os.environ.get("PDS_IDENTIFIER") or "karanshukla.ca"
PASSWORD = os.environ.get("PDS_APP_PASSWORD")

SITE_URL = "https://karanshukla.ca"
PUBLICATION_NAME = "Karan Shukla"
PUBLICATION_DESCRIPTION = "Personal website and blog of Karan Shukla."

POSTS_DIR = "src/data/posts"
MANIFEST_PATH = "src/data/standardSiteRecords.json"
WELL_KNOWN_PATH = "public/.well-known/site.standard.publication"

if not PASSWORD:
    print("PDS_APP_PASSWORD is not set", file=sys.stderr)
    sys.exit(1)


def xrpc(method, nsid, token=None, body=None):
    req = urllib.request.Request(
        f"{PDS_URL}/xrpc/{nsid}",
        data=json.dumps(body).encode() if body is not None else None,
        method=method,
        headers={"Content-Type": "application/json"},
    )
    if token:
        req.add_header("Authorization", f"Bearer {token}")
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"{method} {nsid} failed: {e.code} {e.read().decode()}", file=sys.stderr)
        raise


def parse_frontmatter(raw):
    match = re.match(r"^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$", raw)
    if not match:
        return {}, raw
    data = {}
    for line in match.group(1).split("\n"):
        if not line.strip():
            continue
        key, _, value = line.partition(":")
        data[key.strip()] = value.strip()
    return data, match.group(2)


def markdown_to_text(md):
    text = re.sub(r"```.*?```", "", md, flags=re.S)
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", text)
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)
    text = re.sub(r"^#{1,6}\s*", "", text, flags=re.M)
    text = re.sub(r"[*_>#-]", "", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def load_posts():
    posts = []
    for filename in sorted(os.listdir(POSTS_DIR)):
        if not filename.endswith(".md"):
            continue
        slug = filename[: -len(".md")]
        with open(os.path.join(POSTS_DIR, filename), encoding="utf-8") as f:
            data, content = parse_frontmatter(f.read())
        posts.append(
            {
                "slug": slug,
                "title": data.get("title", slug),
                "date": data.get("date", ""),
                "description": data.get("description", ""),
                "content": content,
            }
        )
    return posts


def load_manifest():
    if os.path.exists(MANIFEST_PATH):
        with open(MANIFEST_PATH, encoding="utf-8") as f:
            return json.load(f)
    return {"publication": None, "posts": {}}


def save_manifest(manifest):
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, sort_keys=True)
        f.write("\n")


def to_iso(date_str):
    try:
        dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    except ValueError:
        dt = datetime.now(timezone.utc)
    return dt.isoformat().replace("+00:00", "Z")


def now_iso():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


# Bump this whenever the shape/content of the generated record changes (e.g.
# the path format) so existing posts get republished even though their
# source markdown didn't change.
RECORD_SCHEMA_VERSION = 2


def content_hash(post):
    payload = (
        f"{RECORD_SCHEMA_VERSION}|{post['title']}|{post['description']}|"
        f"{post['date']}|{post['content']}"
    )
    return hashlib.sha256(payload.encode()).hexdigest()


session = xrpc(
    "POST",
    "com.atproto.server.createSession",
    body={"identifier": IDENTIFIER, "password": PASSWORD},
)
token = session["accessJwt"]
did = session["did"]

manifest = load_manifest()
changed = False

if not manifest.get("publication"):
    record = {
        "$type": "site.standard.publication",
        "url": SITE_URL,
        "name": PUBLICATION_NAME,
        "description": PUBLICATION_DESCRIPTION,
    }
    result = xrpc(
        "POST",
        "com.atproto.repo.createRecord",
        token=token,
        body={
            "repo": did,
            "collection": "site.standard.publication",
            "record": record,
            "validate": False,
        },
    )
    manifest["publication"] = {"uri": result["uri"], "cid": result["cid"]}
    changed = True
    print(f"Created publication record: {result['uri']}")

    os.makedirs(os.path.dirname(WELL_KNOWN_PATH), exist_ok=True)
    with open(WELL_KNOWN_PATH, "w", encoding="utf-8") as f:
        f.write(result["uri"] + "\n")

publication_uri = manifest["publication"]["uri"]
posts = load_posts()
seen_slugs = set()

for post in posts:
    seen_slugs.add(post["slug"])
    digest = content_hash(post)
    existing = manifest["posts"].get(post["slug"])

    if existing and existing.get("hash") == digest:
        continue

    record = {
        "$type": "site.standard.document",
        "site": publication_uri,
        "title": post["title"],
        "publishedAt": to_iso(post["date"]),
        # This site uses a hash router (see src/main.tsx), so the real,
        # resolvable URL for a post is /#/blog/<slug> - a bare /blog/<slug>
        # 404s on GitHub Pages since there's no SPA fallback.
        "path": f"/#/blog/{post['slug']}",
        "description": post["description"],
        "textContent": markdown_to_text(post["content"]),
    }

    if existing:
        record["updatedAt"] = now_iso()
        rkey = existing["uri"].rsplit("/", 1)[-1]
        result = xrpc(
            "POST",
            "com.atproto.repo.putRecord",
            token=token,
            body={
                "repo": did,
                "collection": "site.standard.document",
                "rkey": rkey,
                "record": record,
                "validate": False,
            },
        )
        print(f"Updated document record for '{post['slug']}': {result['uri']}")
    else:
        result = xrpc(
            "POST",
            "com.atproto.repo.createRecord",
            token=token,
            body={
                "repo": did,
                "collection": "site.standard.document",
                "record": record,
                "validate": False,
            },
        )
        print(f"Created document record for '{post['slug']}': {result['uri']}")

    manifest["posts"][post["slug"]] = {
        "uri": result["uri"],
        "cid": result["cid"],
        "hash": digest,
    }
    changed = True

for slug in set(manifest["posts"]) - seen_slugs:
    existing = manifest["posts"][slug]
    rkey = existing["uri"].rsplit("/", 1)[-1]
    xrpc(
        "POST",
        "com.atproto.repo.deleteRecord",
        token=token,
        body={"repo": did, "collection": "site.standard.document", "rkey": rkey},
    )
    del manifest["posts"][slug]
    changed = True
    print(f"Deleted document record for removed post '{slug}'")

if changed:
    save_manifest(manifest)
    print("standardSiteRecords.json updated.")
else:
    print("No changes to publish.")

"""
Reads the most recent song from YouTube Music history (via the unofficial
ytmusicapi library) and writes it to now-playing.json for NowPlayingWidget.
Run by the now-playing.yml GitHub Actions workflow, which publishes the file
to the `now-playing` branch.

Env: YTMUSIC_OAUTH_TOKEN (contents of the oauth.json made by `ytmusicapi oauth`),
YTMUSIC_CLIENT_ID, YTMUSIC_CLIENT_SECRET (the Google OAuth client that made it).

Writes the file only when the track changes and prints `changed=true|false`
to $GITHUB_OUTPUT. Exits 1 if YouTube Music can't be read, so an expired
token shows up as a failed run.
"""

import json
import os
import re
import sys
from datetime import datetime, timezone

import requests

OUTPUT_PATH = sys.argv[1] if len(sys.argv) > 1 else "now-playing.json"
LISTENBRAINZ_LOOKUP_URL = "https://api.listenbrainz.org/1/metadata/lookup/"
MAX_TAGS = 3
THUMBNAIL_SIZE = 240


def load_previous():
    try:
        with open(OUTPUT_PATH) as f:
            return json.load(f)
    except Exception:
        return None


def latest_history_item():
    from ytmusicapi import OAuthCredentials, YTMusic

    token = json.loads(os.environ["YTMUSIC_OAUTH_TOKEN"])
    credentials = OAuthCredentials(
        client_id=os.environ["YTMUSIC_CLIENT_ID"],
        client_secret=os.environ["YTMUSIC_CLIENT_SECRET"],
    )
    history = YTMusic(auth=token, oauth_credentials=credentials).get_history()
    return history[0] if history else None


def largest_thumbnail(thumbnails):
    if not thumbnails:
        return ""
    url = max(thumbnails, key=lambda t: t.get("width", 0))["url"]
    # googleusercontent thumbnails encode their size in the URL and can be re-requested larger
    return re.sub(r"=w\d+-h\d+", f"=w{THUMBNAIL_SIZE}-h{THUMBNAIL_SIZE}", url)


def lookup_tags(artist, title):
    try:
        res = requests.get(
            LISTENBRAINZ_LOOKUP_URL,
            params={"artist_name": artist, "recording_name": title, "metadata": "true", "inc": "tag"},
            timeout=10,
        )
        tag_groups = (res.json().get("metadata") or {}).get("tag") or {}
    except Exception:
        return []
    for group in ("recording", "artist", "release_group"):
        tags = sorted(tag_groups.get(group) or [], key=lambda t: t.get("count", 0), reverse=True)
        names = []
        for tag in tags:
            name = tag.get("tag", "").lower()
            if name and name not in names:
                names.append(name)
        if names:
            return names[:MAX_TAGS]
    return []


def build_track(item, previous, now, find_tags):
    artist = ", ".join(a["name"] for a in item.get("artists") or [] if a.get("name"))
    same_track = previous is not None and previous.get("videoId") == item["videoId"]
    return {
        "videoId": item["videoId"],
        "title": item["title"],
        "artist": artist,
        "album": (item.get("album") or {}).get("name") or "",
        "imageUrl": largest_thumbnail(item.get("thumbnails")),
        "url": f"https://music.youtube.com/watch?v={item['videoId']}",
        "played": (item.get("played") or "").lower(),
        "tags": previous["tags"] if same_track else find_tags(artist, item["title"]),
        "firstSeenAt": previous["firstSeenAt"] if same_track else now,
    }


def write_output(changed):
    output = os.environ.get("GITHUB_OUTPUT")
    if output:
        with open(output, "a") as f:
            f.write(f"changed={'true' if changed else 'false'}\n")
    print(f"changed={changed}")


def main():
    previous = load_previous()
    try:
        item = latest_history_item()
    except Exception as e:
        print(f"Could not read YouTube Music history: {e}", file=sys.stderr)
        sys.exit(1)
    if item is None or not item.get("videoId"):
        write_output(False)
        return

    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    track = build_track(item, previous, now, lookup_tags)
    if track == previous:
        write_output(False)
        return

    with open(OUTPUT_PATH, "w") as f:
        json.dump(track, f, indent=2)
        f.write("\n")
    write_output(True)


if __name__ == "__main__":
    main()

"""
Parses test coverage (karan-resume/coverage/coverage-summary.json) and the
most recent Lighthouse CI report (karan-resume/.lighthouseci/lhr-*.json),
then writes karan-resume/src/data/stats.json.
Run by the stats.yml GitHub Actions workflow.
"""

import glob
import json
import os
import sys
from datetime import datetime, timezone

COVERAGE_PATH = "karan-resume/coverage/coverage-summary.json"
LHCI_GLOB = "karan-resume/.lighthouseci/lhr-*.json"
OUTPUT_PATH = "karan-resume/src/data/stats.json"

# Load existing stats as fallback so a partial failure keeps old values
try:
    with open(OUTPUT_PATH) as f:
        existing = json.load(f)
except Exception:
    existing = {"coverage": {"lines": 0, "statements": 0, "branches": 0, "functions": 0},
                "lighthouse": {"accessibility": 0, "performance": 0, "lcp": 0, "cls": 0}}

# ── Coverage ──────────────────────────────────────────────────────────────────
coverage = existing.get("coverage", {})
try:
    with open(COVERAGE_PATH) as f:
        cov = json.load(f)
    total = cov.get("total", {})
    coverage = {
        "lines":      round(total.get("lines",      {}).get("pct", 0), 1),
        "statements": round(total.get("statements", {}).get("pct", 0), 1),
        "branches":   round(total.get("branches",   {}).get("pct", 0), 1),
        "functions":  round(total.get("functions",  {}).get("pct", 0), 1),
    }
    print(f"[stats] coverage lines={coverage['lines']}% statements={coverage['statements']}%"
          f" branches={coverage['branches']}% functions={coverage['functions']}%")
except Exception as e:
    print(f"[stats] coverage unavailable: {e}", file=sys.stderr)

# ── Lighthouse ────────────────────────────────────────────────────────────────
lighthouse = existing.get("lighthouse", {})
lhci_files = sorted(glob.glob(LHCI_GLOB), key=os.path.getmtime)
if lhci_files:
    latest = lhci_files[-1]
    print(f"[stats] reading lighthouse report: {latest}")
    try:
        with open(latest) as f:
            lhr = json.load(f)
        lighthouse = {
            "accessibility": round(lhr["categories"]["accessibility"]["score"] * 100),
            "performance":   round(lhr["categories"]["performance"]["score"] * 100),
            "lcp": round(lhr["audits"]["largest-contentful-paint"]["numericValue"]),
            "cls": round(lhr["audits"]["cumulative-layout-shift"]["numericValue"], 3),
        }
        print(f"[stats] lighthouse a11y={lighthouse['accessibility']} perf={lighthouse['performance']}"
              f" lcp={lighthouse['lcp']}ms cls={lighthouse['cls']}")
    except Exception as e:
        print(f"[stats] lighthouse parse error: {e}", file=sys.stderr)
else:
    print("[stats] no lighthouse reports found, keeping previous values", file=sys.stderr)

# ── Write ─────────────────────────────────────────────────────────────────────
stats = {
    "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z"),
    "coverage": coverage,
    "lighthouse": lighthouse,
}

with open(OUTPUT_PATH, "w") as f:
    json.dump(stats, f, indent=2)
    f.write("\n")

print(f"[stats] wrote {OUTPUT_PATH}")

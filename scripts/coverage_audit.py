"""Check that every file in the Purview pack and its NotebookLM output folder is reachable on the site.

Usage: python scripts/coverage_audit.py [--all]
Prints one line per file: where it lives on the site, or MISSING. Exits 1 if anything is MISSING.
"""
import hashlib
import importlib.util
import json
import re
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("bl", SITE / "scripts" / "build_library.py")
bl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bl)
spec2 = importlib.util.spec_from_file_location("sa", SITE / "scripts" / "stage_assets.py")
sa = importlib.util.module_from_spec(spec2)
spec2.loader.exec_module(sa)

PACK, OUT = bl.PACK, bl.OUT
SKIP_DIRS = {"_deep_dive_cut"}  # video build intermediates: segments, card renders, narration clips
EMPTY_OK = {"NOTES.md"}  # empty scratch note

md5 = lambda p: hashlib.md5(p.read_bytes()).hexdigest()
pages = {}
for slug, path, *_ in bl.PAGES:
    pages[str(Path(path).resolve()).lower()] = slug
site_files = {p.name.lower(): p for p in SITE.rglob("*") if p.is_file() and ".git" not in p.parts}
lib_hashes = {}
for key, slug in pages.items():
    p = Path(key)
    if p.is_file():
        lib_hashes[md5(p)] = slug
catalog = json.loads((SITE / "shorts-catalog.json").read_text(encoding="utf-8"))
yt_by_title = {src.lower(): catalog_id for catalog_id, src, *_ in sa.SHORTS}
yt_ids = {it["id"]: it.get("youtube") for it in catalog["items"]}
special = {
    "fixing microsoft purview technical curriculum gaps.m4a": "media/audio-overview.m4a (Deck page)",
    "microsoft purview technical blueprint.pdf": "assets/downloads/purview-technical-blueprint.pdf (Deck page)",
    "tdd-microsoft-purview-presentation.pptx": "assets/downloads/purview-deck.pptx (Deck page)",
    "tdd-microsoft-purview-deep-dive-cut.mp4": f"YouTube {catalog.get('deep_dive', {}).get('youtube', '?')} (Deck page)",
}
gap_md = {"glossary-gap-table.csv": "nblm-gap-table", "glossary-gap-quiz.json": "nblm-gap-quiz",
          "glossary-gap-flashcards.json": "nblm-gap-cards", "general-quiz.json": "nblm-general-quiz",
          "general-flashcards.json": "nblm-general-cards"}


def where(p: Path):
    key = str(p.resolve()).lower()
    if key in pages:
        return f"library/{pages[key]}.html"
    if p.parent.name == "diagrams" and str(p.parent.resolve()).lower() in pages and p.name.lower() in site_files:
        return f"assets/diagrams/{p.name} (library/diagram-sources.html)"
    n = p.name.lower()
    if n in special:
        return special[n]
    if n in gap_md:
        return f"library/{gap_md[n]}.html (converted)"
    m = re.fullmatch(r"slide(\d+)\.jpg", n)
    if m:
        return f"assets/slides/slide-{int(m.group(1)):02d}.jpg (Deck page)"
    if p.suffix.lower() == ".mp4" and p.stem.lower() in yt_by_title:
        cid = yt_by_title[p.stem.lower()]
        return f"YouTube {yt_ids.get(cid)} (Shorts: {cid})"
    if p.suffix.lower() in (".md", ".csv", ".json") and md5(p) in lib_hashes:
        return f"library/{lib_hashes[md5(p)]}.html (identical copy)"
    if n in ("shorts-topics.json", "shorts-manifest.json"):
        return "library/media-shorts-plan.html (plan and manifest)"
    if n in site_files:
        return f"site file {site_files[n].relative_to(SITE)}"
    if p.name in EMPTY_OK and not p.read_text(encoding="utf-8").split("---", 2)[-1].strip().replace("#", "").replace("NOTES — Microsoft Purview", "").replace("Scratch", "").strip():
        return "EXCLUDED (empty)"
    return None


missing = 0
for root in (PACK, OUT):
    print(f"\n== {root}")
    for p in sorted(root.rglob("*")):
        if not p.is_file() or SKIP_DIRS & set(p.parts):
            continue
        w = where(p)
        if w is None:
            missing += 1
            print(f"MISSING  {p.relative_to(root)}")
        elif "--all" in sys.argv:
            print(f"ok       {p.relative_to(root)}  ->  {w}")
print(f"\nskipped build intermediates: {sum(1 for _ in (OUT / '_deep_dive_cut').rglob('*'))} files in _deep_dive_cut")
print(f"{missing} missing")
sys.exit(1 if missing else 0)

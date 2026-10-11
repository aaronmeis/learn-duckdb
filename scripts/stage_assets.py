"""Stage DuckDB media. YouTube IDs stay empty until an unlisted upload exists."""
import json
import shutil
import subprocess
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
NBLM = Path(r"C:\output\obsidian\notebooklm\odm-duckdb")
PACK = NBLM / "NEXUS _ odm-duckdb _ 2026-10-10 _ one-day-mastery"
SLIDES = NBLM / "odm-duckdb-presentation"
CUT = NBLM / "odm-duckdb-deep-dive-cut.mp4"

SHORTS = [
    ("01-bypass", "How DuckDB Bypasses the Network.mp4", "How DuckDB stays in the process", "Block 1", "Placement", ["process", "socket", "network"]),
    ("02-billion", "How DuckDB Queries Billions Instantly.mp4", "How a scan stays fast", "Block 2", "Engine", ["scan", "column", "parquet"]),
    ("03-vector", "How DuckDB Vectorized Execution Works.mp4", "How vectorized execution works", "Block 2", "Engine", ["vector", "2048", "datachunk"]),
    ("04-choose", "When to Choose DuckDB for Your Stack.mp4", "When to choose DuckDB", "Block 1", "Placement", ["sqlite", "postgres", "spark"]),
    ("05-writer", "Why DuckDB Fails At Concurrent Writes.mp4", "Why a second writer fails", "Block 3", "Operations", ["writer", "lock", "read-only"]),
    ("06-simultaneous", "Why DuckDB Fails on Simultaneous Writes.mp4", "Simultaneous writes", "Block 3", "Operations", ["transaction", "conflict"]),
]
YOUTUBE = {name: "" for name, *_ in SHORTS}
YOUTUBE["deep-dive-cut"] = ""


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True).stdout
    return float(out.strip())


def copy(src: Path, dst: Path):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def main():
    items = []
    for name, src_name, title, tag, pillar, keywords in SHORTS:
        src = next(PACK.glob(src_name.replace(".mp4", "*")))
        mp4 = SITE / "media" / "shorts" / f"{name}.mp4"
        copy(src, mp4)
        poster = SITE / "media" / "posters" / f"{name}.jpg"
        poster.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "2", "-i", str(mp4), "-frames:v", "1",
                        "-vf", "scale=360:-2", str(poster)], check=True)
        items.append({
            "id": name, "name": name, "title": title, "tag": tag, "pillar": pillar, "keywords": keywords,
            "duration": round(duration(mp4)), "poster": f"media/posters/{name}.jpg",
            "file": f"media/shorts/{name}.mp4", "youtube": "", "status": "ready"})
    copy(CUT, SITE / "media" / "deep-dive-cut.mp4")
    slides = SITE / "assets" / "slides"
    slides.mkdir(parents=True, exist_ok=True)
    for i, src in enumerate(sorted(SLIDES.glob("Slide*.JPG"), key=lambda p: int("".join(ch for ch in p.stem if ch.isdigit()))), start=1):
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-vf", "scale=1600:-2",
                        str(slides / f"slide-{i:02d}.jpg")], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(SLIDES / "Slide1.JPG"), "-vf", "scale=640:-2",
                    str(SITE / "assets" / "hero.jpg")], check=True)
    for n, slide in ((100, 1), (200, 5), (300, 8)):
        copy(slides / f"slide-{slide:02d}.jpg", SITE / "assets" / f"{n}.jpg")
    catalog = {
        "notebook_alias": "odm-duckdb",
        "title": "Learn DuckDB - NotebookLM shorts",
        "deep_dive": {"file": "media/deep-dive-cut.mp4", "youtube": ""},
        "total": len(items), "ready": len(items), "items": items}
    (SITE / "shorts-catalog.json").write_text(json.dumps(catalog, indent=2), encoding="utf-8")
    (SITE / "shorts-catalog.js").write_text("window.SHORTS = " + json.dumps(catalog) + ";\n", encoding="utf-8")
    print("staged", len(items), "shorts and the deep-dive cut")


if __name__ == "__main__":
    main()

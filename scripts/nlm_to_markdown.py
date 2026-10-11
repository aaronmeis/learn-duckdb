"""Convert NotebookLM data-table CSV, quiz JSON, and flashcards JSON into Obsidian markdown notes.

Usage:
  python scripts/nlm_to_markdown.py table  <in.csv>  <out.md> "<title>" [--review review.json]
  python scripts/nlm_to_markdown.py quiz   <in.json> <out.md> "<title>" [--review review.json]
  python scripts/nlm_to_markdown.py cards  <in.json> <out.md> "<title>" [--review review.json]

review.json (optional) maps a row key (table: Term; quiz: 1-based question number; cards: 1-based card number)
to a short review note, shown in a Review column or line. Vault rule: JSON/CSV never lands in the vault as-is.
"""
import csv
import json
import sys
from datetime import date
from pathlib import Path

TOPIC = "microsoft-purview"
NOTEBOOK = "tdd-microsoft-purview (d00ca45f-85c4-4f11-8793-f48374114e95)"


def cell(s):
    return str(s).replace("|", "\\|").replace("\n", " ").strip()


def frontmatter(title, kind, src):
    return (
        "---\n"
        f"type: learning\nlayer: learning\ntopic: {TOPIC}\nagent: claude\nsource: notebooklm\nstatus: active\n"
        f"created: {date.today()}\nupdated: {date.today()}\n"
        f"tags: [learning, tech-deep-dive, notebooklm, {kind}, {TOPIC}]\n"
        'ontology_version: "1.0"\n'
        f'description: "{title}. NotebookLM {kind} from notebook {NOTEBOOK}, converted to markdown."\n'
        "---\n\n"
        f"# {title}\n\n"
        f"**Location:** `{{location}}`\n\n"
        f"> [!warning] NotebookLM output, reviewed\n>\n> Generated from the notebook's sources on {date.today()}. "
        "Heavy original: `" + src + "`. The Review notes record what was kept, corrected, or dropped "
        "against the source ledger before anything reached the study site.\n\n"
    )


def table(src, review):
    rows = list(csv.DictReader(open(src, encoding="utf-8-sig")))
    cols = list(rows[0].keys()) + (["Review"] if review else [])
    out = "| # | " + " | ".join(cols) + " |\n|---|" + "---|" * len(cols) + "\n"
    for i, r in enumerate(rows, 1):
        vals = [cell(r[c]) for c in rows[0].keys()]
        if review:
            vals.append(cell(review.get(r[list(r.keys())[0]], "")))
        out += f"| {i} | " + " | ".join(vals) + " |\n"
    return out, len(rows)


def quiz(src, review):
    data = json.load(open(src, encoding="utf-8"))
    out = ""
    for i, q in enumerate(data["questions"], 1):
        out += f"### Q{i}. {q['question']}\n\n*Type:* {q['type'].replace('_', ' ')}\n\n"
        for o in q.get("answerOptions", []):
            mark = "**[correct]**" if o["isCorrect"] else ""
            out += f"- {o['text']} {mark}\n"
            if o["isCorrect"] and o.get("rationale"):
                out += f"  - *Why:* {o['rationale']}\n"
        if "bestAnswer" in q:
            out += f"- **Answer:** {q['bestAnswer']}" + (f" (also accepted: {', '.join(q.get('acceptableAnswers', []))})" if q.get("acceptableAnswers") else "") + "\n"
            if q.get("rationale"):
                out += f"  - *Why:* {q['rationale']}\n"
        if "grading" in q:
            out += f"- **Model answer:** {q['grading']['modelAnswer']}\n"
        if q.get("hint"):
            out += f"- *Hint:* {q['hint']}\n"
        if review.get(str(i)):
            out += f"\n> [!note] Review\n> {review[str(i)]}\n"
        out += "\n"
    return out, len(data["questions"])


def cards(src, review):
    data = json.load(open(src, encoding="utf-8"))
    cs = data.get("cards") or data.get("flashcards") or []
    out = "| # | Front | Back | Review |\n|---|---|---|---|\n"
    for i, c in enumerate(cs, 1):
        out += f"| {i} | {cell(c['front'])} | {cell(c['back'])} | {cell(review.get(str(i), ''))} |\n"
    return out, len(cs)


def main():
    kind, src, dst, title = sys.argv[1:5]
    review = {}
    if "--review" in sys.argv:
        review = json.load(open(sys.argv[sys.argv.index("--review") + 1], encoding="utf-8"))
    body, n = {"table": table, "quiz": quiz, "cards": cards}[kind](src, review)
    label = {"table": "data-table", "quiz": "quiz", "cards": "flashcards"}[kind]
    text = frontmatter(title, label, src).replace("{location}", str(Path(dst))) + f"**Items:** {n}\n\n" + body
    Path(dst).write_text(text, encoding="utf-8")
    print(f"wrote {dst} ({n} items)")


if __name__ == "__main__":
    main()

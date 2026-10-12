# Learn DuckDB

Study console for the DuckDB one-day pack: in-process OLAP, vectorized execution, concurrency tiers (native file / Quack / DuckLake), and the line between a local process and MotherDuck.

**Live:** https://aaronmeis.github.io/learn-duckdb/

**Pack:** `Learning/one-day-mastery/duckdb/` in the Obsidian vault. The source ledger on the site matches that note. NotebookLM reports are secondary. Slide speed claims are not an SLA.

**Checked against:** DuckDB 1.5.6 / 1.4.5 LTS on 2026-10-11.

## Run locally

```bash
python -m http.server 8000
```

Open http://localhost:8000/ (hash routes like `#/glossary` work without a rewrite).

## What's here

- **Today:** daily challenge, failure modes, placement drills
- **Learn:** study blocks, deck, shorts, library of vault notes
- **Practice:** flashcards, quiz, study prompts
- **Reference:** cheatsheet, glossary, debates, source ledger

## File map

| Path | Role |
|------|------|
| `index.html` | App shell |
| `js/data.js` | Curriculum, glossary, quiz, sources, debates |
| `js/app.js` / `js/enhance.js` | Views and Today challenge |
| `library/` | Static HTML notes |
| `media/` | Deep-dive cut and shorts (MP4) |
| `assets/slides/` | Deck images |
| `sw.js` | Offline shell (network-first; video not cached) |

Storage prefix is `ld:` because this origin is shared with other learn-* sites.

## Sources and freshness

Primary claims cite the source ledger (`#/refs`). Quack and DuckLake multi-writer paths are documented on duckdb.org / ducklake.select; a native `.duckdb` file still has one read-write process (or many `READ_ONLY`). Re-check after DuckDB 2.0 ships.

No Python, operator scripts, or credentials live in this public repo.

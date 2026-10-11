const SOURCES = [
  {n:1,g:"Official docs",t:"DuckDB documentation",u:"https://duckdb.org/docs/current/index",type:"docs",trust:"high",b:"1"},
  {n:2,g:"Official docs",t:"Execution format (Vector and DataChunk)",u:"https://duckdb.org/docs/current/internals/vector.html",type:"docs",trust:"high",b:"2"},
  {n:3,g:"Official docs",t:"Concurrency",u:"https://duckdb.org/docs/stable/connect/concurrency.html",type:"docs",trust:"high",b:"5"},
  {n:4,g:"Papers",t:"DuckDB: an Embeddable Analytical Database (SIGMOD 2019)",u:"https://doi.org/10.1145/3299869.3320212",type:"paper",trust:"high",b:"1,2"},
  {n:5,g:"Talks",t:"Hannes Mühleisen, Developer Voices (2024)",u:"https://www.youtube.com/watch?v=pZV9FvdKmLc",type:"video",trust:"high",b:"2,4"},
  {n:6,g:"Talks",t:"Hannes Mühleisen, TigerBeetle overview (2023)",u:"https://www.youtube.com/watch?v=qWtc7k6tnVk",type:"video",trust:"high",b:"2"},
  {n:7,g:"Papers",t:"MonetDBLite (SIGMOD 2018)",u:"https://doi.org/10.1145/3183713.3183722",type:"paper",trust:"high",b:"2"},
  {n:8,g:"Cloud",t:"MotherDuck architecture and capabilities",u:"https://motherduck.com/docs/concepts/architecture-and-capabilities/",type:"docs",trust:"high",b:"5"},
  {n:9,g:"Papers",t:"MotherDuck: DuckDB in the cloud and in the client (CIDR 2024)",u:"https://www.vldb.org/cidrdb/papers/2024/p46-atwal.pdf",type:"paper",trust:"high",b:"5"},
  {n:10,g:"Official docs",t:"Securing DuckDB extensions",u:"https://duckdb.org/docs/stable/operations_manual/securing_duckdb/securing_extensions",type:"docs",trust:"high",b:"5"},
  {n:11,g:"Nearby work",t:"Smaug: TEE-assisted SQLite (2023)",u:"https://doi.org/10.1109/TDSC.2022.3216020",type:"paper",trust:"high",b:"5"},
  {n:12,g:"Nearby work",t:"BiTDB: TEE database for embedded systems (2024)",u:"https://doi.org/10.1109/TKDE.2024.3380367",type:"paper",trust:"high",b:"5"},
  {n:13,g:"Papers",t:"Modern alternatives to Hive (2026)",u:"https://doi.org/10.1016/j.is.2025.102635",type:"paper",trust:"medium",b:"7"}
];

const DATA = {
  weeks:[
    {n:1,title:"Placement",time:"25 min",rungs:"100",lib:"block-01-core-concepts",
     opener:"DuckDB is in-process OLAP. SQLite is in-process OLTP. Postgres is a server of record. A warehouse is client-server OLAP [S4].",
     obj:"Name the missing quadrant and the tool you would not pick.",
     deliv:"Two sentences: what DuckDB is, and one workload you refuse.",
     mods:[
       {t:"In-process versus client-server [S4]",rl:"scope · 100", action:"Write the hop you remove: the socket and the copy of each result row.", whyMatters:"A design that treats DuckDB as Postgres starts in the wrong quadrant."},
       {t:"The four-box map [S4]",rl:"scope · 100", action:"Place SQLite, Postgres, Snowflake, and DuckDB on OLTP/OLAP and embedded/server.", whyMatters:"SQLite already owns embedded transactions."}
     ],
     vids:[{s:4},{s:6}]},
    {n:2,title:"Columnar storage",time:"20 min",rungs:"100",lib:"block-01-core-concepts",
     opener:"Values of one column sit together. A SUM reads that column and skips the rest [S2].",
     obj:"Say why a row store wastes I/O on a two-column query of a wide table.",
     deliv:"One sketch: a SUM of amount that does not read name.",
     mods:[
       {t:"Column versus row [S2]",rl:"engine · 100", action:"Draw a 4-column table both ways and circle what SUM(amount) reads.", whyMatters:"This is the I/O win, before any DuckDB-specific term."},
       {t:"OLAP versus OLTP [S4]",rl:"scope · 100", action:"Name a query that belongs in each box.", whyMatters:"A point lookup of one order is not DuckDB's job."}
     ],
     vids:[{s:2},{s:4}]},
    {n:3,title:"Vectors and DataChunk",time:"30 min",rungs:"200",lib:"block-02-mental-models",
     opener:"Operators process a batch, not one row. The default batch is 2048 tuples, STANDARD_VECTOR_SIZE [S2].",
     obj:"Contrast Volcano with a DataChunk.",
     deliv:"One sentence on why 2048 sits in cache, and what changing that constant costs.",
     mods:[
       {t:"Volcano versus a chunk [S2]",rl:"engine · 200", action:"Name the function-call cost of next() per row.", whyMatters:"Postgres and SQLite still pull one tuple at a time."},
       {t:"Vector layouts",rl:"engine · 200", action:"Define flat, dictionary, constant, and sequence vectors in one line each.", whyMatters:"A constant + 5 is stored once, not 2048 times."}
     ],
     vids:[{s:2},{s:5}]},
    {n:4,title:"Morsels",time:"20 min",rungs:"200",lib:"block-02-mental-models",
     opener:"Idle threads pull work from a queue. That idea comes from HyPer, not from the 2019 paper [S5].",
     obj:"Say what a fixed hash split does when one key is huge.",
     deliv:"The stall, and the queue that avoids it.",
     mods:[
       {t:"Exchange versus morsel [S5]",rl:"engine · 200", action:"Write the idle-thread story for a skewed join key.", whyMatters:"A static partition leaves cores waiting."},
       {t:"Scan order",rl:"engine · 200", action:"State when ORDER BY is required.", whyMatters:"Parallel scans can return rows in a different order each run."}
     ],
     vids:[{s:5}]},
    {n:5,title:"Files and replacement scans",time:"25 min",rungs:"200",lib:"block-03-active-practice",
     opener:"FROM 'events.parquet' is a scan. There is no CREATE TABLE first [S1].",
     obj:"Name three sources DuckDB can read without a load step.",
     deliv:"A one-line query against a Parquet path, plus one risk of missing statistics.",
     mods:[
       {t:"Replacement scan [S1]",rl:"engine · 200", action:"Write SELECT from a Parquet path and from a Pandas frame.", whyMatters:"A loader script is often the thing to stop."},
       {t:"Predicate pushdown [S1]",rl:"engine · 200", action:"Say what a Parquet row group skip does for a filter.", whyMatters:"The file format, not DuckDB magic, is doing that work."}
     ],
     vids:[{s:1},{s:2}]},
    {n:6,title:"Joins, breakers, and spill",time:"30 min",rungs:"300",lib:"block-03-active-practice",
     opener:"A hash join builds on the small side. A sort or a global aggregate must see all input before it emits [S2].",
     obj:"Name a pipeline breaker and what happens when the hash table will not fit.",
     deliv:"The EXPLAIN line you would look at, and the setting that starts a spill.",
     mods:[
       {t:"Hash join build side [S2]",rl:"engine · 300", action:"Label the small table as the build side on a sketch.", whyMatters:"The wrong side is a common out-of-memory death."},
       {t:"Out-of-core and max_memory [S2]",rl:"engine · 300", action:"Write what a spill does, and what a plan that cannot spill does.", whyMatters:"max_memory is a threshold, not a safety net."}
     ],
     vids:[{s:2},{s:1}]},
    {n:7,title:"One writer",time:"25 min",rungs:"300",lib:"block-05-edge-cases",
     opener:"One process writes the file. Other processes open it only as READ_ONLY. Inside the writer, two threads that edit the same row conflict [S3].",
     obj:"Separate a second process from a second thread.",
     deliv:"The tell for Database locked, and the tell for a transaction conflict.",
     mods:[
       {t:"Process versus thread [S3]",rl:"ops · 300", action:"Write who may write, and who may only read.", whyMatters:"MVCC is inside the one writer. It is not multi-process writing."},
       {t:"Appends versus updates [S3]",rl:"ops · 300", action:"Say which of two concurrent appends fail.", whyMatters:"Appends do not conflict. Same-row updates do."}
     ],
     vids:[{s:3}]},
    {n:8,title:"Extensions",time:"20 min",rungs:"200",lib:"block-05-edge-cases",
     opener:"The core is the SQL engine with no extra libraries. Parquet, JSON, httpfs, spatial, and ICU load beside it and run with the host's rights [S10].",
     obj:"Separate INSTALL, LOAD, and auto-install.",
     deliv:"The closed-room setting: auto-install off, unsigned extensions off.",
     mods:[
       {t:"Core versus extension [S10]",rl:"trust · 200", action:"List three features that are not in the core binary.", whyMatters:"A crash in an extension takes the host process down."},
       {t:"Auto-install [S10]",rl:"trust · 300", action:"Name the host that DuckDB contacts on first use of a missing extension.", whyMatters:"A closed room cannot allow that fetch."}
     ],
     vids:[{s:10},{s:1}]},
    {n:9,title:"MotherDuck",time:"20 min",rungs:"300",lib:"competitors",
     opener:"MotherDuck is a separate cloud product. ATTACH md: mounts it into this session. Dual execution can run part of the query in their cloud [S8][S9].",
     obj:"Name the statement that leaves the machine.",
     deliv:"One sentence: local DuckDB is not MotherDuck.",
     mods:[
       {t:"ATTACH md: [S8]",rl:"trust · 300", action:"Write what credentials and network that statement needs.", whyMatters:"After it, the query is no longer confined to the laptop."},
       {t:"Dual execution [S9]",rl:"trust · 300", action:"Say how shipping rows between local and cloud can erase a hoped-for speedup.", whyMatters:"The CIDR 2024 paper is the source, not a slide."}
     ],
     vids:[{s:8},{s:9}]},
    {n:10,title:"Closed lab and host fate",time:"20 min",rungs:"300",lib:"competitors",
     opener:"A local binary with no network is a deployment proposal. It is not permission to process classified data. Smaug and BiTDB study other engines [S11][S12].",
     obj:"Name two papers that do not certify DuckDB, and one crash that takes the host down.",
     deliv:"The closed-lab rule in one sentence.",
     mods:[
       {t:"Not an authorization [S11][S12]",rl:"trust · 300", action:"Write what a lab still has to approve: binary, extensions, machine.", whyMatters:"Nearby TEE papers are SQLite or embedded databases, not DuckDB."},
       {t:"Host fate",rl:"ops · 300", action:"Contrast a server worker crash with an in-process abort.", whyMatters:"There is no daemon to isolate the engine."}
     ],
     vids:[{s:3},{s:10}]},
    {n:11,title:"Decision packet",time:"25 min",rungs:"200",lib:"nblm-decision-packet",
     opener:"Standardize local scans. Do not start Spark for a file that fits one machine. Do not load a CSV just to look at it. Slide speed numbers are not an SLA.",
     obj:"Write the tool you would stop using, and one report claim you will not treat as a guarantee.",
     deliv:"A three-line decision: in, out, and measure.",
     mods:[
       {t:"Stop the cluster [S13]",rl:"scope · 200", action:"Name the size at which you still stay on one box.", whyMatters:"Spark is for data that will not fit, or a job that must survive a lost node."},
       {t:"Stop the loader [S1]",rl:"engine · 200", action:"Write the replacement-scan query you would run instead.", whyMatters:"The file is already the table."},
       {t:"Measure the briefing",rl:"scope · 200", action:"Time one of your files. Do not quote 10x or 157 ms as a contract.", whyMatters:"Those lines are slide claims."}
     ],
     vids:[{s:1},{s:4}]}
  ],
  ladder:[
    {key:"place",name:"Placement",img:"100",r:[{n:100,t:"Say what DuckDB is and name the quadrant."},{n:200,t:"Place it against SQLite, Postgres, Polars, and Spark."},{n:300,t:"Defend one choice on a real workload."}]},
    {key:"engine",name:"Engine",img:"200",r:[{n:100,t:"Column versus row."},{n:200,t:"Vector size, morsels, and spill."},{n:300,t:"Read an EXPLAIN and find the expensive join."}]},
    {key:"ops",name:"Operations",img:"300",r:[{n:100,t:"One writer, read-only readers."},{n:200,t:"Extensions and the closed-lab rule."},{n:300,t:"Local DuckDB versus MotherDuck, and what is not an authorization."}]}
  ],
  miniModules:[
    {name:"SQLite",t:"In-process OLTP. Point lookups and small writes."},
    {name:"PostgreSQL",t:"Server OLTP. Many writers. System of record."},
    {name:"Polars",t:"Dataframe API on one machine. Not a SQL catalog."},
    {name:"Spark",t:"Cluster OLAP when the working set will not fit one machine."},
    {name:"MotherDuck",t:"Cloud warehouse. ATTACH md: can run part of the query in their cloud."}
  ],
  prompts:[
    {cat:"1 · Placement",model:"any",desc:"The missing quadrant.",items:["40 GB of Parquet on a laptop","Orders table with hundreds of writers"],
     flagship:"Place DuckDB, SQLite, Postgres, Polars, Spark, and MotherDuck on one workload. Name the quadrant DuckDB claims. Name the one tool you refuse and why. Cite the SIGMOD 2019 paper for the quadrant."},
    {cat:"2 · Columnar storage",model:"any",desc:"What a SUM actually reads.",items:["Wide events table","Point lookup of one order"],
     flagship:"Draw a four-column table as rows and as columns. Circle the bytes SUM(amount) reads in each layout. Say why a point lookup of one order is not this engine's job."},
    {cat:"3 · Vectors",model:"any",desc:"Volcano versus a DataChunk of 2048.",items:["Filter then project","col + 5"],
     flagship:"Contrast one-row-at-a-time next() with a DataChunk. State STANDARD_VECTOR_SIZE. Define flat, dictionary, constant, and sequence vectors in one line each. Cite the execution-format doc."},
    {cat:"4 · Morsels",model:"any",desc:"Skewed keys and idle threads.",items:["Join on a country code","Huge group-by key"],
     flagship:"A join key is heavily skewed. Explain what a fixed hash-split exchange does to idle threads, and what a morsel queue does instead. Say when ORDER BY is required. Cite the Developer Voices talk."},
    {cat:"5 · Files",model:"any",desc:"Scan the file. Do not load it first.",items:["events.parquet","A Pandas frame already in memory"],
     flagship:"Write SELECT * FROM 'events.parquet' WHERE dt = DATE '2026-10-01'. Label the replacement scan and the predicate pushdown. State one risk of missing statistics. Do not invent a CREATE TABLE step."},
    {cat:"6 · Joins and spill",model:"any",desc:"Build side, breaker, max_memory.",items:["Small dimension, large fact","Sort of a billion-row table"],
     flagship:"Sketch a hash join. Label the build side. Name two pipeline breakers. Say what happens when the hash table will not fit and the plan cannot spill. max_memory is a threshold, not a guarantee."},
    {cat:"7 · One writer",model:"any",desc:"Process versus thread.",items:["Second script INSERT","Two threads UPDATE the same row"],
     flagship:"A notebook is writing. A second OS process tries to INSERT. A second thread in the first process UPDATEs the same row. Name the tell for each. Cite the concurrency doc. Do not call this multi-process writing."},
    {cat:"8 · Extensions",model:"any",desc:"Core, INSTALL, LOAD, auto-install.",items:["httpfs in a closed room","spatial on a laptop"],
     flagship:"List three features that are not in the zero-dependency core. Separate INSTALL, LOAD, and auto-install. Name the host auto-install contacts. State that an extension runs with the host process rights."},
    {cat:"9 · MotherDuck",model:"any",desc:"The statement that leaves the machine.",items:["Local Parquet only","Approved cloud account"],
     flagship:"What does ATTACH 'md:' do? What does dual execution mean in the CIDR 2024 paper? Write one sentence that local DuckDB is not MotherDuck. Do not treat a blog's region list as a MotherDuck commitment."},
    {cat:"10 · Closed lab",model:"any",desc:"A binary is not an authorization.",items:["Air-gapped laptop","Crash in an extension"],
     flagship:"A lab wants to run DuckDB with the network off. What does that prove, and what does it not prove? Name Smaug and BiTDB as papers about other engines. Contrast a server worker crash with an in-process abort."},
    {cat:"11 · Decision",model:"any",desc:"In, out, and measure.",items:["CSV someone wants to load","Cluster for 40 GB"],
     flagship:"Write a three-line decision: when DuckDB is in, which tool you stop using, and one briefing number you will time instead of quoting. Slide 10x and 157 ms are claims, not an SLA."},
    {cat:"12 · Warrants",model:"any",desc:"Why the evidence is supposed to count.",items:["Local binary in a closed room","A slide that says 10x"],
     flagship:"Pick one live debate from the claims note. Write Claim A, Claim B, the warrant as If X then Y, one hidden assumption, and one test that would support A, one that would support B, and one that would weaken both. Cite ledger numbers. Do not treat a NotebookLM strong rating as primary evidence."}
  ],
  checklist:[
    {title:"Second writer",view:"Operations",src:"S3",
     good:"One process writes. Other processes open the file only with access_mode READ_ONLY.",
     bad:"Tell: Database locked or Transaction conflict. Root cause: two processes tried to write, or two transactions edited the same rows."},
    {title:"Join memory",view:"Engine",src:"S2",
     good:"Build the hash table on the small side. Gather statistics and read EXPLAIN before trusting a timing.",
     bad:"Tell: the process dies out of memory. Root cause: the plan materializes an intermediate it cannot spill."},
    {title:"Network file",view:"Operations",src:"S3",
     good:"Keep the working database file on a local disk. Do not put the writer on a network share with weak locks.",
     bad:"Tell: corruption or a stall. Root cause: file locks on NFS or a network drive."},
    {title:"Extension download in a closed room",view:"Trust",src:"S10",
     good:"Turn auto-install and auto-load off. Ship the signed extensions you trust. Leave community and unsigned extensions off.",
     bad:"Tell: the process reaches extensions.duckdb.org on first use of a feature."},
    {title:"MotherDuck in a closed lab",view:"Trust",src:"S8",
     good:"Do not ATTACH md: unless that cloud account is separately approved.",
     bad:"Tell: dual execution runs part of the query in MotherDuck's cloud."},
    {title:"Host process crash",view:"Operations",src:"S6",
     good:"Treat a fatal engine fault as a host abort. There is no daemon to isolate it.",
     bad:"Tell: Python, R, or the JVM dies with the query."},
    {title:"CSV type guess",view:"Engine",src:"S1",
     good:"Declare types or use TRY_CAST. Do not trust the first rows of a CSV.",
     bad:"Tell: timestamps truncated, numbers stored as strings, later rows fail to cast."},
    {title:"Skewed join key",view:"Engine",src:"S5",
     good:"Morsels let idle threads keep pulling work. A fixed hash split does not.",
     bad:"Tell: one core at 100% and the rest idle near the end of the query."}
  ],
  cheat:[
    {t:"Use DuckDB",d:"The working set fits one machine and the question is a scan, join, or aggregate."},
    {t:"Use SQLite or Postgres",d:"Many small writes, or many writers, or the database is the system of record."},
    {t:"Use Spark",d:"The data will not fit one machine, or a dead node must not kill the job."},
    {t:"Measure the briefing numbers",d:"10x and a billion rows in 157 ms are not an SLA. Time your files."}
  ],
  falsifier:"A SQL feature tour that never says how columnar storage and vectorized execution change a query, and never names when Postgres, SQLite, Polars, or Spark is the better tool.",
  quizSections:{1:"Placement",2:"Engine",3:"Limits",4:"NotebookLM",5:"Warrants"},
  quiz:[
    {section:1,question:"Which quadrant does DuckDB claim?",answer:"In-process OLAP. SQLite is in-process OLTP. A warehouse is client-server OLAP.",src:"S4"},
    {section:2,question:"What is the default vector size?",answer:"2048 tuples in a DataChunk. Operators run on that batch.",src:"S2"},
    {section:2,question:"Why does a column store help a SUM?",answer:"It reads the summed column and skips the others.",src:"S2"},
    {section:2,question:"What problem do morsels avoid?",answer:"A fixed hash split that leaves threads idle when one key is huge.",src:"S5"},
    {section:3,question:"When may other processes open the same file?",answer:"Only to read, and only in read-only mode. A second writer is blocked.",src:"S3"},
    {section:3,question:"What does ATTACH md: do?",answer:"It connects this process to MotherDuck. Hybrid execution can run part of the query in their cloud.",src:"S8"},
    {section:3,question:"Is local DuckDB an authorization for classified data?",answer:"No. A lab still approves the binary, the extensions, and the machine. Smaug and BiTDB do not evaluate DuckDB.",src:"S11"},
    {section:2,question:"Which side should a hash join build?",answer:"The smaller side. The larger side probes.",src:"S2"},
    {section:3,question:"What does auto-install do?",answer:"It downloads an extension from extensions.duckdb.org. Turn it off in a closed room.",src:"S10"},
    {section:1,question:"When is Spark the better tool?",answer:"When the working set will not fit one machine.",src:"S13"},
    {section:2,question:"What does a sequence vector store?",answer:"A start and a step, not every value.",src:"S2"},
    {section:3,question:"What happens when two threads in the writer update the same row?",answer:"The later commit fails with a transaction conflict. Appends do not conflict. Rerun the failed one.",src:"S3"},
    {section:3,question:"What is the difference between INSTALL and LOAD?",answer:"INSTALL fetches the extension. LOAD activates it. Auto-install does both and should be off in a closed room.",src:"S10"},
    {section:2,question:"Do extensions run in a separate process?",answer:"No. They run inside the host process, with that process's rights.",src:"S10"},
    {section:2,question:"What does EXPLAIN ANALYZE add?",answer:"It runs the query and prints actual time and row counts. EXPLAIN only shows the plan.",src:"S1"},
    {section:2,question:"What is GROUP BY ALL?",answer:"It groups by every selected column that is not aggregated.",src:"S1"},
    {section:3,question:"What does opening :memory: do?",answer:"It creates a database with no file. The data is gone when the connection closes.",src:"S1"},
    {section:5,question:"What warrant makes a local binary a closed-lab proposal rather than an authorization?",answer:"No ATTACH md: and no auto-install means no MotherDuck session. A lab still approves the binary. Smaug and BiTDB do not evaluate DuckDB.",src:"S8"},
    {section:5,question:"Why is a slide's 10× or 157 ms not a contract?",answer:"Those numbers describe a demo. The causal warrant for speed is vectorized columnar scans on your files, which you time.",src:"S2"},
    {section:5,question:"What test would weaken both 'local means no network' and 'MotherDuck is the only leak'?",answer:"First httpfs query with auto-install on. Capture a fetch to extensions.duckdb.org.",src:"S10"}
  ,
{"section": 4, "type": "mc", "question": "What is the standard fixed vector size (`STANDARD_VECTOR_SIZE`) used by DuckDB's execution engine when passing data chunks between pipeline operators?", "options": ["2048 tuples", "64 tuples", "65536 tuples", "1 tuple"], "answer": "2048 tuples", "explanation": "Operating on vectors of 2048 elements balances instruction dispatch overhead with keeping working data chunks small enough to fit within CPU L1/L2 caches.", "src": "nblm"},
{"section": 4, "type": "mc", "question": "In a single-process deployment, how does DuckDB manage concurrent transaction writes from multiple threads within the same database handle?", "options": ["It uses Multi-Version Concurrency Control (MVCC) with optimistic concurrency control, raising a transaction conflict error if two threads edit the same row simultaneously.", "It acquires exclusive table-level locks before every write, queuing all write operations into a single-threaded execution pipeline.", "It spawns background server processes to handle writing, communicating via inter-process IPC sockets.", "It allows both threads to overwrite the row and resolves conflicting values during database checkpointing."], "answer": "It uses Multi-Version Concurrency Control (MVCC) with optimistic concurrency control, raising a transaction conflict error if two threads edit the same row simultaneously.", "explanation": "DuckDB relies on optimistic concurrency control to maximize read and append performance, aborting the second writer thread if concurrent edits clash on identical rows.", "src": "nblm"},
{"section": 4, "question": "Which physical vector formats does DuckDB support internally to represent logically uncompressed column data efficiently during execution?", "answer": "Identify physical representations that allow vectorized operators to keep data compressed without expanding into flat arrays.", "explanation": "Open question from the 2026-10-11 NotebookLM quiz. The full text is in the library.", "src": "nblm"},
{"section": 4, "question": "To allow multiple separate operating system processes to read from the same DuckDB database file concurrently, connections must configure `access_mode = '___'`. ", "answer": "Think of the configuration option that guarantees no writing process will modify the persistent database file.", "explanation": "Open question from the 2026-10-11 NotebookLM quiz. The full text is in the library.", "src": "nblm"},
{"section": 4, "type": "mc", "question": "What primary operational drawback of traditional exchange-operator parallelism does DuckDB eliminate by implementing morsel-driven parallelism?", "options": ["Static hash partitioning in exchange operators causes worker thread idle time when processing heavily skewed data keys.", "Exchange operators require queries to be compiled into C code via LLVM, introducing heavy compilation latency.", "Exchange operators force data chunks to be converted into row-oriented formats before crossing thread boundaries.", "Exchange operators restrict execution to a single CPU core whenever join operators are present in the query plan."], "answer": "Static hash partitioning in exchange operators causes worker thread idle time when processing heavily skewed data keys.", "explanation": "Morsel-driven parallelism allows threads to dynamically pull available data tasks from pipeline sources, avoiding thread bottlenecking when specific group keys are over-represented.", "src": "nblm"},
{"section": 4, "question": "Explain how DuckDB's 'replacement scan' mechanism functions when a user executes a query referencing an external file path (e.g., `SELECT * FROM 'data.parquet'`) without prior schema creation.", "answer": "Focus on what happens during the query binding phase when an identifier does not match any existing catalog table.", "explanation": "Open question from the 2026-10-11 NotebookLM quiz. The full text is in the library.", "src": "nblm"},
{"section": 4, "question": "In query pipeline construction, operators such as `GROUP BY` or `ORDER BY` that must collect and process all input tuples before yielding any output rows are termed pipeline ___.", "answer": "This term refers to blocking operators that break the continuous streaming of vectors from source to sink.", "explanation": "Open question from the 2026-10-11 NotebookLM quiz. The full text is in the library.", "src": "nblm"},
{"section": 4, "type": "mc", "question": "Under DuckDB's optimistic concurrency control model, what occurs if two concurrent write transactions attempt to update the exact same row simultaneously?", "options": ["The transaction that attempts to commit second fails and throws a transaction conflict error.", "The database process blocks both threads indefinitely until a manual checkpoint is triggered.", "The engine automatically merges the changes and writes both values as a nested struct.", "The first transaction is rolled back while the second transaction silently overwrites the data."], "answer": "The transaction that attempts to commit second fails and throws a transaction conflict error.", "explanation": "DuckDB detects the concurrent modification on identical row version identifiers and aborts the conflicting transaction, requiring the application to retry.", "src": "nblm"},
{"section": 4, "question": "Which of the following statements correctly describe DuckDB's extension system and binary design?", "answer": "Select choices that highlight DuckDB's zero-dependency core philosophy and in-process extension architecture.", "explanation": "Open question from the 2026-10-11 NotebookLM quiz. The full text is in the library.", "src": "nblm"},
{"section": 4, "question": "Why does vectorized column processing yield higher performance on modern CPUs compared to traditional row-at-a-time (Volcano) query processing?", "answer": "Focus on hardware memory hierarchy (caches) and CPU instruction execution characteristics (branch prediction/dispatch overhead).", "explanation": "Open question from the 2026-10-11 NotebookLM quiz. The full text is in the library.", "src": "nblm"}],
  glossary:[
    {category:"Placement",term:"DuckDB",rung:100,essential:true,definition:"An in-process analytical database. SQL runs in your process. One machine, one writer. [S1][S4]",source:"ledger"},
    {category:"Placement",term:"OLAP",rung:100,essential:true,definition:"Few large scans and aggregates. The workload DuckDB is built for.",source:"ledger"},
    {category:"Placement",term:"OLTP",rung:100,essential:true,definition:"Many small row reads and writes. SQLite and Postgres are built for this.",source:"ledger"},
    {category:"Engine",term:"DataChunk",rung:200,essential:true,definition:"A horizontal slice of a columnar table: equal-length vectors processed together. Filters can punch holes in a chunk, and the batch has to stay inside cache. [S2]",source:"nblm-gap"},
    {category:"Engine",term:"Vectorized execution",rung:200,essential:true,definition:"Operators process a chunk, not one row at a time, so the working set stays in cache. [S2]",source:"ledger"},
    {category:"Engine",term:"Morsel",rung:200,essential:true,definition:"A small unit of work an idle thread pulls from a queue. Operators have to be able to run on that piece. A bad size either starves threads or spends the time scheduling. [S5]",source:"nblm-gap"},
    {category:"Operations",term:"Single writer",rung:300,essential:true,definition:"Only one process may hold the write lock on a database file. A second process that tries to write gets a lock error. [S3]",source:"nblm-gap"},
    {category:"Trust",term:"MotherDuck",rung:300,essential:true,definition:"A separate cloud product. ATTACH md: can move query work off the machine. [S8][S9]",source:"ledger"},
    {category:"Trust",term:"Extension",rung:200,essential:true,definition:"Code loaded beside the core. It runs with the rights of the DuckDB process. [S10]",source:"ledger"},
    {category:"Placement",term:"In-process",rung:100,essential:true,definition:"The engine and the program share one address space. No server, no socket copy of each result row. [S4]",source:"ledger"},
    {category:"Placement",term:"Client-server",rung:100,definition:"The database is another process. Postgres and a warehouse work this way. [S4]",source:"ledger"},
    {category:"Placement",term:"Missing quadrant",rung:100,essential:true,definition:"Embedded OLAP. SQLite already owns embedded OLTP. [S4]",source:"ledger"},
    {category:"Placement",term:"SQLite",rung:100,definition:"In-process OLTP. Point lookups and small writes. [S4]",source:"ledger"},
    {category:"Placement",term:"PostgreSQL",rung:100,definition:"Server OLTP. Many writers. A system of record. [S3]",source:"ledger"},
    {category:"Placement",term:"Polars",rung:200,definition:"Dataframe API on one machine. Not a SQL catalog.",source:"ledger"},
    {category:"Placement",term:"Spark",rung:200,definition:"Cluster engine for data that will not fit one machine. [S13]",source:"ledger"},
    {category:"Engine",term:"Columnar storage",rung:100,essential:true,definition:"One column sits together, so a SUM reads that column and skips the rest. [S2]",source:"ledger"},
    {category:"Engine",term:"Row store",rung:100,definition:"A whole row sits together. Good for fetching one row by key. [S2]",source:"ledger"},
    {category:"Engine",term:"Vector",rung:200,definition:"One column inside a DataChunk. [S2]",source:"ledger"},
    {category:"Engine",term:"Hash join",rung:200,essential:true,definition:"Build the hash table on the smaller side. Probe with the larger side. [S2]",source:"ledger"},
    {category:"Engine",term:"Spill",rung:300,definition:"Writing an intermediate to disk when memory is not enough. A plan that cannot spill can kill the process. [S2]",source:"ledger"},
    {category:"Engine",term:"Predicate pushdown",rung:200,definition:"A Parquet reader skips row groups that cannot match the filter. [S1]",source:"ledger"},
    {category:"Engine",term:"Zero-copy scan",rung:200,definition:"Query CSV, Parquet, Pandas, or Arrow without a separate load into a new table. [S1]",source:"ledger"},
    {category:"Engine",term:"EXPLAIN",rung:200,definition:"The plan DuckDB will run. Read it before trusting a timing. [S1]",source:"ledger"},
    {category:"Operations",term:"Optimistic concurrency",rung:300,definition:"Inside the one writer process, transactions conflict if they edit the same rows. This is not multi-process writing. [S3]",source:"ledger"},
    {category:"Operations",term:"READ_ONLY",rung:300,essential:true,definition:"The access mode other processes must use. They may read. They may not write. [S3]",source:"ledger"},
    {category:"Operations",term:"Database locked",rung:300,definition:"The usual message when a second process tries to write. [S3]",source:"ledger"},
    {category:"Trust",term:"Auto-install",rung:300,essential:true,definition:"On first use of a missing extension, DuckDB downloads and installs it. That needs a network and permission to write the extension files. Turn it off in a closed room. [S10]",source:"nblm-gap"},
    {category:"Trust",term:"httpfs",rung:200,definition:"Extension that reads and writes files over HTTP and S3. Remote reads wait on the network. It stays out of the zero-dependency core. [S10]",source:"nblm-gap"},
    {category:"Trust",term:"Iceberg",rung:200,definition:"Extension for Iceberg tables. Same trust rule as any other extension. [S10]",source:"ledger"},
    {category:"Trust",term:"ATTACH md:",rung:300,essential:true,definition:"Mounts a MotherDuck database into this session. It needs credentials and a network, and the query is no longer confined to the machine. [S8]",source:"nblm-gap"},
    {category:"Trust",term:"Dual execution",rung:300,definition:"MotherDuck can split a query between this process and its cloud. Shipping data between the two can erase the speed you hoped for. [S9]",source:"nblm-gap"},
    {category:"Trust",term:"Closed-lab rule",rung:300,essential:true,definition:"A local binary with no network is not permission to process classified data. Smaug and BiTDB do not certify DuckDB. [S11][S12]",source:"ledger"},
    {category:"Engine",term:"Volcano",rung:200,essential:true,definition:"Operators pull one row at a time through open, next, and close. That costs a function call per row and throws away cache. DuckDB passes a chunk instead.",source:"nblm-gap"},
    {category:"Engine",term:"STANDARD_VECTOR_SIZE",rung:200,essential:true,definition:"The compile-time default, usually 2048 values in one vector. Changing it means rebuilding DuckDB. [S2]",source:"nblm-gap"},
    {category:"Engine",term:"Pipeline breaker",rung:300,essential:true,definition:"A sort or a global hash aggregate must consume its whole input before it can emit a row. That stops the stream and can force a spill.",source:"nblm-gap"},
    {category:"Engine",term:"Exchange operator",rung:300,definition:"A fixed hash split of a stream into worker channels. One huge key can stall a channel. Morsels avoid that split.",source:"nblm-mental-models"},
    {category:"Engine",term:"Replacement scan",rung:200,essential:true,definition:"An unknown table name or a file path in FROM is swapped for a scan of that file or data frame. The optimizer may not have exact statistics for that scan. [S1]",source:"nblm-gap"},
    {category:"Engine",term:"Out-of-core",rung:300,essential:true,definition:"Work that does not fit RAM spills intermediate state to disk and finishes. The spill is much slower than staying in memory, and a plan that cannot spill can still die.",source:"nblm-gap"},
    {category:"Engine",term:"max_memory",rung:300,definition:"The setting that tells operators when to start spilling. It does not make an impossible join safe.",source:"nblm-study-guide"},
    {category:"Engine",term:"Flat vector",rung:300,definition:"A plain array: tuple i is at offset i. The fast path for a scan.",source:"nblm-mental-models"},
    {category:"Engine",term:"Dictionary vector",rung:300,definition:"Distinct values once, plus indexes. DuckDB can filter them without expanding every row first.",source:"nblm-mental-models"},
    {category:"Engine",term:"Constant vector",rung:300,definition:"One value repeated for the whole chunk, as in col + 5. The 5 is stored once.",source:"nblm-mental-models"},
    {category:"Engine",term:"String prefix",rung:300,definition:"Strings longer than 12 bytes keep a 4-byte prefix in the vector so many comparisons never chase the pointer.",source:"nblm-mental-models"},
    {category:"Operations",term:"Host fate",rung:300,essential:true,definition:"DuckDB is in the same process as your program. A fatal engine error takes the host down with it. A server would not.",source:"nblm-mental-models"},
    {category:"Operations",term:"Transaction conflict",rung:300,definition:"Inside the one writer, two threads that edit the same row conflict. Appends do not. This is not a second process writing.",source:"nblm-study-guide"},
    {category:"Operations",term:"Parquet",rung:100,essential:true,definition:"Columnar files DuckDB can scan in place, with filters pushed into row groups. [S1]",source:"ledger"},
    {category:"Operations",term:"Arrow",rung:200,definition:"A shared memory layout. DuckDB can scan an Arrow table without copying it into its own table. [S1]",source:"ledger"},
    {category:"Trust",term:"Core versus extension",rung:200,essential:true,definition:"The core is the SQL engine with no extra libraries. Parquet, JSON, httpfs, spatial, and ICU are extensions loaded beside it. [S10]",source:"ledger"},
    {category:"Trust",term:"Quack",rung:300,definition:"A client-server idea named in the NotebookLM briefing. It is not the concurrency contract. The contract is one writer process. [S3]",source:"nblm-briefing"},
    {category:"Trust",term:"DuckLake",rung:300,definition:"A catalog idea named on a slide and in the 2026 talk. It does not change the one-writer rule for a local DuckDB file. [S3]",source:"nblm-briefing"},
    {category:"Placement",term:"MonetDB and X100",rung:200,definition:"The earlier vectorized engine. DuckDB's chunked execution comes from that line, then from HyPer's morsels. [S7]",source:"ledger"},
    {category:"Engine",term:"Sequence vector",rung:300,definition:"A start value and a step. Ranges and row ids do not store every number.",source:"nblm-gap"},
    {category:"Engine",term:"MVCC",rung:300,essential:true,definition:"Inside the one writer process, readers can see a stable version while another thread writes. Two threads that edit the same row conflict. [S3]",source:"nblm-gap"},
    {category:"Operations",term:"INSTALL and LOAD",rung:200,essential:true,definition:"INSTALL downloads an extension. LOAD turns it on in this session. Auto-install does both. Turn that off in a closed room. [S10]",source:"nblm-gap"},
    {category:"Operations",term:"GROUP BY ALL",rung:200,definition:"Groups by every selected column that is not inside an aggregate, so you do not retype the list.",source:"nblm-gap"},
    {category:"Operations",term:"QUALIFY",rung:200,definition:"Filters a window-function result in the same query, without wrapping it in another SELECT.",source:"nblm-gap"},
    {category:"Engine",term:"EXPLAIN ANALYZE",rung:200,definition:"Runs the query and prints real time and row counts. EXPLAIN only prints the plan. [S1]",source:"nblm-gap"},
    {category:"Operations",term:":memory:",rung:100,definition:"The path that opens a database with no file. It disappears when the process ends.",source:"nblm-gap"},
    {category:"Operations",term:"COPY",rung:100,definition:"Writes a table or a query result to CSV, Parquet, or JSON.",source:"nblm-gap"},
    {category:"Engine",term:"Hive partition",rung:200,definition:"Directory names such as /year=2026/ become virtual columns on a scan.",source:"nblm-gap"},
    {category:"Operations",term:"CHECKPOINT",rung:300,definition:"Flushes in-memory writes into the database file and can reclaim space.",source:"nblm-gap"},
    {category:"Engine",term:"Logical versus physical plan",rung:200,definition:"The logical plan is the relational operators. The physical plan picks algorithms such as hash join versus nested loop.",source:"nblm-gap"},
    {category:"Engine",term:"Subquery unnesting",rung:300,definition:"A correlated subquery becomes a join or an aggregate so it is not re-run per row.",source:"nblm-gap"}
  ],
  views:{
    conceptual:{rule:"What and why. In-process analytics, not a server.",lib:"nblm-study-guide",img:[],
      tables:[{caption:"Quadrant",headers:["","OLTP","OLAP"],rows:[["In process","SQLite","DuckDB"],["Client-server","Postgres","Snowflake / ClickHouse"]]},
      {caption:"Selection (from the study guide)",headers:["","DuckDB","Postgres","SQLite","Polars","Spark"],rows:[["Shape","In-process OLAP","Server OLTP","In-process OLTP","Dataframe","Cluster"],["Layout","Columnar","Row","Row / B-tree","Columnar in RAM","Distributed files"],["Writers","One process","Many","One file lock","Process-local","Cluster"],["Avoid","Many writers","Embedded mobile","Wide aggregates","Joins bigger than RAM","A file that fits one box"]]}]},
    logical:{rule:"How a query moves. Columns, chunks, morsels.",lib:"",img:[],
      tables:[{caption:"Pipeline",headers:["Step","What it reads"],rows:[["Scan","Named columns only"],["Join","Hash table on the small side"],["Aggregate","The same pipeline"],["Threads","Morsels, not private copies of the query"]]}]},
    physical:{rule:"One process, one file, local disk.",lib:"",img:[],
      tables:[{caption:"Access",headers:["Mode","Who"],rows:[["Read-write","One writer process, many threads inside it"],["Read-only","Other processes, no writers"]]}]},
    integration:{rule:"Files and frames in place. Extensions for the rest.",lib:"",img:[],
      tables:[{caption:"Scanners",headers:["Source","Note"],rows:[["Parquet","Predicate pushdown"],["CSV","Type detection can guess wrong"],["Arrow / Pandas","Read from memory"],["httpfs / Iceberg","Extensions, not the core"]]}]},
    govcloud:{rule:"Closed lab is local DuckDB. MotherDuck is the cloud case.",lib:"",img:[],
      tables:[{caption:"Boundary",headers:["Situation","Keep off"],rows:[["Closed lab","ATTACH md:, auto-install, unsigned extensions"],["Your own VM","MotherDuck, unless approved"],["MotherDuck","Any claim that this is still the closed lab"]]}]}
  },
  eaFrameworks:{
    note:"DuckDB is an engine you place, not a platform you roll out. These views are altitude rules for that placement.",
    conceptual:[
      {phase:"C1",t:"Workload",items:["OLAP scans, joins, aggregates on one machine.","OLTP point lookups and many writers stay with SQLite or Postgres."]},
      {phase:"C2",t:"Quadrant",items:["Embedded OLAP is the missing box.","Client-server OLAP is a warehouse. DuckDB is not that box."]},
      {phase:"C3",t:"Neighbors",items:["Polars: dataframe API, no SQL catalog.","Spark: data that will not fit one machine."]}
    ],
    logical:[
      {phase:"L1",t:"Scan",items:["Named columns only.","Replacement scan of a file or a frame."]},
      {phase:"L2",t:"Pipeline",items:["DataChunk of 2048.","Breakers: hash-join build, hash aggregate, sort."]},
      {phase:"L3",t:"Parallelism",items:["Morsels from a queue.","A fixed hash split stalls on a huge key."]}
    ],
    physical:[
      {phase:"P1",t:"Process",items:["One address space with the host.","A fatal error ends the host."]},
      {phase:"P2",t:"File",items:["One writer process.","Other processes: READ_ONLY."]},
      {phase:"P3",t:"Memory",items:["Spill when max_memory is hit.","A plan that cannot spill can still die."]}
    ],
    integration:[
      {phase:"I1",t:"Local files",items:["Parquet with predicate pushdown.","CSV, Arrow, Pandas in the same process."]},
      {phase:"I2",t:"Extensions",items:["httpfs, Iceberg, spatial, ICU.","Same rights as the host."]},
      {phase:"I3",t:"Cloud",items:["ATTACH md: is MotherDuck.","Dual execution can leave the machine."]}
    ],
    trust:[
      {phase:"T1",t:"Closed room",items:["Auto-install off.","Unsigned extensions off."]},
      {phase:"T2",t:"Authorization",items:["Local binary is not a classified approval.","Smaug and BiTDB do not evaluate DuckDB."]},
      {phase:"T3",t:"Quack and DuckLake",items:["Named in later talks and a briefing.","They are not the one-writer contract."]}
    ],
    altitudes:[
      {name:"Conceptual",q:"Which quadrant?",allowed:"Workload and neighbors.",forbidden:"Vector size, file locks.",lib:"block-01-core-concepts"},
      {name:"Logical",q:"How does a query move?",allowed:"Scan, chunk, join, morsel.",forbidden:"MotherDuck account details.",lib:"block-02-mental-models"},
      {name:"Physical",q:"What process and file?",allowed:"One writer, READ_ONLY, spill.",forbidden:"SQL function catalogs.",lib:"block-05-edge-cases"},
      {name:"Integration",q:"What does FROM read?",allowed:"Parquet, Arrow, httpfs.",forbidden:"Classified-lab approval.",lib:"block-03-active-practice"},
      {name:"Trust",q:"What leaves the machine?",allowed:"Auto-install, ATTACH md:.",forbidden:"Slide speed as an SLA.",lib:"competitors"}
    ],
    table:[
      ["Concern","View","Owner","Out"],
      ["Quadrant","Conceptual","SIGMOD 2019 [S4]","Treating DuckDB as Postgres"],
      ["Batch size 2048","Logical","Execution format [S2]","Changing STANDARD_VECTOR_SIZE without a rebuild"],
      ["One writer","Physical","Concurrency [S3]","Second OS process writing"],
      ["Parquet scan","Integration","Docs [S1]","Loader script just to look"],
      ["MotherDuck","Trust","Architecture [S8], CIDR 2024 [S9]","Calling local DuckDB a cloud"]
    ]
  },
  deckFlags:{
    2:"The slide says client protocols are at least 10x slower than raw netcat. Treat that as the slide's claim, not an SLA.",
    11:"DuckLake is named on the slide as a multi-writer idea. The concurrency contract is still the official concurrency page [S3]."
  }
};

DATA.cut = {
  labels: ["Title","The bottleneck","Missing quadrant","Columnar storage","Vectors of 2048","Morsels","Zero-copy scans","One writer","Extensions","Where it fits","Day-one traps","Decision packet"],
  slides: [
    "Slide 1 titles the cut. DuckDB, the in-process analytical blueprint. Engine mechanics, architectural limits, and how to decide for single-node OLAP.",
    "Slide 2 says the old bottleneck was not the join. It was the client-server hop: serialization, network latency, and a client protocol. DuckDB sits inside the application, so the query uses shared memory instead of a socket.",
    "Slide 3 places DuckDB in the missing quadrant. SQLite is in-process and transactional. Postgres and MySQL are client-server OLTP. Snowflake and ClickHouse are client-server OLAP. DuckDB is in-process OLAP: local analytics on large data.",
    "Slide 4 is the storage layout. A row store must read the whole row to sum Amount. DuckDB stores each column together, so that sum reads the Amount column and leaves the rest on disk.",
    "Slide 5 is vectorized execution. DuckDB does not pull one row at a time through filter, projection, and aggregate. It moves a DataChunk of 2048 tuples, kept in cache. Row-at-a-time work falls out to main memory, which the slide marks as about one hundred times slower.",
    "Slide 6 is morsel-driven parallelism. A fixed hash partition stalls when one key is huge and the other threads sit idle. DuckDB puts morsels on a task queue. An idle thread takes the next morsel, so skew does not park the machine.",
    "Slide 7 is the zero-copy router. You do not have to load a file into a DuckDB table first. Scanners read CSV, Parquet, a Pandas frame, or Arrow. Parquet can push the filter down. Arrow and data frames can be read from memory.",
    "Slide 8 is the concurrency contract. One process may write, and that process may use many threads for a bulk update. A second process that tries to write is blocked. Other processes may read only when the file is opened read-only.",
    "Slide 9 is the extension surface. The core ships with no external libraries. JSON, spatial, Iceberg, and httpfs, including S3, load beside the core. The slide notes that httpfs links OpenSSL so the core binary does not carry that weight.",
    "Slide 10 is the fit matrix. SQLite for point reads and writes. Postgres when you need a server and mixed work. Spark when the data needs a cluster. DuckDB when the analytical working set fits one machine's RAM and disk.",
    "Slide 11 is the day-one ledger. Database locked means two writers, or a transaction conflict. An out-of-memory crash on a join means the plan built an intermediate it could not spill. A network drive can corrupt the file or stall on weak locks. The fixes on the slide are: rerun the transaction, gather statistics and reorder the join, and keep the working file on a local drive.",
    "Slide 12 is the decision. Standardize on DuckDB for local pipelines, data-science work, and analyst sandboxes. Stop starting a Spark cluster for data that fits one machine, and stop writing a loader just to query a CSV or a Parquet file."
  ],
  cards: [
    {question:"What cost does an in-process engine remove?",detail:"The socket and the copy of each result row.",why:"The query and the program share one address space.",example:"A host process reads the result from memory.",cardSlide:2},
    {question:"Which quadrant is DuckDB claiming?",detail:"In-process and analytical.",why:"SQLite already owns embedded transactions.",example:"A Parquet SUM on the laptop.",cardSlide:3},
    {question:"Why does a column store read less for a SUM?",detail:"One column sits together on disk.",why:"The query names a few columns.",example:"SUM of Amount skips Name.",cardSlide:4},
    {question:"What is a DataChunk?",detail:"2048 tuples. Operators run on the batch.",why:"The batch stays in cache.",example:"Filter, project, and aggregate share the chunk.",cardSlide:5},
    {question:"How do morsels differ from a fixed hash split?",detail:"Idle threads pull the next morsel.",why:"A hot key cannot park the other cores.",example:"One huge customer id.",cardSlide:6},
    {question:"What can DuckDB scan without a load step?",detail:"CSV, Parquet, Pandas, and Arrow.",why:"The scanner reads the source.",example:"SELECT from a Parquet path.",cardSlide:7},
    {question:"When may a second process open the file?",detail:"Only read-only. A second writer is blocked.",why:"One writer process caches the catalog.",example:"Three report jobs, read-only.",cardSlide:8},
    {question:"Why are httpfs and Iceberg extensions?",detail:"The core stays free of those libraries.",why:"A closed room can refuse the download.",example:"Local Parquet does not need httpfs.",cardSlide:9},
    {question:"When is Spark the wrong tool?",detail:"When the data fits one machine.",why:"DuckDB is the single-node row.",example:"40 GB of Parquet on a laptop.",cardSlide:10},
    {question:"What does Database locked usually mean?",detail:"Two writers, or a row conflict.",why:"The file allows one writer process.",example:"A notebook and a script both INSERT.",cardSlide:11},
    {question:"What should a team stop doing?",detail:"Spark for data that fits one box, and a loader just to see a CSV.",why:"The question can run against the file.",example:"Query Parquet directly.",cardSlide:12}
  ],
  open: "Welcome to the technical deep dive on DuckDB. This cut walks the NotebookLM slides: the in-process engine, how a query runs, and where DuckDB should refuse the job.",
  recap: "We covered the missing quadrant, columnar storage, vectors of 2048, morsel-driven parallelism, zero-copy scans, one writer, extensions, and the traps that show up on day one."
};

DATA.nblmDecks = {
  "engine": {
    "title": "NotebookLM deck, 2026-10-11",
    "cards": [
      {
        "front": "What is DuckDB?",
        "back": "An embeddable, in-process analytical (OLAP) SQL database management system."
      },
      {
        "front": "How does DuckDB differ from SQLite in terms of workload optimization?",
        "back": "SQLite is optimized for transactional workloads (OLTP), whereas DuckDB is optimized for analytical workloads (OLAP)."
      },
      {
        "front": "What does it mean for DuckDB to be an 'in-process' database engine?",
        "back": "The database engine runs directly inside the client host application process rather than as a separate client-server process."
      },
      {
        "front": "What primary operational overhead is eliminated by DuckDB's in-process architecture?",
        "back": "Client-server network protocol IPC overhead and socket serialization when transferring data."
      },
      {
        "front": "Which programming language standard was used to implement DuckDB?",
        "back": "C++11."
      },
      {
        "front": "What dependency constraint was prioritized during DuckDB's core engine design?",
        "back": "Zero external dependencies."
      },
      {
        "front": "What is columnar storage?",
        "back": "A physical data layout that organizes stored data contiguously column by column rather than row by row."
      },
      {
        "front": "Why is columnar storage advantageous for analytical queries?",
        "back": "Analytical queries typically select or aggregate a few columns over many rows, allowing the engine to read only the required columns from disk or memory."
      },
      {
        "front": "What is vectorized query execution?",
        "back": "An execution model where physical operators process uniform batches of data array vectors per operation rather than single rows at a time."
      },
      {
        "front": "What is the default vector size (`STANDARD_VECTOR_SIZE`) in DuckDB?",
        "back": "2048 tuples."
      },
      {
        "front": "What is a `DataChunk` in DuckDB?",
        "back": "A collection of column `Vector` instances representing a logical data block passed between execution operators."
      },
      {
        "front": "How does vectorized query execution improve CPU performance during query processing?",
        "back": "It keeps small working data vectors inside CPU cache, minimizes function call dispatch overhead, and improves branch prediction."
      },
      {
        "front": "What is a Flat Vector in DuckDB's execution format?",
        "back": "The standard uncompressed physical vector format stored as a contiguous memory array."
      },
      {
        "front": "What is a Constant Vector in DuckDB?",
        "back": "A physical vector format that stores only a single value to represent repeated constant elements across a batch."
      },
      {
        "front": "What components make up a Dictionary Vector?",
        "back": "A child vector containing unique data values and a selection vector containing index pointers into the child vector."
      },
      {
        "front": "What information defines a Sequence Vector in DuckDB?",
        "back": "A starting offset and a fixed increment value."
      },
      {
        "front": "How are short strings ($\\le 12$ bytes) physically stored in DuckDB String Vectors?",
        "back": "Short strings are inlined directly within the vector structure without using external pointers."
      },
      {
        "front": "How are long strings ($> 12$ bytes) physically stored in DuckDB String Vectors?",
        "back": "Long strings store a length, a 4-byte prefix, and a pointer to the auxiliary string buffer."
      },
      {
        "front": "What is the optimization purpose of storing a 4-byte prefix in string vector entries?",
        "back": "It allows early-out comparison without dereferencing pointer addresses when string prefixes do not match."
      },
      {
        "front": "What is morsel-driven parallelism?",
        "back": "A dynamic thread parallelism framework where worker threads dynamically retrieve small chunks of work (morsels) from query pipeline sources."
      },
      {
        "front": "How does morsel-driven parallelism differ from traditional exchange-operator parallelism?",
        "back": "Exchange operators bake fixed thread partitioning into query plans, whereas morsel-driven parallelism allows query operators to dynamically schedule tasks across available threads."
      },
      {
        "front": "What is a query pipeline in DuckDB's execution model?",
        "back": "A sequence of streaming operators connected between a data source operator and a blocking sink operator."
      },
      {
        "front": "What is a pipeline breaker (blocking operator)?",
        "back": "An operator that must consume and collect all input tuples before producing its output, such as `ORDER BY` or hash join build phases."
      },
      {
        "front": "How does morsel-driven scheduling prevent worker threads from stalling on skewed key distributions?",
        "back": "Idle threads automatically fetch subsequent unassigned morsels from the queue rather than waiting for a blocked thread to finish."
      },
      {
        "front": "How many external writer processes can simultaneously write to a native DuckDB file in read-write mode?",
        "back": "Exactly one process."
      },
      {
        "front": "What concurrency control mechanisms manage multiple writer threads within a single DuckDB process?",
        "back": "Multi-Version Concurrency Control (MVCC) combined with Optimistic Concurrency Control (OCC)."
      },
      {
        "front": "When does Optimistic Concurrency Control raise a transaction conflict error in DuckDB?",
        "back": "When two concurrent threads attempt to edit or delete the exact same row at the same time."
      },
      {
        "front": "What is the recommended recovery action when DuckDB encounters an OCC transaction conflict error?",
        "back": "Rerun the failed transaction."
      },
      {
        "front": "What setting enables multiple independent external processes to read from the same DuckDB database file?",
        "back": "`access_mode = 'READ_ONLY'`"
      },
      {
        "front": "Under what condition is `READ_ONLY` mode safe across multiple processes?",
        "back": "Provided that no process is concurrently attempting to perform write operations on the database file."
      },
      {
        "front": "What risk exists when accessing native DuckDB database files stored on network-attached storage or shared operating systems?",
        "back": "Inconsistent file locking behavior across differing file systems can corrupt or lock access."
      },
      {
        "front": "What is a replacement scan in DuckDB?",
        "back": "A mechanism that intercepts file path strings or in-memory dataframe variables inside a SQL `FROM` clause and substitutes a table scan operator."
      },
      {
        "front": "What happens when a SQL query specifies `FROM 'data.parquet'` directly?",
        "back": "DuckDB triggers a replacement scan to read the Parquet file directly without requiring a pre-loaded table schema."
      },
      {
        "front": "How does DuckDB handle schema detection when executing `SELECT * FROM 'dataset.csv'`?",
        "back": "Its CSV reader runs an automatic detection routine that infers delimiters, headers, and column data types dynamically."
      },
      {
        "front": "How does Parquet metadata filter pushdown reduce read I/O during query execution?",
        "back": "It inspects min/max column statistics stored in the Parquet metadata and skips reading whole row groups if filters fall outside range bounds."
      },
      {
        "front": "What is DuckDB's out-of-core capability?",
        "back": "The ability to execute analytical queries on working datasets that exceed total system RAM by spilling intermediate data to disk."
      },
      {
        "front": "What query hazard can cause an Out-Of-Memory (OOM) failure despite out-of-core spilling capabilities?",
        "back": "Unbounded Cartesian cross joins or unconstrained memory expansion across massive join keys."
      },
      {
        "front": "What is the primary role of extensions in DuckDB?",
        "back": "To dynamically add optional features, custom functions, specialized file formats, or storage backends without bloating core binary dependencies."
      },
      {
        "front": "Which SQL command downloads and installs a DuckDB extension binary?",
        "back": "`INSTALL extension_name;`"
      },
      {
        "front": "Which SQL command activates an installed extension within a DuckDB session?",
        "back": "`LOAD extension_name;`"
      },
      {
        "front": "What is extension auto-installation in DuckDB?",
        "back": "A feature where DuckDB automatically fetches, installs, and loads an officially supported extension when a related function or format is referenced."
      },
      {
        "front": "What capabilities does the `httpfs` core extension provide?",
        "back": "Direct HTTP(S) network file reading and S3 cloud storage object access."
      },
      {
        "front": "Why is `httpfs` distributed as an extension rather than built into the core DuckDB engine binary?",
        "back": "To prevent linking the heavy OpenSSL dependency directly into the zero-dependency core binary."
      },
      {
        "front": "Why do DuckDB extensions represent a security trust boundary?",
        "back": "Loaded extensions run arbitrary native dynamic code directly inside the host process space with full process permissions."
      },
      {
        "front": "What is the purpose of the SQL `ATTACH` command in DuckDB?",
        "back": "To mount an external DuckDB database file (or external database format) into the active catalog namespace."
      },
      {
        "front": "How does DuckDB reference tables residing in attached database files?",
        "back": "Using fully qualified schema notation: `database_name.schema_name.table_name`."
      },
      {
        "front": "What does the `EXPLAIN` statement output when prepended to a SQL query?",
        "back": "The logical and physical query execution plan tree showing scans, filters, joins, and aggregates without executing the query."
      },
      {
        "front": "How does `EXPLAIN ANALYZE` differ from standard `EXPLAIN`?",
        "back": "`EXPLAIN ANALYZE` actually executes the query and prints operator profiling details, including actual elapsed execution time and tuple counts."
      },
      {
        "front": "When should an architect choose PostgreSQL over DuckDB?",
        "back": "When the system requires a persistent, centralized, multi-user client-server OLTP database with heavy concurrent transactional writes."
      },
      {
        "front": "When should an architect choose SQLite over DuckDB?",
        "back": "When embedding an in-process transactional database focused on low-latency point reads and single-row updates."
      },
      {
        "front": "When should an architect choose Apache Spark over DuckDB?",
        "back": "When data scale requires distributed processing distributed across a compute cluster rather than single-node processing."
      },
      {
        "front": "What architectural failure mode occurs if DuckDB is selected as the database engine for a concurrent web app OLTP server?",
        "back": "Write concurrency bottlenecks and transaction conflicts occur because DuckDB permits only a single writer process."
      },
      {
        "front": "What is the result of executing `FROM 'events.parquet'` in DuckDB's friendly SQL dialect?",
        "back": "It expands implicitly into `SELECT * FROM 'events.parquet'`."
      },
      {
        "front": "What does `GROUP BY ALL` do in DuckDB?",
        "back": "It automatically groups by all non-aggregated columns present in the `SELECT` clause without listing column names explicitly."
      },
      {
        "front": "What problem does Unified Vector Format solve inside physical operators?",
        "back": "It provides a standardized vector abstraction that prevents a combinatorial explosion of operator code branches for different vector representations."
      },
      {
        "front": "How are Struct Vectors logically and physically structured internally?",
        "back": "As a list of child vectors where each child vector corresponds to one field in the struct schema."
      },
      {
        "front": "How are List Vectors represented internally in DuckDB?",
        "back": "Using a single flat child vector of elements alongside a vector of `list_entry_t` structs containing starting offsets and lengths."
      },
      {
        "front": "How are Map Vectors physically stored in DuckDB's vector layer?",
        "back": "As a `LIST[STRUCT(key, value)]`."
      },
      {
        "front": "What is bulk MVCC in DuckDB?",
        "back": "A multi-version concurrency control variant designed specifically to handle large column modifications and bulk appends efficiently."
      },
      {
        "front": "Which data structure is utilized for internal indexes in DuckDB?",
        "back": "Adaptive Radix Trees (ART)."
      },
      {
        "front": "What historical database system served as the embedded analytical predecessor built by the same creators before DuckDB?",
        "back": "MonetDBLite."
      },
      {
        "front": "Who authored the foundational SIGMOD 2019 DuckDB system paper?",
        "back": "Mark Raasveldt and Hannes Mühleisen."
      },
      {
        "front": "How do concurrent threads behave during append operations in single-process mode?",
        "back": "Appends never conflict with one another, allowing simultaneous concurrent thread inserts."
      },
      {
        "front": "What protocol facilitates multi-process network client-server communication to native DuckDB database formats?",
        "back": "The NotebookLM briefing names Quack as a client-server protocol. It is not the concurrency contract. A local file still has one writer process."
      },
      {
        "front": "How does the DuckLake format coordinate concurrent database writes across independent processes?",
        "back": "The briefing describes DuckLake as metadata in a catalog database. That is a notebook claim. It does not change one writer on a local DuckDB file."
      },
      {
        "front": "How is a pure in-memory DuckDB instance instantiated?",
        "back": "By opening a database connection using the special path string `':memory:'`."
      },
      {
        "front": "What is the purpose of the `SUMMARIZE` query statement in DuckDB?",
        "back": "It computes summary statistics (min, max, null count, distinct values, q25, median, q75) for every column in a target table."
      },
      {
        "front": "How does DuckDB achieve efficient scans when executing SQL over Python Pandas DataFrames?",
        "back": "It inspects and reads existing in-memory Pandas buffers directly without copying data into internal tables."
      },
      {
        "front": "What in-memory standard format enables zero-copy interprocess data transfer between DuckDB and scientific runtimes?",
        "back": "Apache Arrow."
      },
      {
        "front": "Why does vectorized execution improve loop performance in modern CPU hardware?",
        "back": "Tight loops over uniform primitive arrays allow compilers to generate SIMD instructions and keep instructions cache-resident."
      },
      {
        "front": "What binary footprint downside is avoided by choosing vectorization over Just-In-Time (JIT) compilation?",
        "back": "Avoiding the requirement to embed a heavy compiler infrastructure like LLVM inside the binary runtime."
      },
      {
        "front": "What is the function of the SQL `COPY` statement in DuckDB?",
        "back": "To export table data or query results directly into structured file formats like CSV, Parquet, or JSON."
      },
      {
        "front": "What is Hive Partitioning recognition during file scans?",
        "back": "A feature that automatically parses key-value directory paths (e.g. `/year=2024/month=10/`) into queryable virtual schema columns."
      },
      {
        "front": "What operation does the `CHECKPOINT` statement trigger in DuckDB?",
        "back": "It flushes in-memory transaction write-ahead logs to persistent main database storage blocks and reclaims file space."
      },
      {
        "front": "What is the purpose of the `QUALIFY` clause in DuckDB SQL syntax?",
        "back": "To filter the results of window functions directly without wrapping the query inside a subquery or CTE."
      },
      {
        "front": "How does DuckDB's Secret Manager assist cloud storage access?",
        "back": "It securely stores and manages authentication credentials for external services like S3 or Azure Object Store."
      },
      {
        "front": "Why can parallel table scans return rows in variable order across query runs?",
        "back": "Morsel scheduling dynamically distributes work chunks across threads, making output order non-deterministic unless `ORDER BY` is explicit."
      },
      {
        "front": "What catalog caching advantage is provided by DuckDB's in-process connection model?",
        "back": "Function pointers, schema catalogs, and memory buffers remain cached across queries on the same connection handle."
      },
      {
        "front": "What is the primary difference between a logical query plan and a physical query plan?",
        "back": "Logical plans define relational operations abstractly, while physical plans assign concrete execution algorithms (e.g. Hash Join vs. Nested Loop Join)."
      },
      {
        "front": "How does subquery unnesting optimize nested SQL queries?",
        "back": "It transforms correlated subqueries into equivalent joins or aggregates, avoiding repeated subquery re-execution per row."
      }
    ]
  }
};

DATA.looks = {
  "1:0": "<pre>Client-server:\n[ App ] -- socket / copy --&gt; [ Server ]\n\nIn-process:\n[ App | DuckDB ]  shared memory, no copy</pre><p class='flagnote'>The briefing's 10x/100x line is its wording, not an SLA.</p>",
  "1:1": "<table class='tbl'><thead><tr><th></th><th>OLTP</th><th>OLAP</th></tr></thead><tbody><tr><td>In process</td><td>SQLite</td><td>DuckDB</td></tr><tr><td>Client-server</td><td>Postgres</td><td>Warehouse</td></tr></tbody></table>",
  "2:0": "<pre>Row:  ID ColA ColB | ID ColA ColB\nCol:  ID ID ID | ColA ColA ColA</pre><p>SUM(amount) on a wide table reads the amount column and skips the rest. A point lookup of one order is SQLite's job.</p>",
  "3:0": "<pre>Volcano:   Scan --1 row--&gt; Filter --1 row--&gt; Agg\nVectorized: Scan --2048--&gt; Filter --2048--&gt; Agg</pre><p>STANDARD_VECTOR_SIZE is 2048. Changing it means rebuilding DuckDB.</p>",
  "3:1": "<table class='tbl'><thead><tr><th>Layout</th><th>What it stores</th></tr></thead><tbody><tr><td>Flat</td><td>Index i at offset i</td></tr><tr><td>Constant</td><td>One value for the chunk</td></tr><tr><td>Dictionary</td><td>Distinct values plus indexes</td></tr><tr><td>Sequence</td><td>Start and step</td></tr></tbody></table>",
  "4:0": "<p>The Justin Bieber problem: one join key owns most of the rows. A fixed hash split pins that stream to one thread. Everyone else sits idle. Morsels are pulled from a queue, so idle threads keep working.</p>",
  "5:0": "<pre>SELECT dt, COUNT(*)\nFROM 'events.parquet'\nWHERE dt = DATE '2026-10-01'\nGROUP BY ALL;</pre><p>No CREATE TABLE. The binder swaps the path for a Parquet scan. CSV type detection samples early rows and can guess wrong.</p>",
  "6:0": "<p>Build the hash table on the small side. Probe with the large side. A sort or a global hash aggregate is a pipeline breaker: it must see all input before it emits. If that table will not fit, the plan has to spill. A plan that cannot spill can kill the process.</p>",
  "7:0": "<table class='tbl'><thead><tr><th>Tell</th><th>Cause</th><th>Fix</th></tr></thead><tbody><tr><td>Database locked</td><td>Second OS process writing</td><td>One writer. Others READ_ONLY</td></tr><tr><td>Transaction conflict</td><td>Two threads, same row</td><td>Retry. Appends do not conflict</td></tr><tr><td>Stall on a share</td><td>File on NFS / NAS</td><td>Keep the writer on a local disk</td></tr></tbody></table><p class='flagnote'>Quack and DuckLake are named in the reports as later multi-writer ideas. They are not the concurrency contract for a local file.</p>",
  "8:0": "<p>Core: SQL engine, C++11, no extra libraries. Extensions: httpfs (OpenSSL inside it), spatial, ICU, Iceberg. INSTALL fetches. LOAD activates. Auto-install does both and talks to extensions.duckdb.org.</p>",
  "9:0": "<p>Local DuckDB never leaves the process. DuckDB plus object storage you control stays in your network. MotherDuck is a cloud warehouse. ATTACH 'md:' is the line that leaves a closed lab. Dual execution can run part of the query in their cloud (CIDR 2024).</p>",
  "10:0": "<p>Elicit did not return a paper that evaluates DuckDB in a classified lab. Smaug (2023) and BiTDB (2024) study SQLite or embedded databases in a TEE. A local binary with no network is not an authorization.</p>",
  "11:0": "<ol><li>Standardize local scans and aggregates on DuckDB.</li><li>Do not start Spark for a file that fits one machine.</li><li>Do not load a CSV just to look at it.</li><li>Time your files. Do not quote 10x or 157 ms as a contract.</li></ol>"
};

DATA.watch = [
  {who:"Hannes Mühleisen",title:"Developer Voices, 2024",url:"https://www.youtube.com/watch?v=pZV9FvdKmLc",why:"Vectors, morsels, and when one machine wins. Ledger S5.",min:"80 min"},
  {who:"Hannes Mühleisen",title:"TigerBeetle overview, 2023",url:"https://www.youtube.com/watch?v=qWtc7k6tnVk",why:"Client-server versus in-process. Ledger S6.",min:"25 min"},
  {who:"Hannes Mühleisen",title:"Data wrangling like a boss, Posit 2024",url:"https://www.youtube.com/watch?v=GELhdezYmP0",why:"CSV, Parquet, Arrow, and the design rationale.",min:"58 min"},
  {who:"Mühleisen and Raasveldt",title:"In-process analytical data management, PyData Amsterdam 2023",url:"https://www.youtube.com/watch?v=5ddoZR6PYNU",why:"Both authors. Shortest of the creator talks.",min:"23 min"},
  {who:"Hannes Mühleisen",title:"Why single-node beats distributed, 2025",url:"https://www.youtube.com/watch?v=o53onmgnQDU",why:"When a cluster is the wrong tool.",min:"34 min"},
  {who:"Hannes Mühleisen",title:"Changing data with confidence, PyData Global 2024",url:"https://www.youtube.com/watch?v=7UqLMHloTsQ",why:"Transactions around changes to analysis data.",min:"30 min"},
  {who:"Hannes Mühleisen",title:"DuckDB and the future of databases, Posit 2025",url:"https://www.youtube.com/watch?v=GvgbcWtHgVY",why:"Plain account of the architecture and the cloud line.",min:"59 min"},
  {who:"Hannes Mühleisen",title:"What happens when a database gets popular, Developer Voices 2026",url:"https://www.youtube.com/watch?v=C3l4CsP1Ak0",why:"Extensions, Quack, and DuckLake. Later than this pack. Not the concurrency contract.",min:"106 min"}
];

DATA.books = [
  {kind:"Book",title:"DuckDB: Up and Running",who:"Wei-Meng Lee",url:"https://learning.oreilly.com/library/view/-/9781098159689/"},
  {kind:"Book",title:"Getting Started with DuckDB",who:"Simon Aubury, Ned Letcher",url:"https://learning.oreilly.com/library/view/-/9781803241005/"},
  {kind:"Book",title:"DuckDB in Action",who:"Mark Needham, Michael Hunger, Michael Simons",url:"https://learning.oreilly.com/library/view/-/9781633437258/"},
  {kind:"Video",title:"DuckDB Essentials",who:"Stephanie Wang",url:"https://learning.oreilly.com/videos/-/0642572040192/"},
  {kind:"Video",title:"DuckDB in Action, video edition",who:"Hunger, Needham, Simons",url:"https://learning.oreilly.com/videos/-/9781633437258VE/"},
  {kind:"Live series",title:"Transforming and Analyzing Data With DuckDB",who:"Christian Winkler",url:"https://learning.oreilly.com/live-events/-/0642572418007/"}
];

DATA.packPages = [
  {slug:"nblm-study-guide",t:"Study guide"},
  {slug:"nblm-mental-models",t:"Mental models"},
  {slug:"nblm-failure-modes",t:"Failure catalog"},
  {slug:"nblm-working-brief",t:"Working briefing"},
  {slug:"nblm-decision-packet",t:"Decision packet"},
  {slug:"nblm-briefing",t:"Briefing"},
  {slug:"nblm-playbook",t:"Practice playbook"},
  {slug:"nblm-key-claims",t:"Claims table"},
  {slug:"nblm-gap-quiz",t:"Engine quiz"},
  {slug:"nblm-gap-cards",t:"80 flashcards"},
  {slug:"nblm-gap-table",t:"Glossary table"},
  {slug:"competitors",t:"Competitors and closed lab"},
  {slug:"elicit",t:"Elicit light research"},
  {slug:"source-ledger",t:"Source ledger"},
  {slug:"quiz-bank",t:"Quiz bank"},
  {slug:"claims-debates",t:"Claims and debates"},
  {slug:"watch-reading",t:"Talks and O'Reilly"}
];

DATA.fromReports = [
  {slug:"nblm-study-guide",title:"Study guide",point:"In-process means the query and the program share memory. Client-server pays for a socket and a copy. The report's 100x line is its wording, not an SLA."},
  {slug:"nblm-study-guide",title:"Study guide",point:"Three execution shapes: one row at a time, the whole result at once, or a chunk of 2048. DuckDB uses the chunk. Volcano is the Postgres and SQLite shape."},
  {slug:"nblm-mental-models",title:"Mental models",point:"A pipeline breaker (hash-join build, hash aggregate, sort) must see all of its input before it can emit. Morsels schedule the scan around that."},
  {slug:"nblm-failure-modes",title:"Failure catalog",point:"Database locked, an out-of-memory join, and a database file on a weak network drive are the three traps to be able to name."},
  {slug:"nblm-working-brief",title:"Working briefing",point:"The comparison table is the placement card: DuckDB, Postgres, SQLite, Polars, Spark. Use it when the quiz asks which tool you would refuse."},
  {slug:"nblm-decision-packet",title:"Decision packet",point:"Standardize local scans and aggregates. Do not start a cluster for a file that fits the machine. Do not load a CSV just to look at it."},
  {slug:"nblm-playbook",title:"Practice playbook",point:"The falsifier still holds: a SQL tour that never explains columns, vectors, or the tool you would not pick."},
  {slug:"nblm-briefing",title:"Briefing",point:"Quack and DuckLake show up here as multi-writer ideas. The contract you can grade yourself on is still the concurrency doc: one writer process, other processes read-only."},
  {slug:"nblm-study-guide",title:"Study guide",point:"DuckDB refuses JIT. Vectorized batches keep the binary small. LLVM would drag a compiler toolchain into the process."},
  {slug:"nblm-mental-models",title:"Mental models",point:"Host fate-sharing: a fatal engine error ends Python, R, or the JVM with it. A server would isolate that crash in a worker."},
  {slug:"nblm-failure-modes",title:"Failure catalog",point:"CSV replacement scans sample early rows to guess types. Unrepresentative first rows give the wrong schema. Declare types or use TRY_CAST."},
  {slug:"nblm-failure-modes",title:"Failure catalog",point:"One core at 100% and the rest idle near the end of a join is the Justin Bieber stall. Morsels are the answer, not a bigger machine."},
  {slug:"nblm-key-claims",title:"Claims table",point:"Strong claims: in-process OLAP, vectors of 2048, morsels, replacement scans, one writer with OCC inside that process. Thin: Quack as a production multi-writer."},
  {slug:"competitors",title:"Competitors note",point:"Elicit found no paper that evaluates DuckDB in a classified lab. Smaug and BiTDB are SQLite or embedded TEE work."},
  {slug:"competitors",title:"Competitors note",point:"Three deployments: local process, object storage you control, MotherDuck. ATTACH md: is the line that leaves a closed lab."},
  {slug:"elicit",title:"Elicit light",point:"The 2026 Information Systems review is a when-one-node-is-enough pointer. It is not a DuckDB product review."},
  {slug:"nblm-decision-packet",title:"Decision packet",point:"The packet's 157 ms and 42,000 GitHub stars are briefing color. Do not treat them as a contract or as a reason to skip measuring your files."},
  {slug:"claims-debates",title:"Claims and debates",point:"A warrant is the If X then Y that makes a source count. Nearby TEE papers do not warrant a DuckDB authorization. Slide speed does not warrant an SLA."}
];

DATA.debateProblem = {
  practical:"Wrong placement: a warehouse for a local scan, or DuckDB for many writers or classified data.",
  research:"Which public claims are definitional, which are causal performance stories, which are analogies, and which are briefing color.",
  soWhat:"A placement that cannot name its warrant will not survive a design review."
};

DATA.debates = [
  {title:"In-process is a win",src:"S4",
   claimA:"The missing socket is the point: the query shares the host process.",
   claimB:"Sharing the host is the liability: a fatal fault ends Python, R, or the JVM.",
   warrant:"If the engine is a library in the host address space, then result rows skip a socket and a fatal fault is a host abort. Same fact, two readings.",
   assume:"The host can spare RAM. The app can restart. The workload does not need a crash boundary.",
   qualify:"Win for local scans. Cost for a long-lived service that must survive a bad query.",
   testA:"Time a Parquet SUM in-process versus the same file loaded into Postgres over a socket.",
   testB:"Load an extension that abort()s and record whether the host dies.",
   testBoth:"Run under a supervisor that restarts the host and say whether that changes the isolation argument."},
  {title:"One machine is enough",src:"S4",
   claimA:"Analytical SQL that fits one box does not start a cluster. DuckDB is embedded OLAP.",
   claimB:"When join state will not fit, or a dead node must not kill the job, Spark is in. S13 is a Hive-alternatives pointer, not a DuckDB review.",
   warrant:"If scan, join state, and spill files fit one machine, a cluster buys coordination without changing the answer.",
   assume:"Fits includes intermediates. Spill is fast enough. One machine dying is acceptable.",
   qualify:"40 GB of Parquet can still OOM on a bad join. max_memory is a threshold.",
   testA:"A local join that finishes with spill, EXPLAIN ANALYZE in hand.",
   testB:"Grow the same join until DuckDB dies, then run it on Spark.",
   testBoth:"A dataset that fits RAM with a hot key; measure morsel idle time versus a static split."},
  {title:"Local DuckDB is the closed-lab answer",src:"S8",
   claimA:"No account and no ATTACH md: means the process never contacts MotherDuck. That is a closed-lab proposal.",
   claimB:"A local binary is not an authorization. Smaug and BiTDB evaluate other engines.",
   warrant:"If the process never opens md: and never auto-installs, it is not using MotherDuck. A SQLite TEE paper does not warrant DuckDB is approved.",
   assume:"No network includes auto-install and httpfs. Files already sit on disks the lab trusts.",
   qualify:"Proposal, not ATO. ATTACH md: is the documented line that leaves the machine.",
   testA:"Packet-capture a local Parquet session with auto-install off; show no outbound hosts.",
   testB:"Keep S11 and S12 labeled nearby work. Elicit found no DuckDB classified eval.",
   testBoth:"First httpfs query with auto-install on; capture extensions.duckdb.org. That leak is not MotherDuck."},
  {title:"Speed multiples are the product",src:"S2",
   claimA:"Vectors of 2048 and columnar layout keep analytical scans in cache.",
   claimB:"10x to 100x and 157 ms per billion rows are briefing lines, not an SLA.",
   warrant:"Cache-resident vectors should beat Volcano on the same core. A slide wall-clock is a claim about that demo.",
   assume:"Hardware and file layout match the demo. STANDARD_VECTOR_SIZE is a rebuild constant.",
   qualify:"Teach 2048 and columnar I/O. Time briefing numbers on your files before repeating them.",
   testA:"EXPLAIN ANALYZE of a two-column aggregate versus a wide SELECT *.",
   testB:"Reproduce 157 ms on a billion-row file you own; publish spec and result.",
   testBoth:"The same query with a pipeline breaker that spills."},
  {title:"Later names end the one-writer rule",src:"S3",
   claimA:"One process writes. Other processes are READ_ONLY. OCC lives inside the writer.",
   claimB:"Quack and DuckLake are named as multi-writer paths in briefings and a later talk. They are catalog claims until a release note is on the ledger.",
   warrant:"The operations manual is the contract this pack grades. A generated briefing warrants discussion, not design.",
   assume:"Readers equate every NotebookLM name with the Foundation engine.",
   qualify:"One-writer is the refusal. Promote Quack or DuckLake only after a primary URL is checked.",
   testA:"Two OS processes INSERT into one file; record the lock error.",
   testB:"Read current DuckDB and DuckLake docs; add a ledger row if a primary page describes multi-writer.",
   testBoth:"One writer plus READ_ONLY readers; readers succeed, a second writer fails."},
  {title:"Auto-install is harmless convenience",src:"S10",
   claimA:"Extensions keep OpenSSL, ICU, and remote IO out of the core binary.",
   claimB:"Extensions run with host rights. Auto-install fetches from extensions.duckdb.org on first use.",
   warrant:"If a feature is an extension, the core can omit it. If auto-install is on, first use is a network fetch.",
   assume:"Signed means approved for this lab. The operator notices the first-use fetch.",
   qualify:"Laptops can leave auto-install on. Closed room: off, unsigned off, ship the binaries you trust.",
   testA:"List which scanners are core versus extension.",
   testB:"Trigger httpfs with auto-install on and capture the host contacted.",
   testBoth:"Vendor a signed extension offline, LOAD it with auto-install off, no fetch."}
];

DATA.drills = {
  where:{title:"Where does it run?",ask:"Where does this work run?",
    options:["Inside your process","A database server","MotherDuck cloud","A Spark cluster"],
    items:[
      {p:"A local SUM over a Parquet file",a:0,why:"DuckDB runs in the process.",src:"S1"},
      {p:"The live application rows, many writers",a:1,why:"That is Postgres or SQLite, not DuckDB.",src:"S3"},
      {p:"A query after ATTACH md:",a:2,why:"Hybrid execution can run in MotherDuck's cloud.",src:"S8"},
      {p:"A join that will not fit one machine",a:3,why:"That is the Spark case.",src:"S4"}
    ]},
  auth:{title:"What may open the file?",ask:"Which access is allowed?",
    options:["One writer process","Many writers","Read-only processes","An extension download"],
    items:[
      {p:"INSERT from the application",a:0,why:"One process writes.",src:"S3"},
      {p:"A second script that also INSERTS",a:0,why:"The second writer is blocked. The answer you want is still one writer. The second attempt fails.",src:"S3"},
      {p:"Three report jobs",a:2,why:"They may read if the file is opened read-only.",src:"S3"},
      {p:"First use of httpfs with auto-install on",a:3,why:"DuckDB will try to fetch the extension.",src:"S10"}
    ]},
  altitude:{title:"Which idea is this?",ask:"Which layer does this belong to?",
    options:["Placement","Engine","Operations","Trust"],
    items:[
      {p:"In-process OLAP versus SQLite",a:0,why:"That is the quadrant.",src:"S4"},
      {p:"A DataChunk of 2048",a:1,why:"That is execution.",src:"S2"},
      {p:"READ_ONLY for other processes",a:2,why:"That is the concurrency rule.",src:"S3"},
      {p:"Do not ATTACH md: in a closed lab",a:3,why:"That is the trust boundary.",src:"S8"}
    ]}
};

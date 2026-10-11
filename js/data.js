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
    {n:1,title:"What DuckDB is",time:"60 min",rungs:"100",lib:"",
     opener:"DuckDB is an in-process column store for analytics on one machine. It is not a server, and it is not a multi-user system of record [S1][S4].",
     obj:"Name the missing quadrant: in-process OLAP. Say what the client-server hop costs.",
     deliv:"A two-sentence definition and the tool you would not pick.",
     mods:[
       {t:"In the process, not on the other side of a socket [S4]",rl:"scope · 100",
        action:"Write the boundary: in for local scans and aggregates, out for many writers.",
        whyMatters:"Most bad designs start by treating DuckDB as Postgres."},
       {t:"The missing quadrant [S4]",rl:"scope · 100",
        action:"Place SQLite, Postgres, Snowflake, and DuckDB on the OLTP/OLAP and embedded/server axes.",
        whyMatters:"SQLite already owns embedded transactions. DuckDB owns the analytical corner."}
     ],
     vids:[{s:1},{s:4}], lib:"block-01-core-concepts"},
    {n:2,title:"How a query runs",time:"90 min",rungs:"200",lib:"",
     opener:"A query reads the columns it names, in batches of 2048, and threads take morsels of that pipeline [S2][S5].",
     obj:"Sketch a scan, a hash join built on the small side, and an aggregate.",
     deliv:"The sketch, plus one line on what EXPLAIN should show.",
     mods:[
       {t:"Columnar scan [S2]",rl:"engine · 200", action:"Explain why SUM(amount) does not read the name column.", whyMatters:"This is the I/O win."},
       {t:"DataChunk of 2048 [S2]",rl:"engine · 200", action:"Contrast a vectorized pipeline with a row-at-a-time loop.", whyMatters:"The batch stays in cache."},
       {t:"Morsels [S5]",rl:"engine · 200", action:"Say what happens to idle threads when one key is huge.", whyMatters:"A fixed split stalls. A queue does not."}
     ],
     vids:[{s:2},{s:5}], lib:"block-02-mental-models"},
    {n:3,title:"Limits and the cloud line",time:"60 min",rungs:"300",lib:"",
     opener:"One process writes. Other processes read only in read-only mode. ATTACH md: leaves the machine [S3][S8].",
     obj:"Name three refusals and the closed-lab rule for extensions.",
     deliv:"A failure mode with its tell and its fix.",
     mods:[
       {t:"Single writer [S3]",rl:"ops · 300", action:"State when a second process may open the file.", whyMatters:"Database locked is usually a second writer."},
       {t:"Extensions and MotherDuck [S8][S10]",rl:"trust · 300", action:"List what must stay off in a closed room.", whyMatters:"An extension runs with the rights of the process, and auto-install fetches from the public site."}
     ],
     vids:[{s:3},{s:7}], lib:"block-05-edge-cases"},
    {n:4,title:"Practice and the reports",time:"90 min",rungs:"200",lib:"nblm-study-guide",
     opener:"The NotebookLM study guide, failure catalog, and decision packet are the long read. The ledger still wins where they disagree.",
     obj:"Work the quiz and one failure mode without notes.",
     deliv:"One card you can explain, and one report claim you will not treat as an SLA.",
     mods:[
       {t:"Study guide",rl:"engine · 200", action:"Read the in-process versus client-server section, then the vector section.", whyMatters:"This is the long form of blocks 1 and 2."},
       {t:"Failure catalog",rl:"ops · 300", action:"Name the tell for a second writer, a join that will not fit, and a file on a network drive.", whyMatters:"Those three are the day-one traps."},
       {t:"Decision packet",rl:"scope · 200", action:"Write the tool you would stop using for a file that fits one machine.", whyMatters:"The packet is a decision, not a feature list."}
     ],
     vids:[{s:5}]}
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
    {cat:"Sketch",model:"any",desc:"Defend one query against the engine, not a feature list.",items:["Parquet events plus a small dimension","A CSV someone wants to load first"],
     flagship:"Sketch a scan, join, and aggregate over a Parquet file of events and a small dimension table. Label which steps are columnar, which side the hash table is built on, and one failure mode. Cite the execution-format doc for the batch size. Do not treat slide speed claims as a guarantee."},
    {cat:"Placement",model:"any",desc:"Pick the tool and name the one you refuse.",items:["40 GB of Parquet on one laptop","Orders table with hundreds of writers"],
     flagship:"Place DuckDB, SQLite, Postgres, Polars, Spark, and MotherDuck on one workload. Say which quadrant DuckDB claims, which tool you would not pick, and why. Use the SIGMOD 2019 paper for the quadrant and the concurrency doc for writers."},
    {cat:"Failure",model:"any",desc:"Name the tell and the fix.",items:["Database locked","Out of memory on a join","Stall on a network drive"],
     flagship:"For each failure, give the tell a person sees, the cause from the concurrency or execution docs, and the change you would make before the next run. Include the closed-room case: auto-install and ATTACH md:."},
    {cat:"Closed lab",model:"any",desc:"Separate a local binary from an authorization.",items:["Air-gapped laptop","Approved MotherDuck account"],
     flagship:"Explain what local DuckDB with no network does and does not prove. Name Smaug and BiTDB as SQLite or embedded TEE papers, not DuckDB certifications. State the exact statement that leaves the machine for MotherDuck."}
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
     bad:"Tell: dual execution runs part of the query in MotherDuck's cloud."}
  ],
  cheat:[
    {t:"Use DuckDB",d:"The working set fits one machine and the question is a scan, join, or aggregate."},
    {t:"Use SQLite or Postgres",d:"Many small writes, or many writers, or the database is the system of record."},
    {t:"Use Spark",d:"The data will not fit one machine, or a dead node must not kill the job."},
    {t:"Measure the briefing numbers",d:"10x and a billion rows in 157 ms are not an SLA. Time your files."}
  ],
  falsifier:"A SQL feature tour that never says how columnar storage and vectorized execution change a query, and never names when Postgres, SQLite, Polars, or Spark is the better tool.",
  quizSections:{1:"Placement",2:"Engine",3:"Limits",4:"NotebookLM"},
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
    {section:3,question:"What does opening :memory: do?",answer:"It creates a database with no file. The data is gone when the connection closes.",src:"S1"}
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
    {category:"Engine",term:"DataChunk",rung:200,essential:true,definition:"A batch of column vectors. The default size is 2048 tuples. [S2]",source:"ledger"},
    {category:"Engine",term:"Vectorized execution",rung:200,essential:true,definition:"Operators process a chunk, not one row at a time, so the working set stays in cache. [S2]",source:"ledger"},
    {category:"Engine",term:"Morsel",rung:200,essential:true,definition:"A chunk of a pipeline that an idle thread pulls from a queue. [S5]",source:"ledger"},
    {category:"Operations",term:"Single writer",rung:300,essential:true,definition:"One process may write a database file. Other processes may read only in read-only mode. [S3]",source:"ledger"},
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
    {category:"Trust",term:"Auto-install",rung:300,essential:true,definition:"Fetches an extension from extensions.duckdb.org on first use. Turn it off in a closed room. [S10]",source:"ledger"},
    {category:"Trust",term:"httpfs",rung:200,definition:"Extension for HTTP and S3-style reads. Not in the zero-dependency core. [S10]",source:"ledger"},
    {category:"Trust",term:"Iceberg",rung:200,definition:"Extension for Iceberg tables. Same trust rule as any other extension. [S10]",source:"ledger"},
    {category:"Trust",term:"ATTACH md:",rung:300,essential:true,definition:"Connects this process to MotherDuck. The query is no longer confined to the machine. [S8]",source:"ledger"},
    {category:"Trust",term:"Dual execution",rung:300,definition:"MotherDuck can run part of a query locally and part in its cloud. [S9]",source:"ledger"},
    {category:"Trust",term:"Closed-lab rule",rung:300,essential:true,definition:"A local binary with no network is not permission to process classified data. Smaug and BiTDB do not certify DuckDB. [S11][S12]",source:"ledger"},
    {category:"Engine",term:"Volcano",rung:200,essential:true,definition:"One row at a time. Postgres and SQLite work this way. DuckDB passes a chunk of 2048 instead.",source:"nblm-study-guide"},
    {category:"Engine",term:"STANDARD_VECTOR_SIZE",rung:200,essential:true,definition:"The default batch: 2048 tuples. That is the size of one DataChunk. [S2]",source:"ledger"},
    {category:"Engine",term:"Pipeline breaker",rung:300,essential:true,definition:"An operator that must see all of its input before it can emit. Hash-join build, hash aggregate, and sort are breakers.",source:"nblm-mental-models"},
    {category:"Engine",term:"Exchange operator",rung:300,definition:"A fixed hash split of a stream into worker channels. One huge key can stall a channel. Morsels avoid that split.",source:"nblm-mental-models"},
    {category:"Engine",term:"Replacement scan",rung:200,essential:true,definition:"FROM 'events.parquet' or a Pandas frame becomes a scan. No CREATE TABLE and no load step first. [S1]",source:"ledger"},
    {category:"Engine",term:"Out-of-core",rung:300,essential:true,definition:"A join or aggregate that does not fit RAM can spill partitions to disk and finish. A plan that cannot spill can kill the process.",source:"nblm-study-guide"},
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
    {category:"Operations",term:"COPY",rung:100,definition:"Writes a table or a query result to CSV, Parquet, or JSON.",source:"nblm-gap"}
  ],
  views:{
    conceptual:{rule:"What and why. In-process analytics, not a server.",lib:"",img:[],
      tables:[{caption:"Quadrant",headers:["","OLTP","OLAP"],rows:[["In process","SQLite","DuckDB"],["Client-server","Postgres","Snowflake / ClickHouse"]]}]},
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
    note:"DuckDB is an engine choice, not an enterprise architecture. The ladder is placement, engine, and operations.",
    rows:[]
  },
  deckFlags:{
    2:"The slide says client protocols are at least 10x slower than raw netcat. Treat that as the slide's claim, not an SLA.",
    11:"DuckLake is named on the slide as a multi-writer idea. The concurrency contract is still the official concurrency page [S3]."
  }
};

DATA.cut = {
  cards: [
    {question:"What cost does an in-process engine remove?",detail:"The socket and the copy of each result row.",why:"The query and the program share one address space.",example:"Python reads the result from memory.",cardSlide:2},
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
  open: "This cut walks the NotebookLM slides.",
  recap: "In-process OLAP, vectors, morsels, one writer, and the line you do not cross into MotherDuck."
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

DATA.fromReports = [
  {slug:"nblm-study-guide",title:"Study guide",point:"In-process means the query and the program share memory. Client-server pays for a socket and a copy. The report's 100x line is its wording, not an SLA."},
  {slug:"nblm-study-guide",title:"Study guide",point:"Three execution shapes: one row at a time, the whole result at once, or a chunk of 2048. DuckDB uses the chunk. Volcano is the Postgres and SQLite shape."},
  {slug:"nblm-mental-models",title:"Mental models",point:"A pipeline breaker (hash-join build, hash aggregate, sort) must see all of its input before it can emit. Morsels schedule the scan around that."},
  {slug:"nblm-failure-modes",title:"Failure catalog",point:"Database locked, an out-of-memory join, and a database file on a weak network drive are the three traps to be able to name."},
  {slug:"nblm-working-brief",title:"Working briefing",point:"The comparison table is the placement card: DuckDB, Postgres, SQLite, Polars, Spark. Use it when the quiz asks which tool you would refuse."},
  {slug:"nblm-decision-packet",title:"Decision packet",point:"Standardize local scans and aggregates. Do not start a cluster for a file that fits the machine. Do not load a CSV just to look at it."},
  {slug:"nblm-playbook",title:"Practice playbook",point:"The falsifier still holds: a SQL tour that never explains columns, vectors, or the tool you would not pick."},
  {slug:"nblm-briefing",title:"Briefing",point:"Quack and DuckLake show up here as multi-writer ideas. The contract you can grade yourself on is still the concurrency doc: one writer process, other processes read-only."}
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

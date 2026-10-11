const SOURCES = [
  {n:1,g:"Official docs",t:"DuckDB documentation",u:"https://duckdb.org/docs/current/index",type:"docs",trust:"high",b:"1"},
  {n:2,g:"Official docs",t:"Execution format (Vector and DataChunk)",u:"https://duckdb.org/docs/current/internals/vector.html",type:"docs",trust:"high",b:"2"},
  {n:3,g:"Official docs",t:"Concurrency",u:"https://duckdb.org/docs/stable/connect/concurrency.html",type:"docs",trust:"high",b:"5"},
  {n:4,g:"Papers",t:"DuckDB: an Embeddable Analytical Database (SIGMOD 2019)",u:"https://doi.org/10.1145/3299869.3320212",type:"paper",trust:"high",b:"1,2"},
  {n:5,g:"Talks",t:"Hannes Mühleisen, Developer Voices (2024)",u:"https://www.youtube.com/watch?v=pZV9FvdKmLc",type:"video",trust:"high",b:"2,4"},
  {n:6,g:"Talks",t:"Hannes Mühleisen, TigerBeetle overview (2023)",u:"https://www.youtube.com/watch?v=qWtc7k6tnVk",type:"video",trust:"high",b:"2"},
  {n:7,g:"Cloud",t:"MotherDuck architecture and dual execution",u:"https://motherduck.com/docs/concepts/architecture-and-capabilities/",type:"docs",trust:"high",b:"5"},
  {n:8,g:"Papers",t:"MotherDuck: DuckDB in the cloud and in the client (CIDR 2024)",u:"https://www.vldb.org/cidrdb/papers/2024/p46-atwal.pdf",type:"paper",trust:"high",b:"5"},
  {n:9,g:"Official docs",t:"Securing extensions",u:"https://duckdb.org/docs/stable/operations_manual/securing_duckdb/securing_extensions",type:"docs",trust:"high",b:"5"}
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
     vids:[{s:1},{s:4}]},
    {n:2,title:"How a query runs",time:"90 min",rungs:"200",lib:"",
     opener:"A query reads the columns it names, in batches of 2048, and threads take morsels of that pipeline [S2][S5].",
     obj:"Sketch a scan, a hash join built on the small side, and an aggregate.",
     deliv:"The sketch, plus one line on what EXPLAIN should show.",
     mods:[
       {t:"Columnar scan [S2]",rl:"engine · 200", action:"Explain why SUM(amount) does not read the name column.", whyMatters:"This is the I/O win."},
       {t:"DataChunk of 2048 [S2]",rl:"engine · 200", action:"Contrast a vectorized pipeline with a row-at-a-time loop.", whyMatters:"The batch stays in cache."},
       {t:"Morsels [S5]",rl:"engine · 200", action:"Say what happens to idle threads when one key is huge.", whyMatters:"A fixed split stalls. A queue does not."}
     ],
     vids:[{s:2},{s:5}]},
    {n:3,title:"Limits and the cloud line",time:"60 min",rungs:"300",lib:"",
     opener:"One process writes. Other processes read only in read-only mode. ATTACH md: leaves the machine [S3][S7].",
     obj:"Name three refusals and the closed-lab rule for extensions.",
     deliv:"A failure mode with its tell and its fix.",
     mods:[
       {t:"Single writer [S3]",rl:"ops · 300", action:"State when a second process may open the file.", whyMatters:"Database locked is usually a second writer."},
       {t:"Extensions and MotherDuck [S7][S9]",rl:"trust · 300", action:"List what must stay off in a closed room.", whyMatters:"An extension runs with the rights of the process, and auto-install fetches from the public site."}
     ],
     vids:[{s:3},{s:7}]}
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
    {cat:"Sketch",model:"any",desc:"Defend one query.",items:["Parquet events plus a small dimension"],
     flagship:"Sketch a scan, join, and aggregate over a Parquet file of events and a small dimension table. Label which steps are columnar, which side the hash table is built on, and one failure mode."}
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
    {title:"Extension download in a closed room",view:"Trust",src:"S9",
     good:"Turn auto-install and auto-load off. Ship the signed extensions you trust. Leave community and unsigned extensions off.",
     bad:"Tell: the process reaches extensions.duckdb.org on first use of a feature."},
    {title:"MotherDuck in a closed lab",view:"Trust",src:"S7",
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
  quizSections:{1:"Placement",2:"Engine",3:"Limits"},
  quiz:[
    {section:1,question:"Which quadrant does DuckDB claim?",answer:"In-process OLAP. SQLite is in-process OLTP. A warehouse is client-server OLAP.",src:"S4"},
    {section:2,question:"What is the default vector size?",answer:"2048 tuples in a DataChunk. Operators run on that batch.",src:"S2"},
    {section:2,question:"Why does a column store help a SUM?",answer:"It reads the summed column and skips the others.",src:"S2"},
    {section:2,question:"What problem do morsels avoid?",answer:"A fixed hash split that leaves threads idle when one key is huge.",src:"S5"},
    {section:3,question:"When may other processes open the same file?",answer:"Only to read, and only in read-only mode. A second writer is blocked.",src:"S3"},
    {section:3,question:"What does ATTACH md: do?",answer:"It connects this process to MotherDuck. Hybrid execution can run part of the query in their cloud.",src:"S7"},
    {section:3,question:"Is local DuckDB an authorization for classified data?",answer:"No. A lab still approves the binary, the extensions, and the machine.",src:"S9"}
  ],
  glossary:[
    {category:"Placement",term:"DuckDB",rung:100,essential:true,definition:"An in-process analytical database. SQL runs in your process. One machine, one writer. [S1][S4]",source:"ledger"},
    {category:"Placement",term:"OLAP",rung:100,essential:true,definition:"Few large scans and aggregates. The workload DuckDB is built for.",source:"ledger"},
    {category:"Placement",term:"OLTP",rung:100,essential:true,definition:"Many small row reads and writes. SQLite and Postgres are built for this.",source:"ledger"},
    {category:"Engine",term:"DataChunk",rung:200,essential:true,definition:"A batch of column vectors. The default size is 2048 tuples. [S2]",source:"ledger"},
    {category:"Engine",term:"Vectorized execution",rung:200,essential:true,definition:"Operators process a chunk, not one row at a time, so the working set stays in cache. [S2]",source:"ledger"},
    {category:"Engine",term:"Morsel",rung:200,essential:true,definition:"A chunk of a pipeline that an idle thread pulls from a queue. [S5]",source:"ledger"},
    {category:"Operations",term:"Single writer",rung:300,essential:true,definition:"One process may write a database file. Other processes may read only in read-only mode. [S3]",source:"ledger"},
    {category:"Trust",term:"MotherDuck",rung:300,essential:true,definition:"A separate cloud warehouse. ATTACH md: can move query work off the machine. [S7][S8]",source:"ledger"},
    {category:"Trust",term:"Extension",rung:200,definition:"Code loaded beside the core. It runs with the rights of the DuckDB process. [S9]",source:"ledger"}
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

DATA.drills = {
  where:{title:"Where does it run?",ask:"Where does this work run?",
    options:["Inside your process","A database server","MotherDuck cloud","A Spark cluster"],
    items:[
      {p:"A local SUM over a Parquet file",a:0,why:"DuckDB runs in the process.",src:"S1"},
      {p:"The live application rows, many writers",a:1,why:"That is Postgres or SQLite, not DuckDB.",src:"S3"},
      {p:"A query after ATTACH md:",a:2,why:"Hybrid execution can run in MotherDuck's cloud.",src:"S7"},
      {p:"A join that will not fit one machine",a:3,why:"That is the Spark case.",src:"S4"}
    ]},
  auth:{title:"What may open the file?",ask:"Which access is allowed?",
    options:["One writer process","Many writers","Read-only processes","An extension download"],
    items:[
      {p:"INSERT from the application",a:0,why:"One process writes.",src:"S3"},
      {p:"A second script that also INSERTS",a:0,why:"The second writer is blocked. The answer you want is still one writer. The second attempt fails.",src:"S3"},
      {p:"Three report jobs",a:2,why:"They may read if the file is opened read-only.",src:"S3"},
      {p:"First use of httpfs with auto-install on",a:3,why:"DuckDB will try to fetch the extension.",src:"S9"}
    ]},
  altitude:{title:"Which idea is this?",ask:"Which layer does this belong to?",
    options:["Placement","Engine","Operations","Trust"],
    items:[
      {p:"In-process OLAP versus SQLite",a:0,why:"That is the quadrant.",src:"S4"},
      {p:"A DataChunk of 2048",a:1,why:"That is execution.",src:"S2"},
      {p:"READ_ONLY for other processes",a:2,why:"That is the concurrency rule.",src:"S3"},
      {p:"Do not ATTACH md: in a closed lab",a:3,why:"That is the trust boundary.",src:"S7"}
    ]}
};

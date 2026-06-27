export type Project = {
  title: string;
  subtitle: string;
  stack: string[];
  signal: string;
  stat: string;
  problem: string;
  solution: string;
  challenges: string;
  metrics: string[];
  github?: string;
  demo?: string;
  architecture: string[];
  snippet: string;
};

export const links = {
  email: "mailto:mailmeataryan747@gmail.com",
  linkedin: "https://www.linkedin.com/in/aryan-choudhary-b14665280/",
  github: "https://github.com/AryanChoudharyy",
  resume: "/Aryan_Choudhary_Nexo.pdf",
};

export const experience = [
  {
    role: "Software Engineer Intern",
    place: "TalkingLands",
    date: "Dec 2024 - Feb 2025",
    location: "Bengaluru, India",
    detail:
      "Built a React Native product for real estate buyers, improved perceived waiting time, shipped dynamic product features, and validated FastAPI workflows with external API integrations.",
  },
  {
    role: "AI SDE Intern",
    place: "Dukaan",
    date: "Aug 2024 - Oct 2024",
    location: "Bengaluru, India",
    detail:
      "Created an OpenAI function-calling hotel booking chatbot, engineered a RAG retrieval pipeline with vector embeddings and Wasabi S3, and shipped the Bot9.ai landing page with a perfect Lighthouse score.",
  },
  {
    role: "President",
    place: "Chess Club, Scaler School of Technology",
    date: "2023 - 2024",
    location: "Bengaluru, India",
    detail:
      "Led club activities, organized tournaments, and coordinated student community events across batches.",
  },
];

export const projects: Project[] = [
  {
    title: "FactorLab Pro",
    subtitle: "Point-in-time equity research terminal",
    stack: ["Python", "CVXPY", "SEC EDGAR", "Plotly", "Next.js"],
    signal: "Quant terminal",
    stat: "5 factor families",
    problem:
      "Quant research needs clean point-in-time fundamentals, market data, and attribution in one reliable workflow.",
    solution:
      "Engineered a US equity research pipeline that combines SEC XBRL fundamentals with adjusted market data, factor modeling, portfolio constraints, automated caching, validation, and interactive tear sheets.",
    challenges:
      "Kept the factor pipeline disciplined with sector-relative winsorization, size and sector neutralization, rank IC checks, decile monotonicity tests, and turnover-aware portfolio construction.",
    metrics: [
      "Value, quality, momentum, low-volatility, and investment factors",
      "Long-only and dollar-neutral constrained portfolios",
      "Parquet caching, Zod validation, and Plotly attribution",
    ],
    github: "https://github.com/AryanChoudharyy/FactorLab-Pro",
    architecture: ["SEC XBRL", "Factor engine", "CVXPY optimizer", "Next.js terminal"],
    snippet:
      "neutralize(rank(winsorize(factor)), by=[sector, size]) -> optimize(portfolio, constraints)",
  },
  {
    title: "Distributed KV Cache",
    subtitle: "Raw TCP storage engine",
    stack: ["Python", "asyncio", "TCP", "Docker"],
    signal: "Systems core",
    stat: "12K req/sec",
    problem:
      "A high-throughput in-memory database needs predictable networking behavior without framework overhead.",
    solution:
      "Built a key-value server from scratch using raw TCP sockets and asynchronous networking, then containerized it for simplified deployment.",
    challenges:
      "Focused on request parsing, async connection handling, AWS load testing, and operational packaging without hiding behind a managed database layer.",
    metrics: ["Nearly 12,000 requests/sec", "Zero errors during AWS load testing", "Dockerized runtime"],
    github: "https://github.com/AryanChoudharyy/KV-cache-HLD-101",
    architecture: ["TCP socket", "Async parser", "Memory store", "Docker runtime"],
    snippet: "asyncio.start_server(handle_client) -> parse(command) -> mutate(memory)",
  },
  {
    title: "Live Polling System",
    subtitle: "Shard-aware vote ingestion",
    stack: ["Redis", "Python", "Consistent Hashing"],
    signal: "Realtime infra",
    stat: "sub-5ms latency",
    problem:
      "Live voting systems need to absorb sharp bursts without wasting writes or creating latency spikes.",
    solution:
      "Built a distributed backend that uses shard-aware routing and intelligent write batching to process votes with very low latency.",
    challenges:
      "Balanced throughput, routing, and infrastructure load while keeping the vote path fast enough for real-time feedback.",
    metrics: ["More than 10,000 votes/sec", "Sub-5ms latency", "Approximately 80% lower infrastructure load"],
    github: "https://github.com/AryanChoudharyy/Distributed_Live_Polling_System",
    architecture: ["Vote API", "Hash ring", "Redis shards", "Batch writer"],
    snippet: "shard = ring.locate(poll_id); batch.enqueue(shard, vote); flush(interval=ms)",
  },
  {
    title: "Reflection",
    subtitle: "Campus food pre-ordering app",
    stack: ["React Native", "Node.js"],
    signal: "Live product",
    stat: "100+ downloads",
    problem:
      "Students lose time in long canteen queues between classes, especially when pickup timing matters.",
    solution:
      "Co-built a campus food pre-ordering platform with scheduled pickup workflows so students can order ahead and collect meals at designated time slots.",
    challenges:
      "Designed around real campus usage where reliability, timing, and simple mobile flows matter more than novelty.",
    metrics: ["Live on the Play Store", "100+ downloads", "4.4-star rating"],
    demo: "https://play.google.com/store/apps/details?id=com.everytact.refection",
    architecture: ["Mobile order", "Pickup scheduler", "Node backend", "Campus users"],
    snippet: "order.time_slot -> kitchen.queue -> pickup.ready -> student.collects",
  },
];

export const aiNodes = [
  ["LLMs", "LLM", "Function calling, workflow design, and practical product use."],
  ["RAG", "RAG", "Retrieval pipelines with vector embeddings and document queries."],
  ["OpenAI", "OA", "AI chatbot work and function-calling product flows."],
  ["Claude Pro", "CL", "Rapid prototyping, debugging, and backend feature acceleration."],
  ["OpenAI Codex", "CX", "AI-assisted engineering workflows listed in the resume skill set."],
  ["Vector Databases", "VDB", "Semantic retrieval patterns for business document queries."],
  ["Prompt Engineering", "PE", "Structured instructions for dependable AI behavior."],
  ["FastAPI", "API", "Proof-of-concept backends and external API validation."],
  ["Python", "PY", "Quant pipelines, distributed systems, and backend services."],
  ["Node", "ND", "Product backends and application infrastructure."],
];

export const techStack = [
  { label: "Python", symbol: "PY", group: "language" },
  { label: "TypeScript", symbol: "TS", group: "language" },
  { label: "React", symbol: "R", group: "interface" },
  { label: "Next.js", symbol: "N", group: "interface" },
  { label: "React Native", symbol: "RN", group: "interface" },
  { label: "FastAPI", symbol: "API", group: "backend" },
  { label: "Node.js", symbol: "ND", group: "backend" },
  { label: "Docker", symbol: "DX", group: "infra" },
  { label: "Redis", symbol: "RD", group: "data" },
  { label: "PostgreSQL", symbol: "PG", group: "data" },
  { label: "AWS", symbol: "AWS", group: "infra" },
  { label: "OpenAI", symbol: "AI", group: "ai" },
  { label: "Claude Pro", symbol: "CL", group: "ai" },
  { label: "CVXPY", symbol: "CVX", group: "quant" },
  { label: "Plotly", symbol: "PL", group: "viz" },
  { label: "Pandas", symbol: "PD", group: "data" },
];

export const numbers = [
  { value: 4, suffix: "+", label: "Production projects" },
  { value: 2, suffix: "", label: "Internships" },
  { value: 100, suffix: "+", label: "App downloads" },
  { value: 12, suffix: "K+", label: "Requests/sec" },
  { value: 10, suffix: "K+", label: "Votes/sec" },
];

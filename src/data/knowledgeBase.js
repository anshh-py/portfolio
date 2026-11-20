/**
 * Knowledge base for the "Ask Ansh" assistant.
 * -------------------------------------------
 * Local, structured Q&A tailored for recruiters and technical interviewers.
 * Every answer is grounded in the real portfolio data. No LLM is involved;
 * this module is deliberately isolated so a real model backend can be
 * connected later.
 */

import { site } from "./site";
import { projects } from "./projects";

export const identity = {
  name: site.name,
  role: site.role,
  education: "Bachelor of Computer Applications, University of Rajasthan, 2026",
  summary:
    "AI Engineer building practical AI-powered applications with machine learning, LLMs, RAG and agentic workflows.",
};

/* ------------------------------------------------------------------ */
/* Category structure (used for organisation and future LLM routing)   */
/* ------------------------------------------------------------------ */
export const categories = [
  "candidate_profile",
  "education",
  "experience",
  "projects",
  "technical_skills",
  "engineering_approach",
  "research",
  "hiring_questions",
  "limitations",
  "contact",
];

/* Follow-up cues re-use the most recent topic for elaboration. */
const FOLLOW_UP_RE =
  /^(more|more detail|more details|elaborate|expand|go on|continue|tell me more|explain further|details|how exactly|can you say more|and why|and how|so what)\b/i;

/* ------------------------------------------------------------------ */
/* Knowledge entries                                                   */
/* ------------------------------------------------------------------ */
const projectEntries = projects.map((p) => ({
  id: p.id,
  category: "projects",
  keywords: [
    p.title.toLowerCase(),
    p.id.replace(/-/g, " "),
    p.id.split("-")[0],
    ...p.technologies.map((t) => t.toLowerCase()),
  ],
  answer: `${p.title}: ${p.description} Key engineering highlights: ${p.highlights.join(
    "; "
  )} Repository: ${p.github}`,
  elaborate: `${p.title} — the problem: ${p.problem} What it does: ${p.implementation} Key challenges tackled: ${p.challenges} Built with: ${p.technologies.join(
    ", "
  )}.`,
}));

const entries = [
  /* ---------- candidate_profile ---------- */
  {
    id: "professional-introduction",
    category: "candidate_profile",
    keywords: ["who is", "who are you", "about you", "introduce", "introduction", "tell me about yourself", "yourself", "bio", "profile", "professional introduction"],
    answer:
      "I'm Ansh Anand, an AI Engineer focused on building practical AI-powered applications. My work spans applied machine learning, generative AI and LLM engineering — RAG, embeddings, semantic search, prompt engineering, tool calling and agents — plus the backend that ships them: FastAPI, PostgreSQL, Supabase and Render. I take projects beyond prototypes into working applications.",
    elaborate:
      "Concretely: I design and build complete systems. Vehicle IQ couples OCR and computer vision with an XGBoost valuation model behind a FastAPI service. PageGlance turns live web-page content into grounded, cited RAG answers in a Chrome extension. Car World AI wires LLM tool calling, persistent memory and provider fallback into a conversational agent. I also ship the backend and deployment around each one.",
  },
  {
    id: "specialization",
    category: "candidate_profile",
    keywords: ["specialize", "specialise", "specialty", "speciality", "focus", "career focus", "niche", "specialization", "what does ansh do", "what does he do", "area of work", "what are you", "do you do"],
    answer:
      "Ansh specializes in building practical AI-powered applications. His core work is applied machine learning and LLM engineering — RAG, embeddings, semantic search, prompt engineering, tool calling and agents — wrapped in the backend that ships them (FastAPI, PostgreSQL, Supabase, Render). He focuses on turning models into dependable software rather than on models alone.",
  },
  {
    id: "why-hire",
    category: "hiring_questions",
    keywords: ["why hire", "why should i", "why would i", "reason to hire", "hire ansh", "hire him", "should we hire"],
    answer:
      "You'd hire Ansh because he builds complete, working systems rather than isolated demos. Each featured project shows end-to-end ownership: Vehicle IQ couples OCR and computer vision with an XGBoost valuation model behind a FastAPI service; PageGlance turns live page content into grounded, cited RAG answers in a Chrome extension; Car World AI wires LLM tools, memory, provider fallback and streaming into a conversational agent. He understands the whole journey — problem framing, architecture, implementation, testing and deployment — so he can contribute immediately to teams building practical AI products.",
  },
  {
    id: "junior-suitability",
    category: "hiring_questions",
    keywords: ["junior", "entry level", "entry-level", "suitable", "fit for", "good fit", "right for", "worth hiring", "qualified", "appropriate role", "applied ai role"],
    answer:
      "Yes, Ansh is a strong candidate for Junior AI Engineer and Applied AI Engineer roles. He demonstrates real engineering depth across machine learning, LLM/RAG applications, computer vision, backend APIs and deployed software. He may not have years of corporate seniority, but he offsets that with demonstrated ownership of complete projects and the discipline of building, testing and shipping. He's an early-career engineer who can own a feature end to end.",
  },
  {
    id: "hiring-recommendation",
    category: "hiring_questions",
    keywords: ["should i hire", "would you shortlist", "shortlist", "worth interviewing", "worth considering", "should i interview", "recommend", "recommendation", "would you recommend", "would he fit", "fit an applied ai team", "hiring recommendation", "should we interview"],
    answer:
      "Yes, Ansh is a promising candidate worth interviewing for Junior AI Engineer and Applied AI Engineer positions. His portfolio demonstrates practical work across RAG systems, LLM applications, computer vision, machine learning, backend APIs and deployed software products. He has taken projects beyond prototypes into working applications. I would particularly consider him for teams building practical AI products.",
  },
  {
    id: "differentiators",
    category: "hiring_questions",
    keywords: ["different", "unique", "stands out", "stand out", "set apart", "distinguishes", "why him", "over others", "other candidates", "what makes him different"],
    answer:
      "What sets Ansh apart is that he ships. Many portfolios stop at notebooks or demos; his projects are working applications with product thinking around them — retrieval that is grounded and cited, memory that persists, provider failover that is handled, and services backed by real databases. He cares about the engineering around the model: architecture, APIs, testing and deployment, not just the model itself.",
  },

  /* ---------- education ---------- */
  {
    id: "education",
    category: "education",
    keywords: ["education", "degree", "university", "college", "study", "student", "academic", "background", "bca", "bachelor", "qualifications", "where did you study"],
    answer:
      "I hold a Bachelor of Computer Applications from the University of Rajasthan (2026). Hands-on AI engineering — building and shipping real applications — is a core part of how I work and continue learning.",
  },

  /* ---------- experience ---------- */
  {
    id: "experience-overview",
    category: "experience",
    keywords: ["experience", "work experience", "professional", "have you worked", "employment", "jobs", "career history", "freelance", "freelancing", "independent projects"],
    answer:
      "Ansh's practical engineering experience comes from independent projects and a client engagement, alongside his studies. This includes a business-operations platform for Satish Motors, an automotive spare-parts business (digitization, CRM, follow-ups, inventory, procurement, sales, owner authentication, backend APIs, PostgreSQL and Redis), plus three shipped AI products: Vehicle IQ, PageGlance and Car World AI. This is independent project and client work rather than corporate employment.",
  },
  {
    id: "business-platform",
    category: "experience",
    keywords: ["business operations", "operations platform", "spare parts", "spare-parts", "automotive spare", "satish", "motors", "tata", "crm", "inventory", "procurement", "freelance developer"],
    answer:
      "Ansh built a Business Operations Platform for Satish Motors, an automotive spare-parts business, as an AI Automation Developer in a client engagement. It digitises core workflows — operational dashboard, customer enquiries and CRM, follow-ups, inventory management, procurement and approvals, sales and orders, and owner authentication — served by backend APIs with PostgreSQL and Redis, plus automation integration and browser verification. This was a software-development client engagement, not employment at any automotive manufacturer.",
  },
  {
    id: "corporate-employment",
    category: "limitations",
    keywords: ["corporate", "employment", "company job", "traditional job", "full-time job", "worked at", "hire a full-time", "no corporate", "lack of corporate", "not employed"],
    answer:
      "To be transparent: Ansh does not yet have traditional corporate employment. His experience is in independent projects and a client engagement, alongside his studies. When considering him, weigh demonstrated ownership of complete, shipped projects and his practical AI engineering skills rather than years of company tenure.",
  },

  /* ---------- technical skills ---------- */
  {
    id: "skills",
    category: "technical_skills",
    keywords: ["skills", "technologies", "tech", "stack", "tools", "work with", "what do you know", "languages", "programming languages"],
    answer:
      "Ansh works with: Python, JavaScript and SQL; machine learning (scikit-learn, XGBoost, pandas, NumPy); computer vision and OCR; generative AI and LLM engineering (RAG, embeddings, semantic search, prompt engineering, tool calling, conversational AI, agents); backend (FastAPI, REST APIs, PostgreSQL, Supabase, Redis); and deployment (Git, GitHub, Render, Vercel). He focuses on a practical subset he actually uses, rather than listing everything.",
  },
  {
    id: "ai-ml-skills",
    category: "technical_skills",
    keywords: ["machine learning", "ml", "ai skills", "computer vision", "ocr", "xgboost", "scikit", "pandas", "numpy", "models", "model", "deep learning"],
    answer:
      "On the ML side, Ansh has applied scikit-learn, XGBoost, pandas and NumPy, and used computer vision and OCR in Vehicle IQ to read documents and detect vehicle damage. He is pragmatic about models — he selects and calibrates them to solve a concrete problem rather than chasing benchmarks.",
  },
  {
    id: "llm-skills",
    category: "technical_skills",
    keywords: ["llm", "llms", "rag", "retrieval", "embeddings", "semantic", "prompt", "tool calling", "agents", "agentic", "generative", "langchain", "langgraph", "chatgpt", "gpt", "conversational"],
    answer:
      "Ansh's core focus is LLM application engineering: retrieval-augmented generation, embeddings and semantic search, prompt engineering, tool calling, conversational AI and agentic workflows. He builds grounded, reliable LLM features — retrieval is cited (PageGlance), memory persists (Car World AI), and providers can fail over without breaking the session.",
  },
  {
    id: "backend-deployment-skills",
    category: "technical_skills",
    keywords: ["backend", "api", "apis", "rest", "fastapi", "deployment", "deploy", "infrastructure", "server", "hosting", "production", "render", "vercel", "docker"],
    answer:
      "For backend and deployment, Ansh builds FastAPI REST services with PostgreSQL, Supabase and Redis, and ships them on Render and Vercel using Git and GitHub. He values the engineering around the model — clean API contracts, persistence, error handling and deployment — so the application actually runs for users.",
  },
  {
    id: "tools",
    category: "technical_skills",
    keywords: ["tools", "ide", "vscode", "vs code", "postman", "vite", "react", "javascript", "git", "github"],
    answer:
      "Everyday tools and languages include Python, JavaScript, SQL, React and Vite, plus VS Code, Postman, Git and GitHub.",
  },

  /* ---------- engineering approach ---------- */
  {
    id: "approach",
    category: "engineering_approach",
    keywords: ["approach", "method", "process", "how do you build", "engineering", "workflow", "methodology", "problem-solving", "problem solving", "solve problems", "problem", "architecture", "design"],
    answer:
      "Ansh follows a disciplined loop: (1) understand the real problem and constraints, (2) design the architecture and data flow, (3) build a working prototype in small reviewable increments, (4) validate beyond happy paths, and (5) ship a minimal viable version and iterate on real feedback.",
  },
  {
    id: "project-architecture",
    category: "engineering_approach",
    keywords: ["architecture", "system design", "system", "services", "components", "how is it built", "structure", "layers", "data flow"],
    answer:
      "He designs systems as clear layers: a data/ingestion layer, model or reasoning logic, an API service, and persistent storage — keeping boundaries clean so each piece can be tested and replaced. Vehicle IQ is a pipeline (ingest → extract → value → report), Car World AI separates memory, tools and model providers, and PageGlance separates indexing, retrieval and generation.",
  },
  {
    id: "testing",
    category: "engineering_approach",
    keywords: ["test", "testing", "validate", "validation", "edge cases", "evaluate", "evaluation", "quality"],
    answer:
      "He validates beyond happy paths: edge cases, model behaviour, error handling and integration checks — and verifies deployed output in a real browser before considering work done.",
  },

  /* ---------- projects ---------- */
  ...projectEntries,
  {
    id: "repositories",
    category: "projects",
    keywords: ["repository", "repos", "github", "projects", "what have you built", "portfolio", "code", "open source", "repos"],
    answer:
      "All repositories are on GitHub at ${site.github}. The three featured projects are Vehicle IQ, PageGlance and Car World AI, each with its own repo link in the Projects section.",
  },

  /* ---------- research ---------- */
  {
    id: "research",
    category: "research",
    keywords: ["research", "currently working", "current", "thesis", "fuel", "truck", "heavy-duty", "explainable", "agentic feedback", "studying", "what are you researching"],
    answer:
      "Ansh is working on ongoing research titled \"Cross-Truck Fuel-Rate Prediction and Explainable Agentic Driver-Feedback System for Heavy-Duty Vehicles.\" It explores predicting fuel consumption across heavy-duty vehicles and turning those predictions into explainable, agentic driver feedback. It is a work in progress — he has not published results and will share concrete findings as it matures.",
  },

  /* ---------- limitations ---------- */
  {
    id: "limitations",
    category: "limitations",
    keywords: ["weakness", "weaknesses", "weak", "improve", "improvement", "areas of growth", "struggle", "not good at", "shortcomings", "gaps", "lack", "limitation", "limitations", "honest"],
    answer:
      "Honest limitations: Ansh is early-career, so he hasn't operated high-traffic production systems or led teams, and he is still deepening his breadth in large-scale distributed ML and broader infrastructure. He also deliberately focuses on a practical set of technologies rather than claiming mastery across everything. He sees these as areas to grow into, not things to hide.",
  },
  {
    id: "production-scale",
    category: "limitations",
    keywords: ["production", "scale", "scaled", "production usage", "traffic", "users", "metrics", "performance", "benchmark", "accuracy", "results"],
    answer:
      "Ansh's deployed work is shipped software (on Render and Vercel) that he verified in a browser — that is distinct from proven production usage at significant scale. He does not claim metrics he hasn't measured, and he is transparent about the difference between a working deployed application and a high-traffic production system.",
  },
  {
    id: "unknown",
    category: "limitations",
    keywords: [],
    answer: "",
  },

  /* ---------- contact / interests ---------- */
  {
    id: "contact",
    category: "contact",
    keywords: ["contact", "email", "reach", "hire", "connect", "linkedin", "message", "get in touch", "in touch", "talk to", "how do i reach", "availability"],
    answer:
      "The best ways to reach Ansh: email ${site.email}, LinkedIn (${site.linkedin}), or GitHub (${site.github}). He is open to AI engineering roles, collaborations and interesting problems, and is available to discuss opportunities — interviews welcome.",
  },
  {
    id: "availability",
    category: "contact",
    keywords: ["available", "availability", "interviews", "interview", "when can you start", "open to", "looking for", "seeking", "opportunities", "roles", "career interests", "goal", "aspire"],
    answer:
      "Ansh is actively open to Junior AI Engineer and Applied AI Engineer opportunities. He is flexible on interview timing and reachable by email (${site.email}) or LinkedIn. His focus is on teams building practical AI products.",
  },
];

/** Concise default answer for a category, with an optional expanded version. */
export const knowledge = entries.filter((e) => e.id !== "unknown");

/* ------------------------------------------------------------------ */
/* Matching                                                            */
/* ------------------------------------------------------------------ */
function normalize(raw) {
  return raw.toLowerCase().replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Intent matcher. Returns the best-matching entry, or null.
 * - `last` (optional) lets follow-up questions elaborate on the prior topic.
 */
export function matchIntent(raw, last = null) {
  const q = normalize(raw);
  if (!q) return null;

  // Follow-up phrasing re-uses the last topic when it matches.
  if (last && FOLLOW_UP_RE.test(q)) return last;

  let best = null;
  let bestScore = 0;
  for (const entry of entries) {
    let score = 0;
    for (const kw of entry.keywords) {
      const k = normalize(kw);
      if (!k || k.length < 3) continue;
      if (q.includes(k)) {
        // Multi-word phrases are stronger signals than single words.
        score += k.includes(" ") ? k.length * 2 : k.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return bestScore >= 4 ? best : null;
}

/** Resolve a full answer, using follow-up context when available. */
export function answerFor(raw, last = null) {
  const entry = matchIntent(raw, last);
  if (!entry) return fallbackAnswer;
  const isFollowUp = last && FOLLOW_UP_RE.test(normalize(raw));
  return isFollowUp && entry.elaborate ? entry.elaborate : entry.answer;
}

export const fallbackAnswer =
  "I'm sorry, I don't have a solid answer for that yet. My knowledge base covers Ansh's background, education, experience, the three featured projects, skills, engineering approach, research, honest limitations and contact details. You could try a suggested question, or reach out directly by email (anshanand317@gmail.com).";

export const suggestedQuestions = [
  "What does Ansh specialize in?",
  "Should I interview Ansh for a Junior AI Engineer role?",
  "Tell me about Vehicle IQ.",
  "How does PageGlance work?",
  "What makes Car World AI different?",
  "What is Ansh currently researching?",
  "What are Ansh's honest limitations?",
  "How can I contact Ansh?",
];

export const projects = [
  {
    id: "vehicle-iq",
    title: "Vehicle IQ",
    description:
      "Vehicle information is fragmented across specifications, documents, images, and market listings. Evaluating a vehicle requires extracting and combining multiple types of information.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "XGBoost",
      "Computer Vision",
    ],
    highlights: [
      "Data extraction, OCR and computer vision over vehicle imagery and docs",
      "XGBoost valuation model behind a FastAPI service",
      "PostgreSQL persistence with consolidated reporting per unit",
    ],
    problem:
      "Vehicle information is fragmented across specifications, documents, images, and market listings. Evaluating a vehicle requires extracting and combining multiple types of information.",
    implementation:
      "I built a modular vehicle-intelligence platform involving data extraction, OCR, computer vision-based damage detection, XGBoost valuation, FastAPI, PostgreSQL, and reporting.",
    improves:
      "It enables structured vehicle information, automated extraction from supported inputs, damage assessment capabilities, valuation estimates, and consolidated reporting.",
    challenges:
      "Reliably extracting text from varied image quality, structuring noisy document data, and keeping the valuation model calibrated with limited data.",
    learning:
      "I learned multimodal data processing, OCR and computer vision integration, ML model evaluation, API architecture, database persistence, and how hard it is to combine multiple subsystems into one application.",
    github: "https://github.com/anshh-py/Vehicle-IQ",
    demo: null,
  },
  {
    id: "pageglance",
    title: "PageGlance",
    description:
      "Readers often need to search through long webpages to locate specific information and understand it in context. I built a Chrome extension to make that conversational.",
    technologies: ["Python", "RAG", "all-MiniLM-L6-v2", "PostgreSQL", "Chrome Extension"],
    highlights: [
      "Retrieval-augmented Q&A over live page content",
      "Semantic retrieval with all-MiniLM-L6-v2 embeddings",
      "Grounded answers cite the exact source passages",
    ],
    problem:
      "Readers often need to search through long webpages to locate specific information and understand it in context.",
    implementation:
      "I built a Chrome extension using page-content extraction, chunking, all-MiniLM-L6-v2 embeddings, semantic retrieval, and RAG-based question answering with citations.",
    improves:
      "Users can ask questions about the current webpage and receive answers grounded in relevant passages, with source citations.",
    challenges:
      "Retrieving the right passages from messy live HTML, timing the index during page loads, and ensuring answers actually cite their source.",
    learning:
      "I learned document processing, chunking strategies, embeddings, vector search, retrieval quality, grounded generation, and citation-based answer verification.",
    github: "https://github.com/anshh-py/PageGlance",
    demo: null,
  },
  {
    id: "car-world-ai",
    title: "Car World AI",
    description:
      "An automotive conversational assistant that handles context-aware questions with persistent memory, tool calling, and provider fallback.",
    technologies: ["Python", "Gradio", "LLM APIs", "Supabase", "Render"],
    highlights: [
      "Tool-calling agent loop for resolving automotive queries",
      "Conversation memory persisted in Supabase",
      "Provider fallback plus response streaming keep sessions reliable",
    ],
    problem:
      "Automotive questions can require contextual understanding, persistent conversation history, and external tool execution. Dependence on a single LLM provider can also interrupt availability.",
    implementation:
      "I built an automotive conversational assistant with LLM integration, Supabase-backed conversation memory, tool calling, provider fallback, and streaming responses.",
    improves:
      "It enables context-aware conversations, persistent memory, tool-assisted query handling, and resilience when a provider becomes unavailable.",
    challenges:
      "Keeping consistent memory across turns, defining a useful tool surface, and switching providers mid-session without breaking the experience.",
    learning:
      "I learned LLM orchestration, tool-calling patterns, conversation state, provider abstraction, fallback handling, streaming, and application reliability.",
    github: "https://github.com/anshh-py/Car-World",
    demo: null,
  },
];

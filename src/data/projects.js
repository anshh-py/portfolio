export const projects = [
  {
    id: "vehicle-iq",
    title: "Vehicle IQ",
    description:
      "A modular vehicle-intelligence platform. It extracts structured data from vehicle specs and documents, uses OCR and computer vision to read text and detect body damage, and runs an XGBoost model to estimate fair market value — with reporting for each unit.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "XGBoost",
      "Computer Vision",
    ],
    highlights: [
      "End-to-end pipeline: image ingestion \u2192 extraction \u2192 valuation \u2192 reporting",
      "Computer-vision damage detection and OCR over vehicle imagery and docs",
      "FastAPI service with PostgreSQL persistence for vehicles, estimates and market data",
    ],
    github: "https://github.com/anshh-py/Vehicle-IQ",
    demo: null,
  },
  {
    id: "pageglance",
    title: "PageGlance",
    description:
      "A Chrome extension that answers questions about the page you're reading. It indexes the current page's content, retrieves the most relevant passages with semantic embeddings, and generates answers grounded in those passages with citations.",
    technologies: ["Python", "RAG", "all-MiniLM-L6-v2", "PostgreSQL", "Chrome Extension"],
    highlights: [
      "Retrieval-augmented Q&A over live page content",
      "Semantic retrieval with all-MiniLM-L6-v2 embeddings",
      "Grounded answers cite the exact source passages",
    ],
    github: "https://github.com/anshh-py/PageGlance",
    demo: null,
  },
  {
    id: "car-world-ai",
    title: "Car World AI",
    description:
      "A conversational assistant for automotive questions. It keeps conversation memory in Supabase, gives the LLM tools to call when queries need resolution, and abstracts across LLM providers so chat stays responsive if one fails.",
    technologies: ["Python", "Gradio", "LLM APIs", "Supabase", "Render"],
    highlights: [
      "Tool-calling agent loop for resolving automotive queries",
      "Conversation memory persisted in Supabase",
      "Provider fallback plus response streaming keep sessions reliable",
    ],
    github: "https://github.com/anshh-py/Car-World",
    demo: null,
  },
];

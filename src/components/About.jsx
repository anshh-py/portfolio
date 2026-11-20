import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Database, GitBranch, Layers, Server, Workflow } from "lucide-react";

const points = [
  {
    icon: Layers,
    title: "Full applications",
    text: "I build complete AI applications — not isolated notebooks.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    text: "FastAPI services and REST endpoints that serve models reliably.",
  },
  {
    icon: Database,
    title: "Databases",
    text: "PostgreSQL and Supabase to keep context and state persistent.",
  },
  {
    icon: Workflow,
    title: "AI integration",
    text: "LLMs, RAG and agentic workflows wired into real products.",
  },
  {
    icon: GitBranch,
    title: "Deployment",
    text: "Shipping and iterating on live infrastructure.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-t border-line py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="About"
            title="Engineering that ships, not just experiments."
            description="I'm an AI Engineer focused on turning models into dependable, useful software."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <p className="text-lg leading-relaxed text-muted">
            My interest lies in the whole journey: understanding the problem,
            designing the architecture, training or integrating the model, and
            then actually shipping it. I care about the engineering around the
            model — the APIs, databases and deployment that make an idea useful
            to real users.
          </p>
          <p className="text-lg leading-relaxed text-muted">
            Lately I've been focused on LLM engineering: retrieval-augmented
            generation, embeddings, prompt engineering, tool calling and
            agentic workflows. I enjoy building systems where an AI doesn't
            just answer — it does something, with the right guards in place.
          </p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {points.map(({ icon: Icon, title, text }) => (
              <li key={title} className="group flex items-start gap-4 py-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accentsoft/60 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-paper">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg font-medium text-ink">{title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

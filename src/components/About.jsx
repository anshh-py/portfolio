import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Database, GitBranch, Layers, Server, Workflow } from "lucide-react";

const points = [
  {
    icon: Layers,
    title: "Problem-first",
    text: "I understand the problem — users, data, constraints — before picking a model or stack.",
  },
  {
    icon: Workflow,
    title: "AI/ML & LLMs",
    text: "Applied machine learning, RAG, tool calling and agents integrated into products.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    text: "FastAPI services and REST endpoints that serve models reliably.",
  },
  {
    icon: Database,
    title: "Databases & state",
    text: "PostgreSQL, Supabase and Redis for persistence and conversation context.",
  },
  {
    icon: GitBranch,
    title: "Automation & deployment",
    text: "Shipping, verifying and iterating on live infrastructure.",
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
            title="I build AI applications that solve real problems."
            description="An AI Engineer focused on turning models and ideas into dependable, useful software."
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
            I build practical AI applications that solve actual problems. I
            start by understanding the problem — the users, the data, the
            constraints — before choosing a model or technology. That usually
            means pairing AI/ML and LLMs with solid engineering: backend
            services, databases, automation, and deployment.
          </p>
          <p className="text-lg leading-relaxed text-muted">
            Most of what I've learned has come from building, debugging,
            testing, and shipping complete systems. I care about the
            engineering around the model — the APIs, persistence, reliability,
            and how it actually runs for someone — not just the model itself.
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

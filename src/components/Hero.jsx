import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useTypewriter } from "../hooks/useTypewriter";
import { site } from "../data/site";

const roles = [
  "AI Engineer",
  "LLM Engineer",
  "RAG Builder",
  "Agentic AI Developer",
  "Machine Learning Engineer",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Abstract background treatment */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accentsoft/50 blur-3xl" />
        <div className="absolute bottom-0 left-[-8%] h-[22rem] w-[22rem] rounded-full bg-[#EEDFCB]/60 blur-3xl" />
        <span className="absolute right-[6%] top-24 font-serif text-[16rem] leading-none text-ink/[0.04] select-none sm:text-[24rem]">
          A
        </span>
        <span className="absolute bottom-[-6rem] left-[4%] font-serif text-[12rem] leading-none text-accent/[0.06] select-none">
          AA
        </span>
      </div>

      <div className="container-page relative flex min-h-screen flex-col justify-center pb-24 pt-32 lg:pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p variants={fadeUp} className="eyebrow mb-6">
            Hello, I&apos;m
          </motion.p>

          <motion.h1 variants={fadeUp} className="serif-display">
            Ansh Anand
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-2xl font-medium text-ink sm:text-3xl">
            <span aria-live="polite">{typed}</span>
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block w-[2px] self-stretch bg-accent h-[0.9em] align-baseline animate-caretBlink"
            />
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-prose text-lg leading-relaxed text-muted"
          >
            Building intelligent applications through machine learning, LLMs, and
            practical AI engineering.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              View Projects
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Download Resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Github, Layers } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { projects } from "../data/projects";

function ProjectCard({ project, index }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-paper/10 bg-darksoft p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-drift/40 hover:bg-[#221E1A] sm:p-9"
    >
      {/* Decorative corner accent */}
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-drift/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      />

      <div className="flex items-center justify-between">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-paper/5 text-drift">
          <Layers className="h-5 w-5" />
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} repository`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors hover:border-accent hover:text-accent"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>

      <h3 className="mt-6 font-serif text-2xl font-medium text-paper">
        {project.title}
      </h3>

      <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/65">
        {project.description}
      </p>

      <ul className="mt-5 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2.5 text-sm text-paper/70">
            <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-drift" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-paper/12 px-3 py-1 text-xs font-medium text-paper/70"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-4 border-t border-paper/10 pt-5">
        <button
          type="button"
          onClick={() => setDetailsOpen((v) => !v)}
          aria-expanded={detailsOpen}
          className="group/btn inline-flex w-full items-center justify-between text-sm font-medium text-paper transition-colors hover:text-accent focus-visible:text-accent"
        >
          <span>Explore engineering detail</span>
          <ChevronDown
            className={`h-4 w-4 text-paper/50 transition-transform duration-300 ${
              detailsOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {detailsOpen && (
          <dl className="space-y-4">
            {[
              { term: "Problem", body: project.problem },
              { term: "What it does", body: project.implementation },
              { term: "Key challenges", body: project.challenges },
            ].map(({ term, body }) => (
              <div key={term}>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-drift">
                  {term}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-paper/70">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="mt-7 flex items-center gap-3 border-t border-paper/10 pt-5">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-paper transition-colors hover:text-accent focus-visible:text-accent"
        >
          Repository
          <ArrowUpRight className="h-4 w-4" />
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-drift transition-colors hover:text-accent"
          >
            Live demo
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-dark py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          dark
          eyebrow="Featured Projects"
          title="Things I've built."
          description="A selection of applied-AI projects — from vehicle intelligence platforms to an RAG-powered reading companion."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

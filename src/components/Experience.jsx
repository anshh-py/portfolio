import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { experiences } from "../data/experience";

export default function Experience() {
  const exp = experiences[0];
  return (
    <section id="experience" className="border-t border-line py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Experience"
            title="Applied engineering for a real business."
            description="An AI Automation Developer digitizing a spare-parts business's operational workflows into one system."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl"
        >
          <article className="rounded-3xl border border-line bg-white/50 p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accentsoft/60 text-accent">
                <Briefcase className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-accentsoft/50 px-3 py-1 text-xs font-medium text-ink">
                {exp.status}
              </span>
            </div>

            <h3 className="mt-6 font-serif text-2xl font-medium leading-snug text-ink">
              {exp.title}
            </h3>

            <p className="mt-2 text-sm font-medium text-muted">
              {exp.role} — {exp.orgLabel}
            </p>

            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
              {exp.summary}
            </p>

            <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              What the platform digitalizes
            </h4>
            <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {exp.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              What it improves
            </h4>
            <ul className="mt-3 space-y-2.5">
              {exp.improves.map((i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              What I learned
            </h4>
            <ul className="mt-3 space-y-2.5">
              {exp.learning.map((l) => (
                <li key={l} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 border-t border-line pt-5 text-[0.85rem] leading-relaxed text-muted">
              {exp.note}
            </p>
          </article>
        </motion.div>
      </div>
    </section>
  );
}

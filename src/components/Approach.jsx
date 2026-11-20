import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { approachSteps } from "../data/skills";

export default function Approach() {
  return (
    <section id="approach" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Engineering Approach"
            title="How I build."
          />
          <p className="max-w-md text-lg leading-relaxed text-muted">
            The same disciplined loop applies whether it's a weekend prototype or
            a production system.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {approachSteps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="relative rounded-2xl border border-line bg-white/50 p-6"
            >
              <span className="font-serif text-4xl font-medium text-accentsoft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-lg font-medium text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

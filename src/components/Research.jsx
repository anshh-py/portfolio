import { motion } from "framer-motion";
import { FlaskConical } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Research() {
  return (
    <section id="research" className="border-t border-line py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader eyebrow="Research" title="Ongoing work." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl"
        >
          <div className="rounded-3xl border border-line bg-white/50 p-8 sm:p-10">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accentsoft/60 text-accent">
              <FlaskConical className="h-5 w-5" />
            </span>

            <h3 className="mt-6 font-serif text-2xl font-medium leading-snug text-ink">
              Cross-Truck Fuel-Rate Prediction and Explainable Agentic
              Driver-Feedback System for Heavy-Duty Vehicles
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-accentsoft/50 px-3 py-1 text-xs font-medium text-ink">
                Ongoing research
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                Predictive modelling
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                Explainable AI
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
                Agentic feedback
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">Problem</h4>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  Heavy-duty vehicle fuel consumption varies with vehicle
                  characteristics, operating conditions, driving behaviour, and
                  route conditions. A prediction alone does not necessarily help
                  a driver understand how to improve fuel efficiency.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">Research direction</h4>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-relaxed text-muted">
                  <li>• Investigate fuel-rate prediction across different heavy-duty vehicle types.</li>
                  <li>• Explore suitable data preparation and feature engineering strategies.</li>
                  <li>• Study predictive modelling approaches.</li>
                  <li>• Explore explainability techniques to communicate why predictions or recommendations are produced.</li>
                  <li>• Investigate an agentic feedback mechanism that turns model outputs into understandable driver guidance.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">Potential contribution</h4>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                  A framework combining predictive modelling, explainability, and
                  actionable driver feedback.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">What I'm learning</h4>
                <ul className="mt-2 space-y-1.5 text-[0.95rem] leading-relaxed text-muted">
                  <li>• Research problem formulation, dataset evaluation and data quality assessment.</li>
                  <li>• Cross-vehicle generalization and predictive model evaluation.</li>
                  <li>• Explainable AI, and translating model outputs into practical recommendations.</li>
                  <li>• Evaluating whether generated feedback is useful and trustworthy.</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
              This is ongoing research — a work in progress, not a completed or
              published system. I'm actively shaping the problem formulation, data
              strategy and evaluation approach, and I'll share concrete findings as
              the work matures.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

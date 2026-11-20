import { motion } from "framer-motion";
import { Bot, Braces, Cpu, Server } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { skillGroups } from "../data/skills";

const icons = {
  cpu: Cpu,
  bot: Bot,
  server: Server,
  braces: Braces,
};

export default function Skills() {
  return (
    <section id="skills" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeader
          eyebrow="Stack"
          title="Technical Arsenal"
          description="The tools and technologies I use to build intelligent systems."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.icon] || Cpu;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
                className="flex flex-col rounded-2xl border border-line bg-white/50 p-7 transition-colors hover:border-accent/40"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accentsoft/60 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-xl font-medium text-ink">
                    {group.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {group.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm text-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { site } from "../data/site";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ansh-a",
    href: site.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/anshh-py",
    href: site.github,
    icon: Github,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <div className="overflow-hidden rounded-[2.5rem] bg-dark px-6 py-16 text-center sm:px-12 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow text-drift">Contact</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl font-medium leading-tight tracking-tight text-paper sm:text-5xl">
              Let's build something intelligent together.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-paper/60">
              I'm open to conversations about AI engineering work, collaborations
              and interesting problems. Reach out through any channel below.
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              {channels.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-paper/15 px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-left">
                    <span className="block text-xs text-paper/50">{label}</span>
                    {value}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-paper/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "../data/site";

export default function Navbar({ gameMode = false, onToggleGameMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-paper/90 backdrop-blur border-b border-line"
          : "bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between lg:h-20">
        <a
          href="#top"
          className="font-serif text-xl font-semibold tracking-tight text-ink"
        >
          Ansh<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleGameMode}
            aria-pressed={gameMode}
            title={gameMode ? "Disable Game Mode" : "Enable Game Mode"}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors sm:px-4 sm:py-2 sm:text-xs ${
              gameMode
                ? "border-[#3ca55c]/40 bg-[#3ca55c]/10 text-[#2e7d43]"
                : "border-line text-muted hover:text-ink"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full transition-colors ${
                gameMode ? "bg-[#3ca55c]" : "bg-[#d6d3d1]"
              }`}
            />
            Game Mode: {gameMode ? "ON" : "OFF"}
          </button>

          <span
            aria-disabled="true"
            title="Resume coming soon"
            className="hidden cursor-not-allowed items-center gap-1.5 rounded-full bg-accentsoft px-5 py-2.5 text-sm font-medium text-muted lg:inline-flex"
          >
            Resume coming soon
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-accentsoft lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-page border-t border-line pb-6 pt-2">
          <ul className="divide-y divide-line">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-base font-medium text-ink"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </a>
              </li>
            ))}
          </ul>
          <span
            aria-disabled="true"
            title="Resume coming soon"
            className="mt-4 flex cursor-not-allowed items-center justify-center gap-1.5 rounded-full bg-accentsoft px-5 py-3 text-sm font-medium text-muted"
          >
            Resume coming soon
          </span>
        </div>
      </div>
    </header>
  );
}

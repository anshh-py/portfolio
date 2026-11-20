import { useEffect, useState } from "react";

/**
 * Types out an array of phrases, one character at a time,
 * pausing between phrases. Returns the current visible string.
 */
export function useTypewriter(phrases, { typeSpeed = 65, pause = 1400 } = {}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    let timeout;

    if (!deleting && sub === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && sub === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      timeout = setTimeout(
        () => setSub((s) => s + (deleting ? -1 : 1)),
        deleting ? typeSpeed / 2 : typeSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [sub, deleting, index, phrases, typeSpeed, pause]);

  return phrases[index % phrases.length].slice(0, sub);
}

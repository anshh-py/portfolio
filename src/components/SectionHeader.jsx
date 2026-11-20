export default function SectionHeader({ eyebrow, title, description, dark = false }) {
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${dark ? "text-drift" : ""}`}>{eyebrow}</p>
      <h2
        className={`mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-paper/60" : "text-muted"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

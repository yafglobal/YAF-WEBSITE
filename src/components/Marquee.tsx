"use client";

const words = [
  "KINGDOM GIANTS",
  "ENFIRED",
  "PURPOSE",
  "FAITH",
  "COMMUNITY",
  "GLOBAL",
  "YOUTH ALIVE",
  "EMPOWERED",
];

export default function Marquee() {
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="relative py-4 md:py-6 overflow-hidden bg-[var(--color-charcoal)] border-y border-[var(--color-border)]">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeatedWords.map((word, i) => (
          <span
            key={i}
            className="mx-4 md:mx-8 font-display text-base md:text-xl font-bold tracking-widest text-[var(--color-text-primary)]/10 uppercase"
          >
            {word}
            <span className="inline-block mx-4 md:mx-8 text-plum/30">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

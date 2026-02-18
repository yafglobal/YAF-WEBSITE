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
    <div className="relative py-6 overflow-hidden bg-charcoal border-y border-white/5">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeatedWords.map((word, i) => (
          <span
            key={i}
            className="mx-8 font-display text-lg md:text-xl font-bold tracking-widest text-white/10 uppercase"
          >
            {word}
            <span className="inline-block mx-8 text-fire/30">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

interface ProgressDotsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ProgressDots({ count, activeIndex, onSelect }: ProgressDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            activeIndex === i
              ? "w-8 bg-plum"
              : "w-1.5 bg-[var(--color-border-hover)] hover:bg-plum/40"
          }`}
          aria-label={`View offering ${i + 1}`}
        />
      ))}
    </div>
  );
}

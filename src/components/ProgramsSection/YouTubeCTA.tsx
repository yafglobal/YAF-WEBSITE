"use client";

import Image from "next/image";
import { YoutubeLogo } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

export default function YouTubeCTA() {
  return (
    <ScrollReveal delay={0.5}>
      <div className="mt-16 flex flex-col md:flex-row items-center gap-5 md:gap-8 p-5 md:p-10 rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)]">
        <Image
          src="/images/sermon-image.png"
          alt="Youth Alive Music"
          width={120}
          height={120}
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg"
        />
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)]">
            Listen & Be Inspired
          </h3>
          <p className="mt-1 text-[var(--color-text-secondary)] text-sm leading-relaxed">
            Access powerful sermons, worship sessions, and teachings that will ignite your faith and
            fuel your purpose.
          </p>
        </div>
        <a
          href="https://www.youtube.com/@youthaliveglobal?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-plum text-[var(--color-text-primary)] font-display font-semibold text-xs md:text-sm rounded-full hover:bg-plum-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(134,22,87,0.3)] group w-full md:w-auto justify-center"
        >
          <YoutubeLogo size={20} weight="fill" />
          Watch on YouTube
          <span className="inline-block transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </div>
    </ScrollReveal>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

export default function BrandColumn() {
  const [email, setEmail] = useState("");

  return (
    <div className="md:col-span-4">
      <ScrollReveal>
        <Image
          src="/images/logo.png"
          alt="Youth Alive Global"
          width={155}
          height={40}
          className="h-8 w-auto brightness-200"
          style={{ filter: "var(--logo-filter, brightness(2))" }}
        />
        <p className="mt-5 text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-sm">
          A global youth movement with a balanced commitment to spiritual growth, personal
          development, and purpose-driven living.
        </p>

        {/* Newsletter */}
        <div className="mt-8">
          <p className="font-display font-bold text-[var(--color-text-primary)] text-sm mb-3">
            Stay in the loop
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-fire/40 transition-colors text-sm"
            />
            <button className="px-4 py-3 bg-fire text-white rounded-xl hover:bg-fire-light transition-all duration-300 cursor-pointer">
              <PaperPlaneTilt size={18} weight="fill" />
            </button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

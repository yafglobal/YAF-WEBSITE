"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { UsersThree } from "@phosphor-icons/react";
import { BRANCHES } from "@/lib/branches-config";

const BRANCH_ACCENTS: Record<string, { src: string; size: number; rotate: string }> = {
  africa: { src: "/images/branch-accents/africa-continent.svg", size: 16, rotate: "rotate-0" },
  europe: { src: "/images/branch-accents/europe-star.svg", size: 16, rotate: "rotate-0" },
  usa: { src: "/images/branch-accents/usa-star.svg", size: 16, rotate: "rotate-0" },
  canada: { src: "/yaf-canada/mapleleaf.png", size: 18, rotate: "rotate-12" },
};

const BRANCH_COLORS = [
  { gradient: "from-amber-600/80 to-orange-800/80", accent: "group-hover:shadow-amber-500/30" },
  { gradient: "from-blue-600/80 to-indigo-800/80", accent: "group-hover:shadow-blue-500/30" },
  { gradient: "from-red-600/80 to-rose-800/80", accent: "group-hover:shadow-red-500/30" },
  { gradient: "from-emerald-600/80 to-teal-800/80", accent: "group-hover:shadow-emerald-500/30" },
];

export default function BranchesMegaDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.96 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl shadow-black/30 backdrop-blur-xl z-50"
    >
      {/* Branch cards — 2x2 grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-3">
        {BRANCHES.map((branch, i) => (
          <Link
            key={branch.slug}
            href={`/branches/${branch.slug}`}
            className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] transition-all duration-300 hover:border-plum/40 hover:shadow-[var(--shadow-plum-sm)]"
          >
            {/* Preview image */}
            <div className="relative h-24 overflow-hidden">
              <Image
                src={branch.menuImage}
                alt={branch.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="220px"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${BRANCH_COLORS[i].gradient} opacity-60`}
              />
              <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                <span className="text-white font-display font-bold text-sm drop-shadow-md">
                  {branch.name}
                </span>
                {BRANCH_ACCENTS[branch.slug] && (
                  <Image
                    src={BRANCH_ACCENTS[branch.slug].src}
                    alt=""
                    width={BRANCH_ACCENTS[branch.slug].size}
                    height={BRANCH_ACCENTS[branch.slug].size}
                    className={`drop-shadow-sm ${BRANCH_ACCENTS[branch.slug].rotate}`}
                    style={{
                      width: BRANCH_ACCENTS[branch.slug].size,
                      height: BRANCH_ACCENTS[branch.slug].size,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Details */}
            <div className="p-2.5">
              <p className="text-[11px] text-[var(--color-text-muted)] leading-snug line-clamp-2">
                {branch.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer link */}
      <div className="pt-2.5 border-t border-[var(--color-border)]">
        <Link
          href="/community"
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors"
        >
          <UsersThree size={14} weight="bold" className="text-plum" />
          <span className="text-xs font-bold text-[var(--color-text-primary)]">
            All Communities
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

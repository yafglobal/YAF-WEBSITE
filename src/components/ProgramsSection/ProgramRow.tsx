"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

interface ProgramRowProps {
  icon: Icon;
  title: string;
  description: string;
  accent: string;
  image: string;
  index: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ProgramRow({
  icon: IconComponent,
  title,
  description,
  accent,
  image,
  index,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: ProgramRowProps) {
  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] hover:border-fire/20 transition-all duration-500 cursor-pointer"
    >
      {/* Background image that reveals on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image src={image} alt={title} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-[var(--color-background)]/80 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center gap-4 md:gap-10 p-4 md:p-8">
        {/* Number */}
        <span className="hidden md:block font-display font-bold text-3xl text-[var(--color-border-hover)] group-hover:text-fire/30 transition-colors w-12">
          0{index + 1}
        </span>

        {/* Icon */}
        <div
          className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent size={24} className="text-[var(--color-text-primary)]" weight="fill" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-xl md:text-2xl text-[var(--color-text-primary)]">
            {title}
          </h3>
          <motion.p
            initial={false}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
              marginTop: isHovered ? 8 : 0,
            }}
            className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed max-w-2xl overflow-hidden"
          >
            {description}
          </motion.p>
        </div>

        {/* Arrow */}
        <ArrowRight
          size={24}
          className="shrink-0 text-[var(--color-text-muted)] group-hover:text-fire group-hover:translate-x-1 transition-all duration-300"
          weight="bold"
        />
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent} origin-left`}
      />
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

interface MenuItemData {
  link: string;
  text: string;
  image: string;
  tagline: string;
}

interface FlowingMenuMobileProps {
  items: MenuItemData[];
}

export default function FlowingMenuMobile({ items }: FlowingMenuMobileProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item, idx) => (
        <motion.div
          key={item.text}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={item.link}
            className="group relative block h-32 rounded-2xl overflow-hidden border border-[var(--color-border)] active:scale-[0.98] transition-transform"
          >
            {/* Background image */}
            <Image
              src={item.image}
              alt={item.text}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6">
              <h3 className="font-display font-bold text-2xl text-white uppercase tracking-wider">
                {item.text}
              </h3>
              <p className="text-white/70 text-sm mt-1 font-light">{item.tagline}</p>
            </div>

            {/* Arrow indicator */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--color-plum)]/90 flex items-center justify-center shadow-lg">
              <span className="text-white text-sm">&rarr;</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

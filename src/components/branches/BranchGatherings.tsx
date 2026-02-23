"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Clock, MapPin, Play } from "@phosphor-icons/react";
import type { BranchConfig } from "@/lib/branches-config";

interface Props {
  branch: BranchConfig;
}

export default function BranchGatherings({ branch }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [48, 24]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* 3D scroll-expanding card */}
        <motion.div
          style={{
            scale,
            rotateX,
            borderRadius,
            perspective: 1200,
          }}
          className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden"
        >
          {/* Background image */}
          <Image
            src={branch.images[2]?.src || branch.heroImage}
            alt={`Gatherings at Youth Alive ${branch.name}`}
            fill
            className="object-cover"
            style={
              branch.images[2]?.objectPosition
                ? { objectPosition: branch.images[2].objectPosition }
                : undefined
            }
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-plum-tint font-display text-xs tracking-[0.3em] uppercase font-semibold mb-4">
                Weekly Encounters
              </p>

              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-8">
                Join a gathering
                <br />
                <span className="text-plum-tint">near you</span>
              </h2>

              {/* Info pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl">
                  <Clock size={18} weight="fill" className="text-plum-tint" />
                  <span className="text-white text-sm font-medium">{branch.serviceTime}</span>
                </div>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
                >
                  <MapPin size={18} weight="fill" className="text-plum-tint" />
                  <span className="text-white text-sm font-medium">{branch.locationName}</span>
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={branch.watchHref}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-plum hover:bg-plum-light text-white font-display font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[var(--shadow-plum-md)]"
                >
                  <Play size={16} weight="fill" />
                  Watch Online
                </Link>
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white/50 text-white font-display font-semibold text-sm rounded-xl transition-all duration-300"
                >
                  Get Directions
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Address line below the card */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center text-[var(--color-text-secondary)] text-sm"
        >
          {branch.address}
        </motion.p>
      </div>
    </section>
  );
}

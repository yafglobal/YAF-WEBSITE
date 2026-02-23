"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Fire } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

const collageImages = [
  {
    src: "/usayaf/singer-haze-stage.webp",
    alt: "Singer in haze on stage",
    label: "Praise Night",
  },
  {
    src: "/usayaf/crowd-worship-phones-up.webp",
    alt: "Crowd worshipping with phones up",
    label: "The Atmosphere",
    objectPosition: "center 35%",
  },
  {
    src: "/usayaf/newimagesherousa/85128588.png",
    alt: "Young woman in fervent worship",
    label: "The Expression",
    objectPosition: "center 60%",
  },
  {
    src: "/usayaf/praise-night-singer-laughing.webp",
    alt: "Singer laughing during praise night",
    label: "Joy Overflowing",
    objectPosition: "center top",
  },
  {
    src: "/usayaf/woman-open-hands-worship.webp",
    alt: "Woman worshipping with open hands",
    label: "Surrender",
    objectPosition: "center 30%",
  },
  {
    src: "/usayaf/worship-singers-stage.webp",
    alt: "Worship singers on stage",
    label: "United Voices",
    objectPosition: "center 25%",
  },
];

export default function USAPraiseCollage() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-red-900/[0.04] to-transparent pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-red-500/[0.04] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-6">
                <Fire weight="fill" className="w-5 h-5 text-red-500" />
                <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-[10px]">
                  The Experience
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
                Praise
                <br />
                <span className="italic text-red-500">Night</span>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-md font-light leading-relaxed">
              Where a generation pours out in raw, unfiltered worship — from Bowie, MD to
              communities across the United States.
            </p>
          </ScrollReveal>
        </div>

        {/* Asymmetric masonry collage */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[280px] gap-3 md:gap-4">
          {collageImages.map((img, i) => {
            // Grid placement classes per item
            const gridClasses = [
              "row-span-2", // 0: Praise Night — tall left
              "md:col-span-2", // 1: Atmosphere — wide top right
              "", // 2: Expression — medium
              "", // 3: Joy Overflowing — medium
              "md:col-span-2", // 4: Surrender — wide bottom left
              "", // 5: United Voices — medium right
            ][i];

            return (
              <motion.div
                key={img.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`${gridClasses} group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl`}
              >
                <div className="relative h-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                    sizes={
                      i === 0
                        ? "(max-width: 768px) 50vw, 33vw"
                        : i === 1 || i === 4
                          ? "(max-width: 768px) 50vw, 66vw"
                          : "(max-width: 768px) 50vw, 33vw"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-300/80">
                      {img.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

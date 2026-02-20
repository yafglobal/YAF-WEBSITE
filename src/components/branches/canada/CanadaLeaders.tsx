"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Globe, InstagramLogo, X, YoutubeLogo } from "@phosphor-icons/react";

interface Leader {
  name: string;
  role: string;
  image: string;
  focus: string;
  bio: string;
}

const leaders: Leader[] = [
  {
    name: "Pastor David Oladosu",
    role: "National Pastor, Canada",
    image: "/yaf-canada/senior-pastor-closeup.webp",
    focus: "Missionary Strategy & Vision",
    bio: "Pastor David Oladosu serves as the National Pastor for the Mission to Canada, overseeing multiple Winners Chapel International churches while also functioning as a resident pastor and conference speaker. His ministry emphasizes strong Word-based teaching, multicultural outreach and church planting, helping to strengthen the denomination's footprint across Canadian cities.",
  },
  {
    name: "Pastor Steve Ogah",
    role: "Global Youth Pastor",
    image: "/yaf-canada/stage-speaker-portrait.webp",
    focus: "Global Youth Empowerment",
    bio: "Pastor Steve Ogah is the National Youth Pastor of Living Faith Church Worldwide and also Chief of Staff to Bishop David Oyedepo. A Covenant University pioneer graduate, he is known for mentoring young adults through teachings on purposeful living, vision, planning and the help of the Holy Spirit.",
  },
  {
    name: "Pastor Aanuoluwapo Akinyera",
    role: "National Youth Pastor, Canada",
    image: "/yaf-canada/youth-fellowship-speaker.webp",
    focus: "Spiritual Growth & Leadership",
    bio: "Pastor Aanuoluwapo Akinyera represents the emerging generation of Youth Alive leaders focused on discipling teenagers and young adults within the Canadian expression of the ministry. Focused on national coordination, he works to raise Christ-centered young people who are grounded in faith and influence society for God.",
  },
];

export default function CanadaLeaders() {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);

  useEffect(() => {
    if (selectedLeader !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedLeader]);

  return (
    <section className="relative py-24 md:py-36 overflow-x-clip overflow-y-visible">
      {/* Background Decorative Text */}
      <div className="absolute top-40 -left-20 opacity-[0.02] pointer-events-none select-none z-0">
        <span className="text-[30vw] font-display font-extrabold italic text-[var(--color-foreground)]">
          Vision
        </span>
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-plum/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-plum-tint/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-plum-tint font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block"
            >
              The Oversight
            </motion.span>
            <h2 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight">
              Led by <br />
              <span className="italic text-plum">The Spirit</span>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[var(--color-text-secondary)] max-w-sm text-lg font-light leading-relaxed"
          >
            Meet the visionary leaders committed to raising a generation of giants across Canada and
            beyond.
          </motion.p>
        </div>

        {/* Leader Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedLeader(i)}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-xl transition-all duration-700 group-hover:shadow-plum/20 group-hover:-translate-y-4">
                <Image
                  src={leader.image}
                  fill
                  alt={leader.name}
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <p className="text-plum-tint text-[10px] font-bold uppercase tracking-widest mb-2">
                    {leader.focus}
                  </p>
                  <div className="h-px w-full bg-plum/70 mb-4" />
                  <div className="flex items-center gap-2 text-white/80 text-[10px] font-bold uppercase tracking-widest">
                    <span>Read Bio</span>
                    <ArrowRight weight="bold" className="w-3 h-3" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-display font-bold italic text-[var(--color-text-primary)] group-hover:text-plum-tint transition-colors">
                  {leader.name}
                </h3>
                <p className="text-[11px] font-bold text-plum uppercase tracking-[0.2em]">
                  {leader.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bio Drawer */}
        <AnimatePresence>
          {selectedLeader !== null && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLeader(null)}
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] cursor-pointer"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-[201] bg-[var(--color-background)] rounded-t-[3rem] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 z-[210]">
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-[var(--color-text-muted)] hover:text-plum transition-colors bg-[var(--color-surface)]/80 backdrop-blur-md shadow-sm cursor-pointer"
                  >
                    <X weight="bold" className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Close</span>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain p-8 md:p-16 pt-16 md:pt-20">
                  <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
                      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                        <Image
                          src={leaders[selectedLeader].image}
                          fill
                          alt={leaders[selectedLeader].name}
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-6 md:space-y-8">
                        <div>
                          <span className="text-plum font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
                            Leadership Bio
                          </span>
                          <h3 className="text-4xl md:text-5xl font-display font-extrabold italic text-[var(--color-text-primary)] leading-none">
                            {leaders[selectedLeader].name}
                          </h3>
                          <p className="text-plum-tint font-bold uppercase tracking-[0.2em] text-xs mt-4">
                            {leaders[selectedLeader].role}
                          </p>
                        </div>

                        <div className="h-px w-20 bg-plum" />

                        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] font-light leading-relaxed">
                          {leaders[selectedLeader].bio}
                        </p>

                        <div className="pt-4 md:pt-8">
                          <button
                            onClick={() => setSelectedLeader(null)}
                            className="bg-plum hover:bg-plum-light text-white px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all cursor-pointer"
                          >
                            Return to Leaders
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Join the Movement */}
        <div className="mt-24 md:mt-32 flex flex-col items-center relative">
          {/* Background Fire text */}
          <div className="absolute -top-40 md:-top-52 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 flex justify-center whitespace-nowrap">
            <motion.span
              animate={{
                opacity: [0.1, 0.2, 0.15, 0.25, 0.12],
                scale: [1, 1.05, 1, 1.02, 1],
                filter: [
                  "blur(8px) brightness(1) drop-shadow(0 0 20px rgba(134,22,87,0.4))",
                  "blur(12px) brightness(1.3) drop-shadow(0 0 40px rgba(134,22,87,0.6))",
                  "blur(8px) brightness(1.1) drop-shadow(0 0 25px rgba(134,22,87,0.4))",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[30vw] md:text-[35vw] font-display font-extrabold italic leading-none text-transparent bg-clip-text bg-gradient-to-t from-plum via-plum-tint to-white/20"
            >
              Fire
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12 relative z-10"
          >
            <h4 className="text-2xl md:text-3xl font-display font-bold italic text-[var(--color-text-primary)] mb-3">
              Join the Movement
            </h4>
            <p className="text-[var(--color-text-secondary)] text-base md:text-lg font-light">
              Stay connected for daily inspiration and updates from our community.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6 relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://www.instagram.com/yafcanada/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 md:gap-6 px-6 md:px-8 py-4 md:py-5 rounded-2xl border border-[var(--color-border)] hover:bg-plum hover:border-plum transition-all duration-500 shadow-lg hover:shadow-plum/40"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500">
                  <InstagramLogo
                    weight="fill"
                    className="w-6 h-6 text-[var(--color-text-primary)] group-hover:text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)] group-hover:text-white/70">
                    Instagram
                  </span>
                  <span className="text-base md:text-lg font-display font-bold italic text-[var(--color-text-primary)] group-hover:text-white">
                    Follow @yafcanada
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/watch/north-america"
                className="group flex items-center gap-4 md:gap-6 px-6 md:px-8 py-4 md:py-5 rounded-2xl border border-[var(--color-border)] hover:bg-plum hover:border-plum transition-all duration-500 shadow-lg hover:shadow-plum/40"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500">
                  <YoutubeLogo
                    weight="fill"
                    className="w-6 h-6 text-[var(--color-text-primary)] group-hover:text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)] group-hover:text-white/70">
                    YouTube
                  </span>
                  <span className="text-base md:text-lg font-display font-bold italic text-[var(--color-text-primary)] group-hover:text-white">
                    Watch & Like
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="https://winnersyouth.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 md:gap-6 px-6 md:px-8 py-4 md:py-5 rounded-2xl border border-[var(--color-border)] hover:bg-plum-tint hover:border-plum-tint transition-all duration-500 shadow-lg hover:shadow-plum-tint/40"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-surface)] flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500">
                  <Globe
                    weight="bold"
                    className="w-6 h-6 text-[var(--color-text-primary)] group-hover:text-white"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)] group-hover:text-white/70">
                    Global Youth
                  </span>
                  <span className="text-base md:text-lg font-display font-bold italic text-[var(--color-text-primary)] group-hover:text-white">
                    Youth Alive Global
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

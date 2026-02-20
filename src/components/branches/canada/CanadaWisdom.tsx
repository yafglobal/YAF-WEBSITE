"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, BookOpen, DownloadSimple, ShareNetwork, Fire } from "@phosphor-icons/react";
import ScrollReveal from "@/components/ScrollReveal";

interface ScriptureTranslation {
  reference: string;
  kjv: string;
  nlt: string;
  lsg: string | null;
  bds: string | null;
}

interface WisdomEntry {
  day: number;
  date: string;
  imageUrl: string;
  scripture: string;
  scriptures: ScriptureTranslation[];
}

interface WisdomAPIResponse {
  latestDay: number;
  totalDays: number;
  wisdoms: WisdomEntry[];
}

const numberToWord = (num: number): string => {
  const words = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
    "Twenty",
    "Twenty-One",
    "Twenty-Two",
    "Twenty-Three",
    "Twenty-Four",
    "Twenty-Five",
    "Twenty-Six",
    "Twenty-Seven",
    "Twenty-Eight",
    "Twenty-Nine",
    "Thirty",
    "Thirty-One",
    "Thirty-Two",
    "Thirty-Three",
    "Thirty-Four",
    "Thirty-Five",
    "Thirty-Six",
    "Thirty-Seven",
    "Thirty-Eight",
    "Thirty-Nine",
    "Forty",
    "Forty-One",
    "Forty-Two",
    "Forty-Three",
    "Forty-Four",
    "Forty-Five",
    "Forty-Six",
    "Forty-Seven",
    "Forty-Eight",
    "Forty-Nine",
    "Fifty",
  ];
  return words[num - 1] || num.toString();
};

const prefetchImages = (urls: string[]) => {
  urls.forEach((url) => {
    const img = new window.Image();
    img.src = url;
  });
};

export default function CanadaWisdom() {
  const [wisdoms, setWisdoms] = useState<WisdomEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<WisdomEntry | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scriptureVersion, setScriptureVersion] = useState<"kjv" | "nlt" | "lsg" | "bds">("kjv");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWisdoms = async () => {
      try {
        const response = await fetch("https://winnerschapelcanada.ca/api/wisdom");
        if (response.ok) {
          const data: WisdomAPIResponse = await response.json();
          setWisdoms(data.wisdoms);
          setSelectedDay(data.wisdoms[0]);
          const imagesToPrefetch = data.wisdoms.slice(0, 4).map((w) => w.imageUrl);
          prefetchImages(imagesToPrefetch);
        }
      } catch (error) {
        console.error("Failed to fetch wisdom data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWisdoms();
  }, []);

  const sidebarDays = wisdoms.slice(0, 4);

  const handleDayClick = (wisdom: WisdomEntry) => {
    setImageLoaded(false);
    setSelectedDay(wisdom);
  };

  const handleDownload = async () => {
    if (!selectedDay) return;
    try {
      const response = await fetch(selectedDay.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `yaf-wisdom-day-${selectedDay.day}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleShare = async () => {
    if (!selectedDay) return;
    const shareData = {
      title: `Scriptural Wisdom - Day ${selectedDay.day}`,
      text: `Day ${selectedDay.day} - ${selectedDay.scripture}\n\nYouth Alive Fellowship Canada`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Share failed:", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="w-8 h-8 border-2 border-plum-tint border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (!selectedDay) return null;

  return (
    <section className="relative py-24 md:py-36 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-plum/[0.03] blur-3xl" />
      </div>

      {/* Decorative text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="text-[20vw] font-display font-extrabold text-[var(--color-foreground)]/[0.02] tracking-tighter whitespace-nowrap select-none">
          TRAJECTORY
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 mb-16 md:mb-20"
        >
          <div className="max-w-3xl">
            <span className="text-plum-tint text-sm tracking-[0.4em] uppercase mb-6 block font-bold flex items-center gap-3">
              <Fire weight="fill" className="w-5 h-5" />
              Daily Devotional
            </span>
            <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
              Scriptural <br />
              <span className="text-plum italic">Wisdom</span>
            </h2>
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-md lg:text-right font-light leading-relaxed">
            Daily words to ignite and strengthen your faith journey
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-plum-tint/40 via-plum/20 to-plum-tint/40 shadow-2xl shadow-plum/10">
              <div className="relative rounded-[22px] overflow-hidden bg-[var(--color-surface)]">
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-[var(--color-surface)] animate-pulse" />
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDay.day}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <Image
                      src={selectedDay.imageUrl}
                      alt={`Day ${selectedDay.day} - ${selectedDay.scripture}`}
                      width={800}
                      height={1000}
                      className={`w-full h-auto transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                      onLoad={() => setImageLoaded(true)}
                      priority
                    />

                    {/* Action buttons overlay (desktop) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-3">
                        <motion.button
                          onClick={handleDownload}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 bg-white/95 backdrop-blur-sm text-zinc-900 px-5 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-white transition-colors"
                        >
                          <DownloadSimple weight="bold" className="w-5 h-5" />
                          <span>Download</span>
                        </motion.button>
                        <motion.button
                          onClick={handleShare}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white/95 backdrop-blur-sm text-zinc-900 p-3 rounded-xl shadow-xl hover:bg-white transition-colors"
                        >
                          <ShareNetwork weight="bold" className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Day badge */}
                <div className="absolute top-4 right-4 bg-plum text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg hidden sm:flex items-center gap-2">
                  <Fire weight="fill" className="w-4 h-4" />
                  Day {selectedDay.day}
                </div>
              </div>
            </div>

            {/* Mobile day label */}
            <div className="sm:hidden flex justify-center mt-4">
              <span className="inline-flex items-center gap-2 bg-plum text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg">
                <Fire weight="fill" className="w-4 h-4" />
                Day {selectedDay.day}
              </span>
            </div>

            {/* Mobile action buttons */}
            <div className="sm:hidden flex justify-center gap-3 mt-4">
              <motion.button
                onClick={handleDownload}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] px-5 py-3 rounded-xl font-bold text-sm shadow-lg"
              >
                <DownloadSimple weight="bold" className="w-5 h-5" />
                Download
              </motion.button>
              <motion.button
                onClick={handleShare}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] p-3 rounded-xl shadow-lg"
              >
                <ShareNetwork weight="bold" className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Browse Days */}
            <div className="bg-[var(--color-surface)] backdrop-blur-sm rounded-2xl p-6 border border-[var(--color-border)] shadow-lg">
              <p className="text-plum-tint text-xs font-bold uppercase tracking-[0.3em] mb-5">
                Browse Days
              </p>

              <div className="space-y-2">
                {sidebarDays.map((wisdom) => {
                  const isSelected = selectedDay.day === wisdom.day;
                  return (
                    <button
                      key={wisdom.date}
                      onClick={() => handleDayClick(wisdom)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group text-left cursor-pointer ${
                        isSelected
                          ? "bg-plum/10 ring-2 ring-plum"
                          : "hover:bg-[var(--color-surface-hover)] hover:ring-1 hover:ring-[var(--color-border)]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`w-10 h-10 flex items-center justify-center font-bold rounded-xl text-sm ${
                            isSelected ? "bg-plum text-white" : "bg-plum-tint/20 text-plum-tint"
                          }`}
                        >
                          {wisdom.day}
                        </span>
                        <span
                          className={`font-bold transition-colors ${
                            isSelected
                              ? "text-[var(--color-text-primary)]"
                              : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]"
                          }`}
                        >
                          Day {numberToWord(wisdom.day)}
                        </span>
                      </div>
                      {isSelected ? (
                        <Fire weight="fill" className="w-5 h-5 text-plum" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-plum-tint transition-colors" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Archive Link */}
            <motion.a
              href="https://winnerschapelcanada.ca/wisdom"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block bg-gradient-to-r from-plum to-plum/80 hover:from-plum hover:to-plum text-white rounded-xl p-4 text-center font-bold uppercase text-xs tracking-widest transition-all cursor-pointer shadow-lg shadow-plum/20"
            >
              <span className="flex items-center justify-center gap-3">
                View Full Archive
                <ArrowRight weight="bold" className="w-4 h-4" />
              </span>
            </motion.a>

            {/* Scripture Panel */}
            <div className="bg-[var(--color-surface)] backdrop-blur-sm rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-lg">
              {/* Panel Header */}
              <div className="px-4 py-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-plum-tint/20 rounded-xl flex items-center justify-center">
                    <BookOpen weight="fill" className="w-5 h-5 text-plum-tint" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[var(--color-text-primary)] text-sm">
                      Scripture Reading
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">
                      {selectedDay.scripture}
                    </p>
                  </div>
                </div>

                {/* Version Toggle */}
                <div className="space-y-3">
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.2em] font-bold">
                    English
                  </p>
                  <div className="flex bg-[var(--color-background)] rounded-lg p-1">
                    {(["kjv", "nlt"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setScriptureVersion(v)}
                        className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          scriptureVersion === v
                            ? "bg-plum-tint text-black"
                            : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                        }`}
                      >
                        {v.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.2em] font-bold">
                    Francais
                  </p>
                  <div className="flex bg-[var(--color-background)] rounded-lg p-1">
                    {(["lsg", "bds"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setScriptureVersion(v)}
                        className={`flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          scriptureVersion === v
                            ? "bg-plum-tint text-black"
                            : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                        }`}
                      >
                        {v.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scripture Content */}
              <div className="p-4 max-h-64 overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedDay.day}-${scriptureVersion}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {selectedDay.scriptures.map((scripture, index) => {
                      const getText = () => {
                        switch (scriptureVersion) {
                          case "kjv":
                            return scripture.kjv;
                          case "nlt":
                            return scripture.nlt;
                          case "lsg":
                            return scripture.lsg;
                          case "bds":
                            return scripture.bds;
                          default:
                            return scripture.kjv;
                        }
                      };
                      const text = getText();
                      const isFrench = scriptureVersion === "lsg" || scriptureVersion === "bds";
                      const noTranslation = isFrench && !text;

                      return (
                        <div key={index} className="space-y-2">
                          <p className="text-xs font-bold text-plum-tint uppercase tracking-wide">
                            {scripture.reference}
                          </p>
                          {noTranslation ? (
                            <p className="text-[var(--color-text-muted)] italic text-sm">
                              Translation not available for this day.
                            </p>
                          ) : (
                            <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm font-light">
                              {text}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

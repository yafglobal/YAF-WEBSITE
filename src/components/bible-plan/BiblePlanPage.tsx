"use client";

import { useState, useCallback, useRef, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { getCurrentWeek, type DayOfWeek } from "@/lib/bible-plan-utils";
import PlanHero from "./PlanHero";
import WeekTimeline from "./WeekTimeline";
import DayGrid from "./DayGrid";

const Grainient = dynamic(() => import("@/components/contact/Grainient"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#1a0a2e]" />,
});

function subscribeToDarkMode(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}
function getIsDark() {
  return !document.documentElement.classList.contains("light");
}
function getIsDarkServer() {
  return true;
}

export default function BiblePlanPage() {
  const [selectedWeek, setSelectedWeek] = useState(() => getCurrentWeek());
  const [expandedDay, setExpandedDay] = useState<DayOfWeek | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isDark = useSyncExternalStore(subscribeToDarkMode, getIsDark, getIsDarkServer);

  const handleSelectWeek = useCallback((week: number) => {
    setSelectedWeek(week);
    setExpandedDay(null);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      {/* Grainient shader — fixed full-page background */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Grainient
          color1={isDark ? "#862256" : "#E8B4D0"}
          color2={isDark ? "#FF4D00" : "#FF9F6B"}
          color3={isDark ? "#2a0845" : "#F5E6D8"}
          timeSpeed={0.15}
          warpStrength={0.8}
          warpFrequency={4.0}
          warpSpeed={1.5}
          warpAmplitude={60}
          rotationAmount={400}
          noiseScale={2.5}
          grainAmount={isDark ? 0.08 : 0.05}
          contrast={isDark ? 1.4 : 1.1}
          saturation={isDark ? 1.1 : 0.9}
          zoom={0.85}
          className="w-full h-full"
        />
        <div className={`absolute inset-0 ${isDark ? "bg-black/40" : "bg-white/30"}`} />
      </div>

      <div className="relative z-10">
        <PlanHero />
        <WeekTimeline selectedWeek={selectedWeek} onSelectWeek={handleSelectWeek} />
        <div ref={gridRef}>
          <DayGrid
            selectedWeek={selectedWeek}
            expandedDay={expandedDay}
            onExpandDay={setExpandedDay}
          />
        </div>
      </div>
    </div>
  );
}

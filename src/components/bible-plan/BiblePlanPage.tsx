"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { getCurrentWeek, type DayOfWeek } from "@/lib/bible-plan-utils";
import PlanHero from "./PlanHero";
import WeekTimeline from "./WeekTimeline";
import DayGrid from "./DayGrid";

const Grainient = dynamic(() => import("@/components/contact/Grainient"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#1a0a2e]" />,
});

export default function BiblePlanPage() {
  const [selectedWeek, setSelectedWeek] = useState(() => getCurrentWeek());
  const [expandedDay, setExpandedDay] = useState<DayOfWeek | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleSelectWeek = useCallback((week: number) => {
    setSelectedWeek(week);
    setExpandedDay(null);
    // Smooth scroll to the day grid when switching weeks
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      {/* Grainient shader — fixed full-page background */}
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Grainient
          color1="#862256"
          color2="#FF4D00"
          color3="#2a0845"
          timeSpeed={0.15}
          warpStrength={0.8}
          warpFrequency={4.0}
          warpSpeed={1.5}
          warpAmplitude={60}
          rotationAmount={400}
          noiseScale={2.5}
          grainAmount={0.08}
          contrast={1.4}
          saturation={1.1}
          zoom={0.85}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40" />
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

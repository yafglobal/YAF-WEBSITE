"use client";

import { useState, useCallback, useRef } from "react";
import { getCurrentWeek, type DayOfWeek } from "@/lib/bible-plan-utils";
import PlanHero from "./PlanHero";
import WeekTimeline from "./WeekTimeline";
import DayGrid from "./DayGrid";

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
  );
}

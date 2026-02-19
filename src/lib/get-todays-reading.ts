import { bibleReadingPlan, type DayOfWeek, type DailyReading } from "@/data/bible-reading-plan";

export interface TodaysReading {
  week: number;
  day: DayOfWeek;
  dayLabel: string;
  passages: string[];
  dateFormatted: string;
  isBeforePlanStart: boolean;
  isAfterPlanEnd: boolean;
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

const DAY_INDEX_TO_NAME: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const PLAN_START = new Date("2026-01-01T00:00:00");
const PLAN_END = new Date("2026-12-31T23:59:59");

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(2026, 0, 1);
  const diffTime = date.getTime() - startOfYear.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays < 3) return 1;
  const weeksAfterFirst = Math.floor((diffDays - 3) / 7);
  return 2 + weeksAfterFirst;
}

export function getTodaysReading(): TodaysReading {
  // Use the user's local date/time (no timezone conversion)
  const now = new Date();
  const dayOfWeek = now.getDay();
  const day = DAY_INDEX_TO_NAME[dayOfWeek];

  const dateFormatted = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (now < PLAN_START) {
    return {
      week: 0,
      day,
      dayLabel: DAY_LABELS[day],
      passages: [],
      dateFormatted,
      isBeforePlanStart: true,
      isAfterPlanEnd: false,
    };
  }

  if (now > PLAN_END) {
    return {
      week: 53,
      day,
      dayLabel: DAY_LABELS[day],
      passages: [],
      dateFormatted,
      isBeforePlanStart: false,
      isAfterPlanEnd: true,
    };
  }

  const weekNumber = getWeekNumber(now);
  const weekData = bibleReadingPlan.find((w) => w.week === weekNumber);
  const todaysReading = weekData?.readings.find((r) => r.day === day);

  return {
    week: weekNumber,
    day,
    dayLabel: DAY_LABELS[day],
    passages: todaysReading?.passages || [],
    dateFormatted,
    isBeforePlanStart: false,
    isAfterPlanEnd: false,
  };
}

export function getReadingForDay(week: number, day: DayOfWeek): DailyReading | null {
  const weekData = bibleReadingPlan.find((w) => w.week === week);
  if (!weekData) return null;
  return weekData.readings.find((r) => r.day === day) || null;
}

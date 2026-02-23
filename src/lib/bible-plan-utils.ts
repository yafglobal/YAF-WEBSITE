import { bibleReadingPlan, type DayOfWeek, type DailyReading } from "@/data/bible-reading-plan";

export type { DayOfWeek, DailyReading };
export { bibleReadingPlan };

export const DAY_ORDER: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const DAY_SHORT: Record<DayOfWeek, string> = {
  sunday: "Sun",
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
};

export const DAY_FULL: Record<DayOfWeek, string> = {
  sunday: "Sunday",
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
};

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Get the calendar date for a specific day in a specific week of the plan.
 * Week 1 starts Thu Jan 1 2026; Week 2+ starts on Sunday.
 */
export function getDateForReading(week: number, day: DayOfWeek): Date {
  const dayIdx = DAY_ORDER.indexOf(day);
  if (week === 1) {
    // Week 1: Thu=Jan 1, Fri=Jan 2, Sat=Jan 3
    return new Date(2026, 0, 1 + (dayIdx - 4));
  }
  // Week 2+: Sunday of week N = Jan 4 + (N-2)*7
  return new Date(2026, 0, 4 + (week - 2) * 7 + dayIdx);
}

/** Format: "Feb 19" */
export function formatDateShort(date: Date): string {
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}`;
}

/** Format: "February 19" */
export function formatDateMedium(date: Date): string {
  return `${MONTHS_LONG[date.getMonth()]} ${date.getDate()}`;
}

/** Current plan week number (1–53) based on user's local date */
export function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(2026, 0, 1);
  if (now < start) return 1;
  if (now > new Date(2026, 11, 31)) return 53;
  const days = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return days < 3 ? 1 : Math.min(53, 2 + Math.floor((days - 3) / 7));
}

/** Whether a specific reading day is today */
export function isToday(week: number, day: DayOfWeek): boolean {
  const d = getDateForReading(week, day);
  const n = new Date();
  return (
    d.getDate() === n.getDate() &&
    d.getMonth() === n.getMonth() &&
    d.getFullYear() === n.getFullYear()
  );
}

/** Whether a reading day is in the past */
export function isPast(week: number, day: DayOfWeek): boolean {
  const d = getDateForReading(week, day);
  const n = new Date();
  n.setHours(0, 0, 0, 0);
  return d < n;
}

/** Date range label for a week, e.g. "Jan 4 – Jan 10" */
export function getWeekRange(week: number): string {
  const w = bibleReadingPlan.find((x) => x.week === week);
  if (!w?.readings.length) return "";
  const first = getDateForReading(week, w.readings[0].day);
  const last = getDateForReading(week, w.readings[w.readings.length - 1].day);
  return `${formatDateShort(first)} – ${formatDateShort(last)}`;
}

/** Overall reading plan progress (0–100) */
export function getPlanProgress(): number {
  const now = new Date();
  const s = new Date(2026, 0, 1);
  const e = new Date(2026, 11, 31);
  if (now < s) return 0;
  if (now > e) return 100;
  return Math.round(((now.getTime() - s.getTime()) / (e.getTime() - s.getTime())) * 100);
}

/** Get a specific week's data from the plan */
export function getWeekData(week: number) {
  return bibleReadingPlan.find((w) => w.week === week);
}

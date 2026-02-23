import { ReactNode } from "react";

type ColorVariant = "plum" | "emerald" | "amber" | "sky" | "rose" | "gray";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: { value: number; positive: boolean };
  color?: ColorVariant;
}

const colorMap: Record<ColorVariant, { bg: string; text: string }> = {
  plum: { bg: "bg-[#861657]/10", text: "text-[#861657]" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  sky: { bg: "bg-sky-50", text: "text-sky-600" },
  rose: { bg: "bg-rose-50", text: "text-rose-600" },
  gray: { bg: "bg-gray-100", text: "text-gray-600" },
};

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  color = "plum",
}: StatsCardProps) {
  const c = colorMap[color];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
          {trend && (
            <p
              className={`text-xs mt-1 font-medium ${
                trend.positive ? "text-emerald-600" : "text-rose-500"
              }`}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% vs last month
            </p>
          )}
        </div>
        <div className={`${c.bg} ${c.text} p-3 rounded-lg shrink-0`}>{icon}</div>
      </div>
    </div>
  );
}

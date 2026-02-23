"use client";

import { useState, useMemo } from "react";
import {
  SignIn,
  SignOut,
  UserSwitch,
  Prohibit,
  Trash,
  HandsPraying,
  Article,
  CheckCircle,
  Flame,
  Bell,
  VideoCamera,
  Tag,
  MagnifyingGlass,
  FunnelSimple,
  ClockCounterClockwise,
  UserCirclePlus,
} from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  mockActivity,
  type ActivityEvent,
  type ActivityEventType,
} from "@/components/admin/mockData";

// ── Event metadata ────────────────────────────────────────────────────────────
const eventConfig: Record<
  ActivityEventType,
  { icon: React.ElementType; color: string; bg: string; label: string; category: string }
> = {
  login: { icon: SignIn, color: "text-sky-600", bg: "bg-sky-100", label: "Auth", category: "auth" },
  logout: {
    icon: SignOut,
    color: "text-gray-500",
    bg: "bg-gray-100",
    label: "Auth",
    category: "auth",
  },
  role_change: {
    icon: UserSwitch,
    color: "text-[#861657]",
    bg: "bg-[#861657]/10",
    label: "Account",
    category: "account",
  },
  ban: {
    icon: Prohibit,
    color: "text-amber-600",
    bg: "bg-amber-100",
    label: "Account",
    category: "account",
  },
  unban: {
    icon: UserCirclePlus,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    label: "Account",
    category: "account",
  },
  account_delete: {
    icon: Trash,
    color: "text-red-500",
    bg: "bg-red-100",
    label: "Account",
    category: "account",
  },
  prayer_responded: {
    icon: HandsPraying,
    color: "text-violet-600",
    bg: "bg-violet-100",
    label: "Content",
    category: "content",
  },
  post_removed: {
    icon: Article,
    color: "text-red-500",
    bg: "bg-red-100",
    label: "Content",
    category: "content",
  },
  post_approved: {
    icon: CheckCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    label: "Content",
    category: "content",
  },
  report_resolved: {
    icon: CheckCircle,
    color: "text-teal-600",
    bg: "bg-teal-100",
    label: "Content",
    category: "content",
  },
  registration: {
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-100",
    label: "Registration",
    category: "registration",
  },
  notification_sent: {
    icon: Bell,
    color: "text-blue-600",
    bg: "bg-blue-100",
    label: "System",
    category: "content",
  },
  content_uploaded: {
    icon: VideoCamera,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
    label: "Content",
    category: "content",
  },
  category_added: {
    icon: Tag,
    color: "text-purple-600",
    bg: "bg-purple-100",
    label: "Content",
    category: "content",
  },
};

const FILTERS = [
  { id: "all", label: "All Events" },
  { id: "auth", label: "Auth" },
  { id: "account", label: "Account Actions" },
  { id: "content", label: "Content" },
  { id: "registration", label: "Registrations" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function formatDateLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date("2026-02-23");
  const yesterday = new Date("2026-02-22");
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function groupByDate(events: ActivityEvent[]): [string, ActivityEvent[]][] {
  const map = new Map<string, ActivityEvent[]>();
  for (const e of events) {
    const key = e.timestamp.slice(0, 10);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return Array.from(map.entries());
}

// ── Event row ────────────────────────────────────────────────────────────────
function EventRow({ event }: { event: ActivityEvent }) {
  const cfg = eventConfig[event.type];
  const Icon = cfg.icon;
  const isSystem = event.actor === "System";

  return (
    <div className="flex gap-4 group">
      {/* Icon */}
      <div
        className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg} transition-transform group-hover:scale-105`}
      >
        <Icon size={17} weight="fill" className={cfg.color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-gray-900 leading-snug">
              <span className="font-semibold">{event.actor}</span>
              {" · "}
              <span className="text-gray-600">{event.description}</span>
            </p>
            {event.target && (
              <p className="text-xs text-gray-400 mt-0.5">
                Target: <span className="font-medium text-gray-600">{event.target}</span>
              </p>
            )}
            {event.meta && <p className="text-xs text-gray-400 mt-0.5 italic">{event.meta}</p>}
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {formatTime(event.timestamp)}
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                isSystem ? "bg-gray-100 text-gray-500" : "bg-[#861657]/8 text-[#861657]"
              }`}
            >
              {isSystem ? "System" : "Admin"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ActivityPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return mockActivity.filter((e) => {
      const matchFilter = filter === "all" || eventConfig[e.type].category === filter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        e.actor.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        (e.target ?? "").toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  // Stats (from full dataset, not filtered)
  const todayEvents = mockActivity.filter((e) => e.timestamp.startsWith("2026-02-23"));
  const todayLogins = todayEvents.filter((e) => e.type === "login").length;
  const todayActions = todayEvents.filter((e) =>
    ["ban", "account_delete", "role_change", "unban", "post_removed"].includes(e.type)
  ).length;
  const uniqueAdmins = new Set(mockActivity.filter((e) => e.actor !== "System").map((e) => e.actor))
    .size;

  return (
    <main className="flex-1">
      <AdminHeader
        title="Activity Timeline"
        description="All admin actions, logins, and system events"
      />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              label: "Events Today",
              value: todayEvents.length,
              color: "text-[#861657]",
              bg: "bg-[#861657]/8",
            },
            { label: "Logins Today", value: todayLogins, color: "text-sky-600", bg: "bg-sky-50" },
            {
              label: "Admin Actions",
              value: todayActions,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              label: "Active Admins",
              value: uniqueAdmins,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MagnifyingGlass
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by admin, action, or target…"
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20 bg-white text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            <FunnelSimple size={14} className="text-gray-400 shrink-0" />
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === f.id
                    ? "bg-[#861657] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400">
          {filtered.length} event{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Timeline */}
        {grouped.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ClockCounterClockwise size={40} className="text-gray-200 mb-3" />
            <p className="text-gray-500 font-medium">No events found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([dateKey, events]) => (
              <div key={dateKey}>
                {/* Date header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1 bg-gray-100 rounded-full">
                    {formatDateLabel(events[0].timestamp)}
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Events for this date */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                  {events.map((event) => (
                    <div key={event.id} className="px-5 py-4 hover:bg-gray-50/70 transition-colors">
                      <EventRow event={event} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

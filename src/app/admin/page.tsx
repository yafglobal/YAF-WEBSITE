"use client";

import Link from "next/link";
import {
  Users,
  HandsPraying,
  ListBullets,
  Star,
  Video,
  BookOpen,
  ShareNetwork,
  Bell,
  ChatCircle,
  ArrowRight,
  ChartBar,
} from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";

const stats = [
  {
    title: "Total Members",
    value: "2,847",
    icon: <Users size={22} weight="fill" />,
    color: "plum" as const,
    trend: { value: 12, positive: true },
    description: "Registered users",
  },
  {
    title: "Prayer Requests",
    value: "127",
    icon: <HandsPraying size={22} weight="fill" />,
    color: "sky" as const,
    trend: { value: 8, positive: true },
    description: "Total submitted",
  },
  {
    title: "Pending Prayers",
    value: "43",
    icon: <HandsPraying size={22} weight="fill" />,
    color: "amber" as const,
    description: "Awaiting response",
  },
  {
    title: "SOD Waitlist",
    value: "89",
    icon: <ListBullets size={22} weight="fill" />,
    color: "emerald" as const,
    trend: { value: 5, positive: true },
    description: "School of Destiny",
  },
  {
    title: "AYAC 2026 Regs",
    value: "312",
    icon: <Star size={22} weight="fill" />,
    color: "rose" as const,
    trend: { value: 23, positive: true },
    description: "Registrations",
  },
];

const quickActions = [
  {
    label: "Manage Users",
    href: "/admin/users",
    icon: Users,
    color: "bg-[#861657]/10 text-[#861657]",
  },
  {
    label: "Community Posts",
    href: "/admin/community/posts",
    icon: ChatCircle,
    color: "bg-sky-50 text-sky-600",
  },
  {
    label: "Prayer Requests",
    href: "/admin/prayers",
    icon: HandsPraying,
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Send Notification",
    href: "/admin/notifications",
    icon: Bell,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "SOD Waitlist",
    href: "/admin/waitlist",
    icon: ListBullets,
    color: "bg-rose-50 text-rose-600",
  },
  {
    label: "AYAC 2026",
    href: "/admin/ayac-waitlist",
    icon: Star,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Word of the Week",
    href: "/admin/word-of-the-week",
    icon: Video,
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Wisdom of the Day",
    href: "/admin/wisdom-of-the-day",
    icon: BookOpen,
    color: "bg-teal-50 text-teal-600",
  },
  {
    label: "Social Links",
    href: "/admin/social-links",
    icon: ShareNetwork,
    color: "bg-orange-50 text-orange-600",
  },
  { label: "Analytics", href: "/admin", icon: ChartBar, color: "bg-gray-100 text-gray-500" },
];

export default function AdminDashboard() {
  return (
    <main className="flex-1">
      <AdminHeader
        title="Dashboard"
        description="Welcome back, Praise. Here's what's happening today."
      />

      <div className="p-4 sm:p-6 space-y-8">
        {/* Stats */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {stats.map((s) => (
              <StatsCard key={s.title} {...s} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {quickActions.map(({ label, href, icon: Icon, color }) => (
              <Link
                key={label}
                href={href}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all flex flex-col gap-3"
              >
                <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
                  <Icon size={20} weight="fill" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 leading-tight">{label}</span>
                  <ArrowRight
                    size={14}
                    className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent activity placeholder */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Recent Activity
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
            {[
              {
                text: "New prayer request submitted by Grace Williams",
                time: "2 minutes ago",
                dot: "bg-sky-400",
              },
              {
                text: "David Osei joined the SOD Leadership track waitlist",
                time: "14 minutes ago",
                dot: "bg-emerald-400",
              },
              {
                text: "Post flagged in community for review",
                time: "32 minutes ago",
                dot: "bg-amber-400",
              },
              {
                text: "AYAC registration from James Okafor (External)",
                time: "1 hour ago",
                dot: "bg-indigo-400",
              },
              {
                text: 'Notification "ENFIRED Reminder" sent to 2,834 users',
                time: "3 hours ago",
                dot: "bg-[#861657]",
              },
            ].map(({ text, time, dot }) => (
              <div key={text} className="flex items-start gap-3 px-5 py-4">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

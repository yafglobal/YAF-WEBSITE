"use client";

import Link from "next/link";
import {
  ChatCircle,
  ArrowRight,
  Shield,
  Tag,
  Flag,
  Warning,
  Gear,
  ToggleRight,
} from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { mockPosts } from "@/components/admin/mockData";

const stats = [
  {
    title: "Total Posts",
    value: "1,247",
    icon: <ChatCircle size={22} weight="fill" />,
    color: "plum" as const,
  },
  {
    title: "Pending Review",
    value: "23",
    icon: <Warning size={22} weight="fill" />,
    color: "amber" as const,
  },
  {
    title: "Flagged Content",
    value: "8",
    icon: <Flag size={22} weight="fill" />,
    color: "rose" as const,
  },
  { title: "Categories", value: "7", icon: <Tag size={22} weight="fill" />, color: "sky" as const },
];

const sections = [
  {
    label: "All Posts",
    desc: "Browse and manage all community posts",
    href: "/admin/community/posts",
    icon: ChatCircle,
    color: "bg-[#861657]/10 text-[#861657]",
  },
  {
    label: "Moderation Queue",
    desc: "Review pending and flagged content",
    href: "/admin/community/moderation",
    icon: Shield,
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Categories",
    desc: "Manage discussion categories and topics",
    href: "/admin/community/categories",
    icon: Tag,
    color: "bg-sky-50 text-sky-600",
  },
  {
    label: "Content Reports",
    desc: "Review user-reported posts",
    href: "/admin/community/reports",
    icon: Flag,
    color: "bg-rose-50 text-rose-600",
  },
  {
    label: "Trust Management",
    desc: "Manage user trust levels and bans",
    href: "/admin/community/users",
    icon: ToggleRight,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Settings",
    desc: "Configure moderation rules and AI thresholds",
    href: "/admin/community/settings",
    icon: Gear,
    color: "bg-gray-100 text-gray-500",
  },
];

const pending = mockPosts.filter((p) => p.status === "Pending");

export default function CommunityPage() {
  return (
    <main className="flex-1">
      <AdminHeader
        title="Community"
        description="Manage posts, moderation, and community settings"
      />

      <div className="p-4 sm:p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatsCard key={s.title} {...s} />
          ))}
        </div>

        {/* Sections grid */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map(({ label, desc, href, icon: Icon, color }) => (
              <Link
                key={label}
                href={href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}
                >
                  <Icon size={20} weight="fill" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{label}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-gray-300 group-hover:text-gray-500 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Pending posts preview */}
        {pending.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Pending Review
              </h2>
              <Link
                href="/admin/community/moderation"
                className="text-xs text-[#861657] hover:underline font-medium"
              >
                View all
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100">
              {pending.map((post) => (
                <div key={post.id} className="px-5 py-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold shrink-0">
                    {post.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{post.author.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{post.content}</p>
                  </div>
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full shrink-0">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

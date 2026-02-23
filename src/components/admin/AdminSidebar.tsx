"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  House,
  Users,
  ChatCircle,
  HandsPraying,
  Bell,
  ListBullets,
  Star,
  Video,
  BookOpen,
  ShareNetwork,
  CaretDown,
  CaretRight,
  X,
  SignOut,
  Flame,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { useAdmin } from "./AdminContext";

const topNav = [
  { label: "Dashboard", href: "/admin", icon: House },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Activity", href: "/admin/activity", icon: ClockCounterClockwise },
  { label: "Prayer Requests", href: "/admin/prayers", icon: HandsPraying },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "SOD Waitlist", href: "/admin/waitlist", icon: ListBullets },
  { label: "AYAC 2026", href: "/admin/ayac-waitlist", icon: Star },
  { label: "Word of the Week", href: "/admin/word-of-the-week", icon: Video },
  { label: "Wisdom of Day", href: "/admin/wisdom-of-the-day", icon: BookOpen },
  { label: "Social Links", href: "/admin/social-links", icon: ShareNetwork },
];

const communitySubNav = [
  { label: "Overview", href: "/admin/community" },
  { label: "All Posts", href: "/admin/community/posts" },
  { label: "Moderation", href: "/admin/community/moderation" },
  { label: "Categories", href: "/admin/community/categories" },
  { label: "Reports", href: "/admin/community/reports" },
  { label: "Trust Management", href: "/admin/community/users" },
  { label: "Settings", href: "/admin/community/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAdmin();
  const [communityOpen, setCommunityOpen] = useState(pathname.startsWith("/admin/community"));

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? "bg-[#861657] text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  const close = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={close} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#861657] flex items-center justify-center">
              <Flame size={18} weight="fill" className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">YAG Admin</span>
          </div>
          <button
            onClick={close}
            className="lg:hidden p-1 rounded text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {/* Items before community */}
          {topNav.slice(0, 2).map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} onClick={close} className={linkClass(isActive(href))}>
              <Icon size={18} weight={isActive(href) ? "fill" : "regular"} />
              {label}
            </Link>
          ))}

          {/* Community accordion */}
          <div>
            <button
              onClick={() => setCommunityOpen((o) => !o)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith("/admin/community")
                  ? "bg-[#861657]/10 text-[#861657]"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <ChatCircle
                size={18}
                weight={pathname.startsWith("/admin/community") ? "fill" : "regular"}
              />
              <span className="flex-1 text-left">Community</span>
              {communityOpen ? <CaretDown size={14} /> : <CaretRight size={14} />}
            </button>

            {communityOpen && (
              <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-3">
                {communitySubNav.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={close}
                    className={`block px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                      pathname === href
                        ? "text-[#861657] bg-[#861657]/5"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Rest of nav */}
          {topNav.slice(2).map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} onClick={close} className={linkClass(isActive(href))}>
              <Icon size={18} weight={isActive(href) ? "fill" : "regular"} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-[#861657] flex items-center justify-center text-white text-xs font-bold">
              PE
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">Praise Egbo</p>
              <p className="text-xs text-gray-400 truncate">Super Admin</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full transition-colors">
            <SignOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

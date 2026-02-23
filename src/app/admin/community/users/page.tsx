"use client";

import { useState } from "react";
import { ShieldCheck, ShieldSlash, Prohibit, ArrowCounterClockwise } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockUsers } from "@/components/admin/mockData";

type TrustFilter = "All" | "Trusted" | "Untrusted" | "Banned";

// Extend mock users with trust/ban state
const initUsers = mockUsers.map((u, i) => ({
  ...u,
  trusted: i % 3 === 0,
  banned: i === 8,
  banReason: i === 8 ? "Repeated policy violations" : "",
  approvedPosts: Math.floor(Math.random() * 40),
}));

export default function TrustManagementPage() {
  const [users, setUsers] = useState(initUsers);
  const [filter, setFilter] = useState<TrustFilter>("All");
  const [search, setSearch] = useState("");
  const [banTarget, setBanTarget] = useState<string | null>(null);
  const [banReason, setBanReason] = useState("");

  const visible = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    if (filter === "Trusted") return matchSearch && u.trusted && !u.banned;
    if (filter === "Untrusted") return matchSearch && !u.trusted && !u.banned;
    if (filter === "Banned") return matchSearch && u.banned;
    return matchSearch;
  });

  const toggle = (id: string, key: "trusted") =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, [key]: !u[key] } : u)));

  const unban = (id: string) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, banned: false, banReason: "" } : u)));

  const confirmBan = () => {
    if (!banTarget) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === banTarget ? { ...u, banned: true, trusted: false, banReason } : u))
    );
    setBanTarget(null);
    setBanReason("");
  };

  const counts = {
    All: users.length,
    Trusted: users.filter((u) => u.trusted && !u.banned).length,
    Untrusted: users.filter((u) => !u.trusted && !u.banned).length,
    Banned: users.filter((u) => u.banned).length,
  };

  return (
    <main className="flex-1">
      <AdminHeader title="Trust Management" description="Control user trust levels and bans" />

      <div className="p-4 sm:p-6 space-y-4">
        <div className="bg-[#861657]/5 border border-[#861657]/20 rounded-xl p-4 text-sm text-[#861657]">
          <strong>How trust works:</strong> Trusted users&apos; posts auto-publish · Untrusted posts
          go to moderation queue · Banned users cannot post
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20 bg-white text-gray-900 placeholder-gray-400"
          />
          <div className="flex gap-1">
            {(["All", "Trusted", "Untrusted", "Banned"] as TrustFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-[#861657] text-white" : "bg-white border border-gray-200 text-gray-600"}`}
              >
                {f} <span className="opacity-70">({counts[f]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-2">
          {visible.map((user) => (
            <div
              key={user.id}
              className={`bg-white border rounded-xl px-5 py-4 flex items-center gap-4 ${user.banned ? "border-rose-200" : "border-gray-200"}`}
            >
              <div className="w-9 h-9 rounded-full bg-[#861657]/10 flex items-center justify-center text-[#861657] text-sm font-bold shrink-0">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                  {user.trusted && !user.banned && (
                    <ShieldCheck size={14} className="text-emerald-500" weight="fill" />
                  )}
                  {user.banned && (
                    <span className="text-xs bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded">
                      Banned
                    </span>
                  )}
                  {(user.role === "Admin" || user.role === "Super Admin") && (
                    <span className="text-xs bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded">
                      {user.role}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {user.email} · {user.approvedPosts} approved posts
                </p>
                {user.banned && user.banReason && (
                  <p className="text-xs text-rose-400 mt-0.5">Reason: {user.banReason}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {user.banned ? (
                  <button
                    onClick={() => unban(user.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-medium hover:bg-emerald-100"
                  >
                    <ArrowCounterClockwise size={13} /> Unban
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => toggle(user.id, "trusted")}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${user.trusted ? "bg-amber-50 text-amber-600 hover:bg-amber-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}
                    >
                      {user.trusted ? (
                        <>
                          <ShieldSlash size={13} /> Revoke
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={13} /> Trust
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setBanTarget(user.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-50 text-rose-500 rounded-lg text-xs font-medium hover:bg-rose-100"
                    >
                      <Prohibit size={13} /> Ban
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ban modal */}
      {banTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Ban User</h3>
            <p className="text-sm text-gray-500">
              This user will no longer be able to post in the community.
            </p>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">
                Reason for ban
              </label>
              <textarea
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="Describe the reason…"
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setBanTarget(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmBan}
                className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600"
              >
                Confirm Ban
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

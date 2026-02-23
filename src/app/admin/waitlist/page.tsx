"use client";

import { useState } from "react";
import { Eye, X, Export } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockWaitlist } from "@/components/admin/mockData";

const tracks = ["All", "Leadership", "Ministry", "Career", "Marriage", "General"];

const trackColor: Record<string, string> = {
  Leadership: "bg-[#861657]/10 text-[#861657]",
  Ministry: "bg-sky-50 text-sky-600",
  Career: "bg-emerald-50 text-emerald-600",
  Marriage: "bg-rose-50 text-rose-600",
  General: "bg-gray-100 text-gray-600",
};

export default function WaitlistPage() {
  const [track, setTrack] = useState("All");
  const [search, setSearch] = useState("");
  const [viewId, setViewId] = useState<string | null>(null);

  const filtered = mockWaitlist.filter((e) => {
    const matchTrack = track === "All" || e.track === track;
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    return matchTrack && matchSearch;
  });

  const entry = mockWaitlist.find((e) => e.id === viewId);

  return (
    <main className="flex-1">
      <AdminHeader
        title="SOD Waitlist"
        description="School of Destiny registration waitlist"
        actions={
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Export size={16} /> Export
          </button>
        }
      />

      <div className="p-4 sm:p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20 bg-white text-gray-900 placeholder-gray-400"
          />
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] bg-white text-gray-700"
          >
            {tracks.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <p className="text-xs text-gray-400">
          {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"}
        </p>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Phone
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Track
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Signed Up
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#861657]/10 flex items-center justify-center text-[#861657] text-xs font-bold shrink-0">
                          {e.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs hidden sm:table-cell">
                      {e.email}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs hidden md:table-cell">
                      {e.phone}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${trackColor[e.track] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {e.track}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400 hidden lg:table-cell">
                      {e.signedUp}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setViewId(e.id)}
                        className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-50"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View modal */}
      {viewId && entry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{entry.name}</h3>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${trackColor[entry.track]}`}
                >
                  {entry.track}
                </span>
              </div>
              <button onClick={() => setViewId(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Email</span>
                <span className="font-medium text-gray-800">{entry.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone</span>
                <span className="font-medium text-gray-800">{entry.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Signed Up</span>
                <span className="font-medium text-gray-800">{entry.signedUp}</span>
              </div>
            </div>
            {entry.message && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Message</p>
                <p className="text-sm text-gray-600">{entry.message}</p>
              </div>
            )}
            <button
              onClick={() => setViewId(null)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

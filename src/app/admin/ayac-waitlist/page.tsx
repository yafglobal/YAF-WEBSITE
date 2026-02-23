"use client";

import { useState } from "react";
import { Eye, X, Export, House, Airplane, HandHeart } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { Star, Users, Globe } from "@phosphor-icons/react";
import { mockAYAC } from "@/components/admin/mockData";

const attendanceBadge: Record<string, string> = {
  Yes: "bg-emerald-50 text-emerald-700",
  No: "bg-rose-50 text-rose-600",
  Maybe: "bg-amber-50 text-amber-700",
};

export default function AYACPage() {
  const [attendance, setAttendance] = useState("All");
  const [memberType, setMemberType] = useState("All");
  const [province, setProvince] = useState("All");
  const [viewId, setViewId] = useState<string | null>(null);

  const provinces = ["All", ...Array.from(new Set(mockAYAC.map((r) => r.province)))];

  const filtered = mockAYAC.filter((r) => {
    const matchAtt = attendance === "All" || r.attendance === attendance;
    const matchMember = memberType === "All" || r.memberType === memberType;
    const matchProvince = province === "All" || r.province === province;
    return matchAtt && matchMember && matchProvince;
  });

  const entry = mockAYAC.find((r) => r.id === viewId);

  return (
    <main className="flex-1">
      <AdminHeader
        title="AYAC 2026 Registrations"
        description="Africa Youth Aflame Conference registrations"
        actions={
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Export size={16} /> Export
          </button>
        }
      />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <StatsCard
            title="Total"
            value={mockAYAC.length}
            icon={<Star size={20} weight="fill" />}
            color="plum"
          />
          <StatsCard
            title="WCI Members"
            value={mockAYAC.filter((r) => r.memberType === "WCI").length}
            icon={<Users size={20} weight="fill" />}
            color="sky"
          />
          <StatsCard
            title="External Guests"
            value={mockAYAC.filter((r) => r.memberType === "External").length}
            icon={<Globe size={20} weight="fill" />}
            color="emerald"
          />
          <StatsCard
            title="Attending"
            value={mockAYAC.filter((r) => r.attendance === "Yes").length}
            icon={<Star size={20} weight="fill" />}
            color="emerald"
          />
          <StatsCard
            title="Volunteering"
            value={mockAYAC.filter((r) => r.volunteering).length}
            icon={<HandHeart size={20} weight="fill" />}
            color="amber"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] bg-white text-gray-700"
          >
            {["All", "Yes", "No", "Maybe"].map((v) => (
              <option key={v}>{v === "All" ? "All Attendance" : v}</option>
            ))}
          </select>
          <select
            value={memberType}
            onChange={(e) => setMemberType(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] bg-white text-gray-700"
          >
            <option value="All">All Types</option>
            <option value="WCI">WCI Members</option>
            <option value="External">External Guests</option>
          </select>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] bg-white text-gray-700"
          >
            {provinces.map((p) => (
              <option key={p}>{p === "All" ? "All Provinces" : p}</option>
            ))}
          </select>
        </div>

        <p className="text-xs text-gray-400">
          {filtered.length} registration{filtered.length !== 1 ? "s" : ""}
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
                    Contact
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Church
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Attendance
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Needs
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#861657]/10 flex items-center justify-center text-[#861657] text-xs font-bold shrink-0">
                          {r.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{r.name}</p>
                          <p className="text-xs text-gray-400">
                            {r.gender === "M" ? "Male" : "Female"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <p className="text-xs text-gray-600">{r.email}</p>
                      <p className="text-xs text-gray-400">{r.phone}</p>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <p className="text-xs text-gray-700">{r.branch}</p>
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded ${r.memberType === "WCI" ? "bg-[#861657]/10 text-[#861657]" : "bg-gray-100 text-gray-500"}`}
                      >
                        {r.memberType}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${attendanceBadge[r.attendance]}`}
                      >
                        {r.attendance}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <div className="flex gap-1.5">
                        {r.accommodation && (
                          <span title="Accommodation">
                            <House size={14} className="text-sky-500" />
                          </span>
                        )}
                        {r.transportation && (
                          <span title="Transportation">
                            <Airplane size={14} className="text-emerald-500" />
                          </span>
                        )}
                        {r.volunteering && (
                          <span title="Volunteering">
                            <HandHeart size={14} className="text-[#861657]" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setViewId(r.id)}
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
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#861657] to-[#D4A0B9] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-xl">{entry.name}</h3>
                  <p className="text-white/70 text-sm">
                    {entry.gender === "M" ? "Male" : "Female"} · {entry.memberType} Member
                  </p>
                </div>
                <button onClick={() => setViewId(null)} className="text-white/70 hover:text-white">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-medium text-gray-800 mt-1 text-xs break-all">{entry.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-medium text-gray-800 mt-1 text-xs">{entry.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Branch</p>
                  <p className="font-medium text-gray-800 mt-1 text-xs">{entry.branch}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Province</p>
                  <p className="font-medium text-gray-800 mt-1 text-xs">{entry.province}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Attendance</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${attendanceBadge[entry.attendance]}`}
                  >
                    {entry.attendance}
                  </span>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Dietary</p>
                  <p className="font-medium text-gray-800 mt-1 text-xs">
                    {entry.dietary || "None"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={entry.accommodation}
                    readOnly
                    className="accent-[#861657]"
                  />{" "}
                  Needs Accommodation
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={entry.transportation}
                    readOnly
                    className="accent-[#861657]"
                  />{" "}
                  Needs Transport
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={entry.volunteering}
                    readOnly
                    className="accent-[#861657]"
                  />{" "}
                  Volunteering
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

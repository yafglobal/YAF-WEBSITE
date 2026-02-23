"use client";

import { useState } from "react";
import { Eye, Trash, Clock, Check, SpinnerGap } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockPrayerRequests } from "@/components/admin/mockData";

type Status = "All" | "Pending" | "In Progress" | "Prayed";
const statuses: Status[] = ["All", "Pending", "In Progress", "Prayed"];

const statusIcon = (s: string) => {
  if (s === "Pending") return <Clock size={14} className="text-amber-500" />;
  if (s === "In Progress") return <SpinnerGap size={14} className="text-sky-500 animate-spin" />;
  return <Check size={14} className="text-emerald-500" weight="bold" />;
};

const statusBadge: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700",
  "In Progress": "bg-sky-50 text-sky-700",
  Prayed: "bg-emerald-50 text-emerald-700",
};

export default function PrayersPage() {
  const [statusFilter, setStatusFilter] = useState<Status>("All");
  const [viewId, setViewId] = useState<string | null>(null);

  const filtered = mockPrayerRequests.filter(
    (p) => statusFilter === "All" || p.status === statusFilter
  );
  const viewing = mockPrayerRequests.find((p) => p.id === viewId);

  return (
    <main className="flex-1">
      <AdminHeader
        title="Prayer Requests"
        description={`${mockPrayerRequests.length} total requests`}
      />

      <div className="p-4 sm:p-6 space-y-4">
        {/* Status tabs */}
        <div className="flex gap-1 flex-wrap">
          {statuses.map((s) => {
            const count =
              s === "All"
                ? mockPrayerRequests.length
                : mockPrayerRequests.filter((p) => p.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? "bg-[#861657] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                {s !== "All" && statusIcon(s)}
                {s} ({count})
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Category
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Submitted
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900 text-sm">{req.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">by {req.submittedBy}</p>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {req.category}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge[req.status]}`}
                      >
                        {statusIcon(req.status)}
                        {req.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400 hidden md:table-cell">
                      {req.submittedDate}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewId(req.id)}
                          className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-50 transition-colors"
                        >
                          <Eye size={15} />
                        </button>
                        <button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 transition-colors">
                          <Trash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
            {filtered.length} request{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* View modal */}
      {viewId && viewing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-[#861657] p-6">
              <h3 className="font-bold text-white text-lg">{viewing.title}</h3>
              <p className="text-[#D4A0B9] text-xs mt-1">
                {viewing.category} · {viewing.submittedDate} · by {viewing.submittedBy}
              </p>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{viewing.content}</p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setViewId(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600">
                  Mark as Prayed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

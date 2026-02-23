"use client";

import { useState } from "react";
import { Plus, Eye, Trash, X } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { Bell, DeviceMobile, CalendarCheck, PaperPlaneTilt } from "@phosphor-icons/react";
import { mockNotifications } from "@/components/admin/mockData";

type Filter = "All" | "Draft" | "Scheduled" | "Sent" | "Cancelled";
const filters: Filter[] = ["All", "Draft", "Scheduled", "Sent", "Cancelled"];

const statusBadge: Record<string, string> = {
  Sent: "bg-emerald-50 text-emerald-700",
  Scheduled: "bg-sky-50 text-sky-700",
  Draft: "bg-gray-100 text-gray-600",
  Cancelled: "bg-rose-50 text-rose-600",
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [viewId, setViewId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");

  const visible = mockNotifications.filter((n) => filter === "All" || n.status === filter);
  const viewing = mockNotifications.find((n) => n.id === viewId);

  return (
    <main className="flex-1">
      <AdminHeader
        title="Notifications"
        description="Manage push notifications sent to app users"
        actions={
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#861657] text-white rounded-lg text-sm font-medium hover:bg-[#6a1244] transition-colors"
          >
            <Plus size={16} weight="bold" /> New Notification
          </button>
        }
      />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Sent"
            value="847"
            icon={<PaperPlaneTilt size={22} weight="fill" />}
            color="plum"
          />
          <StatsCard
            title="Scheduled"
            value="2"
            icon={<CalendarCheck size={22} weight="fill" />}
            color="sky"
          />
          <StatsCard
            title="Drafts"
            value="1"
            icon={<Bell size={22} weight="fill" />}
            color="amber"
          />
          <StatsCard
            title="Active Devices"
            value="2,612"
            icon={<DeviceMobile size={22} weight="fill" />}
            color="emerald"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 flex-wrap">
          {filters.map((f) => {
            const count =
              f === "All"
                ? mockNotifications.length
                : mockNotifications.filter((n) => n.status === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-[#861657] text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"}`}
              >
                {f} ({count})
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
                    Notification
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Target
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Created
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visible.map((n) => (
                  <tr key={n.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 max-w-xs">
                      <p className="font-medium text-gray-900 text-sm">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{n.body}</p>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {n.targetRoles.map((r) => (
                          <span
                            key={r}
                            className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge[n.status] ?? "bg-gray-100 text-gray-500"}`}
                      >
                        {n.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400 hidden md:table-cell">
                      {n.created}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewId(n.id)}
                          className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-50"
                        >
                          <Eye size={15} />
                        </button>
                        <button className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50">
                          <Trash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View modal */}
      {viewId && viewing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-gray-900">{viewing.title}</h3>
              <button onClick={() => setViewId(null)} className="text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-gray-600">{viewing.body}</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Target</p>
                <p className="font-medium text-gray-800 mt-1">{viewing.targetRoles.join(", ")}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Type</p>
                <p className="font-medium text-gray-800 mt-1">{viewing.type}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Status</p>
                <p className="font-medium text-gray-800 mt-1">{viewing.status}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-400">Created by</p>
                <p className="font-medium text-gray-800 mt-1">{viewing.createdBy}</p>
              </div>
            </div>
            {viewing.scheduledFor && (
              <div className="bg-sky-50 rounded-lg p-3 text-xs">
                <p className="text-sky-500 font-medium">Scheduled: {viewing.scheduledFor}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-gray-900">New Notification</h3>
              <button
                onClick={() => setShowCreate(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Title</label>
                <input
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Notification title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Body</label>
                <textarea
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  rows={3}
                  placeholder="Notification message…"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20 resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  Target Audience
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] bg-white">
                  <option>All Users</option>
                  <option>Admins only</option>
                  <option>Super Admins only</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600"
              >
                Save Draft
              </button>
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 px-4 py-2 bg-[#861657] text-white rounded-lg text-sm font-medium hover:bg-[#6a1244]"
              >
                Send Now
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

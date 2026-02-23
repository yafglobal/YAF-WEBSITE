"use client";

import { useState } from "react";
import { UploadSimple, Trash, GridFour, Rows, Video } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockWordOfWeek } from "@/components/admin/mockData";

export default function WordOfTheWeekPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [videos, setVideos] = useState(mockWordOfWeek);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setVideos((prev) => prev.filter((v) => v.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <main className="flex-1">
      <AdminHeader
        title="Word of the Week"
        description="Manage weekly teaching videos"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg border transition-colors ${view === "grid" ? "bg-[#861657] text-white border-[#861657]" : "bg-white border-gray-200 text-gray-500"}`}
            >
              <GridFour size={16} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg border transition-colors ${view === "list" ? "bg-[#861657] text-white border-[#861657]" : "bg-white border-gray-200 text-gray-500"}`}
            >
              <Rows size={16} />
            </button>
          </div>
        }
      />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Upload section */}
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#861657]/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#861657]/10 flex items-center justify-center mx-auto mb-3">
            <UploadSimple size={24} className="text-[#861657]" />
          </div>
          <p className="font-semibold text-gray-800 mb-1">Upload a new video</p>
          <p className="text-xs text-gray-400 mb-4">MP4, MOV, or WebM · Max 500MB</p>
          {uploading ? (
            <div className="space-y-2">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#861657] rounded-full animate-pulse w-2/3" />
              </div>
              <p className="text-xs text-gray-400">Uploading…</p>
            </div>
          ) : (
            <button
              onClick={handleUpload}
              className="px-5 py-2 bg-[#861657] text-white rounded-lg text-sm font-medium hover:bg-[#6a1244] transition-colors"
            >
              Choose File
            </button>
          )}
        </div>

        {/* Videos */}
        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((v) => (
              <div
                key={v.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                  <Video size={32} className="text-gray-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => setDeleteId(v.id)}
                      className="p-2 bg-rose-500 text-white rounded-full hover:bg-rose-600"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-800">Day {v.dayNumber}</p>
                  <p className="text-xs text-gray-400">
                    {v.uploadDate} · {v.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {videos.map((v) => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#861657]/10 flex items-center justify-center">
                          <Video size={16} className="text-[#861657]" />
                        </div>
                        <span className="font-medium text-gray-900">Day {v.dayNumber}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{v.uploadDate}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{v.duration}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => setDeleteId(v.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50"
                      >
                        <Trash size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-gray-900">Delete Video?</h3>
            <p className="text-sm text-gray-500">
              This will permanently remove Day {videos.find((v) => v.id === deleteId)?.dayNumber}
              &apos;s video. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

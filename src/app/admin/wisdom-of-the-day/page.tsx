"use client";

import { useState } from "react";
import { GridFour, Rows, MagnifyingGlass, DownloadSimple, X } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockWisdomImages } from "@/components/admin/mockData";

export default function WisdomOfTheDayPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [preview, setPreview] = useState<string | null>(null);
  const [tab, setTab] = useState<"kjv" | "nlt">("kjv");

  const image = mockWisdomImages.find((i) => i.id === preview);

  return (
    <main className="flex-1">
      <AdminHeader
        title="Wisdom of the Day"
        description="Daily scripture wisdom images from Winners Chapel Canada"
        actions={
          <div className="flex gap-2">
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

      <div className="p-4 sm:p-6">
        {view === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mockWisdomImages.map((img) => (
              <div
                key={img.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setPreview(img.id)}
              >
                {/* Image placeholder */}
                <div className="aspect-[4/5] bg-gradient-to-br from-[#861657]/20 to-[#D4A0B9]/30 flex items-center justify-center relative">
                  <div className="text-center p-3">
                    <p className="text-[#861657] text-xs font-semibold">{img.reference}</p>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-3">
                      {img.kjv.slice(0, 60)}…
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white">
                      <MagnifyingGlass size={14} />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-white">
                      <DownloadSimple size={14} />
                    </button>
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-gray-800">Day {img.day}</p>
                  <p className="text-xs text-gray-400">{img.date}</p>
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
                    Date
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Preview
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockWisdomImages.map((img) => (
                  <tr key={img.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-semibold text-gray-900">Day {img.day}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{img.date}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs bg-[#861657]/10 text-[#861657] px-2 py-0.5 rounded-full font-medium">
                        {img.reference}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400 hidden md:table-cell max-w-xs">
                      <p className="line-clamp-2">{img.kjv}</p>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setPreview(img.id)}
                          className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-50"
                        >
                          <MagnifyingGlass size={15} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100">
                          <DownloadSimple size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Preview modal */}
      {preview && image && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              {/* Image placeholder */}
              <div className="sm:w-64 aspect-[4/5] sm:aspect-auto bg-gradient-to-br from-[#861657]/20 to-[#D4A0B9]/30 flex items-center justify-center p-6 shrink-0">
                <div className="text-center">
                  <p className="text-[#861657] font-bold text-sm">{image.reference}</p>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed">
                    {image.kjv.slice(0, 120)}…
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">Day {image.day}</h3>
                    <p className="text-xs text-gray-400">{image.date}</p>
                  </div>
                  <button
                    onClick={() => setPreview(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div>
                  <span className="inline-block bg-[#861657]/10 text-[#861657] text-xs font-semibold px-2 py-0.5 rounded-full mb-3">
                    {image.reference}
                  </span>
                  {/* Tabs */}
                  <div className="flex gap-1 mb-3">
                    {(["kjv", "nlt"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors uppercase ${tab === t ? "bg-[#861657] text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tab === "kjv" ? image.kjv : image.nlt}
                  </p>
                </div>

                <button className="flex items-center gap-2 w-full px-4 py-2.5 bg-[#861657] text-white rounded-lg text-sm font-medium hover:bg-[#6a1244] justify-center">
                  <DownloadSimple size={16} /> Download Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

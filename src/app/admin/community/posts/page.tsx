"use client";

import { useState } from "react";
import { Trash, Eye, Robot } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockPosts } from "@/components/admin/mockData";

type Status = "All" | "Active" | "Pending" | "Flagged" | "Hidden" | "Removed";
const statuses: Status[] = ["All", "Active", "Pending", "Flagged", "Hidden", "Removed"];
const categories = [
  "All",
  "Testimonies",
  "Prayer Points",
  "Bible Study",
  "Community",
  "Events",
  "General",
];

const statusBadge: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Flagged: "bg-rose-50 text-rose-700",
  Hidden: "bg-gray-100 text-gray-500",
  Removed: "bg-red-50 text-red-700",
};

export default function PostsPage() {
  const [status, setStatus] = useState<Status>("All");
  const [category, setCategory] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = mockPosts.filter((p) => {
    const matchStatus = status === "All" || p.status === status;
    const matchCategory = category === "All" || p.category === category;
    return matchStatus && matchCategory;
  });

  const postToDelete = mockPosts.find((p) => p.id === deleteId);

  return (
    <main className="flex-1">
      <AdminHeader title="All Posts" description="Browse and moderate community posts" />

      <div className="p-4 sm:p-6 space-y-4">
        {/* Status tabs */}
        <div className="flex gap-1 flex-wrap">
          {statuses.map((s) => {
            const count =
              s === "All" ? mockPosts.length : mockPosts.filter((p) => p.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  status === s
                    ? "bg-[#861657] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {s} {count > 0 && <span className="ml-1 opacity-70">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] bg-white text-gray-700"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Engagement
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#861657]/10 flex items-center justify-center text-[#861657] text-xs font-bold shrink-0">
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="text-xs font-medium text-gray-700 truncate max-w-[80px]">
                          {post.author.name.split(" ")[0]}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 max-w-xs">
                      <p className="text-xs text-gray-600 line-clamp-2">{post.content}</p>
                      {/* AI badge */}
                      <span
                        className={`inline-flex items-center gap-1 text-xs mt-1 ${post.aiStatus === "Approved" ? "text-emerald-500" : "text-rose-400"}`}
                      >
                        <Robot size={11} />
                        AI {post.aiStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge[post.status] ?? "bg-gray-100 text-gray-500"}`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>🙏 {post.amen}</span>
                        <span>✝ {post.praying}</span>
                        <span>❤️ {post.encouraged}</span>
                        {post.flags > 0 && <span className="text-rose-400">🚩 {post.flags}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-50 transition-colors">
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 transition-colors"
                        >
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
            {filtered.length} post{filtered.length !== 1 ? "s" : ""} found
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {deleteId && postToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Delete Post?</h3>
            <p className="text-sm text-gray-500">
              This will permanently remove the following post:
            </p>
            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 line-clamp-3">
              {postToDelete.content}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setDeleteId(null)}
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

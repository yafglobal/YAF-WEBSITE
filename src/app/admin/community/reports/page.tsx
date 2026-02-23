"use client";

import { useState } from "react";
import { Check, Trash } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockPosts } from "@/components/admin/mockData";

// Build fake reports from flagged posts
const flaggedPosts = mockPosts.filter((p) => p.flags > 0);

export default function ReportsPage() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const visible = flaggedPosts.filter((p) => !dismissed.includes(p.id));
  const dismiss = (id: string) => setDismissed((prev) => [...prev, id]);

  return (
    <main className="flex-1">
      <AdminHeader
        title="Content Reports"
        description={`${visible.length} report${visible.length !== 1 ? "s" : ""} awaiting review`}
      />

      <div className="p-4 sm:p-6">
        {visible.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
              <Check size={24} className="text-emerald-500" weight="bold" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">No reports pending</h3>
            <p className="text-sm text-gray-400">All reports have been reviewed.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-rose-100 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{post.author.name}</p>
                    <p className="text-xs text-gray-400">
                      {post.category} · {post.flags} report{post.flags > 1 ? "s" : ""}
                    </p>
                  </div>
                  <span className="text-xs bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
                    🚩 Flagged
                  </span>
                </div>

                <p className="text-sm text-gray-600">{post.content}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => dismiss(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50"
                  >
                    <Check size={12} weight="bold" /> Dismiss
                  </button>
                  <button
                    onClick={() => dismiss(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-medium hover:bg-rose-600"
                  >
                    <Trash size={12} /> Remove Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

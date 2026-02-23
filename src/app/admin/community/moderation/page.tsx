"use client";

import { useState } from "react";
import { Check, X, Flag } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockPosts } from "@/components/admin/mockData";

export default function ModerationPage() {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const queue = mockPosts.filter(
    (p) => (p.status === "Pending" || p.status === "Flagged") && !dismissed.includes(p.id)
  );

  const dismiss = (id: string) => setDismissed((prev) => [...prev, id]);

  return (
    <main className="flex-1">
      <AdminHeader title="Moderation Queue" description="Review pending and flagged posts" />

      <div className="p-4 sm:p-6">
        {queue.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
              <Check size={24} className="text-emerald-500" weight="bold" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Queue is clear!</h3>
            <p className="text-sm text-gray-400">No posts awaiting moderation.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {queue.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-gray-200 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#861657]/10 flex items-center justify-center text-[#861657] text-sm font-bold shrink-0">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{post.author.name}</p>
                      <p className="text-xs text-gray-400">
                        {post.category} · {new Date(post.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                      post.status === "Pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {post.status}
                    {post.flags > 0 && ` · 🚩 ${post.flags}`}
                  </span>
                </div>

                <p className="text-sm text-gray-600">{post.content}</p>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => dismiss(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors"
                  >
                    <Check size={13} weight="bold" /> Approve
                  </button>
                  <button
                    onClick={() => dismiss(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-medium hover:bg-rose-600 transition-colors"
                  >
                    <X size={13} weight="bold" /> Remove
                  </button>
                  <button
                    onClick={() => dismiss(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                  >
                    <Flag size={13} /> Keep Flagged
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

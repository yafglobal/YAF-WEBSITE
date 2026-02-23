"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function CommunitySettingsPage() {
  const [mode, setMode] = useState<"strict" | "lenient">("strict");
  const [aiReview, setAiReview] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className="flex-1">
      <AdminHeader
        title="Community Settings"
        description="Configure moderation rules and AI thresholds"
      />

      <div className="p-4 sm:p-6 max-w-2xl space-y-6">
        {/* Moderation mode */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">Moderation Mode</h2>
          <div className="grid grid-cols-2 gap-3">
            {(["strict", "lenient"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${mode === m ? "border-[#861657] bg-[#861657]/5" : "border-gray-200 hover:border-gray-300"}`}
              >
                <p
                  className={`font-semibold text-sm capitalize ${mode === m ? "text-[#861657]" : "text-gray-800"}`}
                >
                  {m}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {m === "strict"
                    ? "All posts require approval before publishing."
                    : "Posts auto-publish; only flagged content is reviewed."}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* AI settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900">AI Moderation</h2>
          {[
            {
              label: "Enable AI content review",
              desc: "Use AI to automatically score posts for policy compliance",
              value: aiReview,
              set: setAiReview,
            },
            {
              label: "Auto-approve AI-passed posts",
              desc: "Posts approved by AI skip the manual review queue",
              value: autoApprove,
              set: setAutoApprove,
            },
          ].map(({ label, desc, value, set }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <button
                onClick={() => set(!value)}
                className={`relative w-10 h-6 rounded-full shrink-0 transition-colors ${value ? "bg-[#861657]" : "bg-gray-200"}`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? "translate-x-4 left-0.5" : "left-0.5"}`}
                />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={save}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            saved ? "bg-emerald-500 text-white" : "bg-[#861657] text-white hover:bg-[#6a1244]"
          }`}
        >
          {saved && <Check size={16} weight="bold" />}
          {saved ? "Saved!" : "Save Settings"}
        </button>
      </div>
    </main>
  );
}

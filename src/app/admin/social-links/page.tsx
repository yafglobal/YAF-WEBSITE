"use client";

import { useState } from "react";
import { PencilSimple, Check, X } from "@phosphor-icons/react";
import {
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  TiktokLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { Globe, Link } from "@phosphor-icons/react";
import { mockBranches } from "@/components/admin/mockData";

type Branch = (typeof mockBranches)[number];
type EditState = Record<string, Partial<Branch>>;

export default function SocialLinksPage() {
  const [branches, setBranches] = useState(mockBranches);
  const [editId, setEditId] = useState<string | null>(null);
  const [edits, setEdits] = useState<EditState>({});
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState<string | null>(null);

  const visible = branches.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  const withLinks = branches.filter(
    (b) => b.instagram || b.facebook || b.youtube || b.tiktok || b.twitter
  ).length;
  const withoutLinks = branches.length - withLinks;

  const startEdit = (b: Branch) => {
    setEditId(b.id);
    setEdits((prev) => ({ ...prev, [b.id]: { ...b } }));
  };

  const saveEdit = (id: string) => {
    setBranches((prev) => prev.map((b) => (b.id === id ? ({ ...b, ...edits[id] } as Branch) : b)));
    setEditId(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const updateField = (id: string, field: keyof Branch, value: string) =>
    setEdits((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));

  const socials = [
    {
      key: "instagram" as keyof Branch,
      Icon: InstagramLogo,
      label: "Instagram",
      color: "text-pink-500",
    },
    {
      key: "facebook" as keyof Branch,
      Icon: FacebookLogo,
      label: "Facebook",
      color: "text-blue-500",
    },
    { key: "youtube" as keyof Branch, Icon: YoutubeLogo, label: "YouTube", color: "text-red-500" },
    { key: "tiktok" as keyof Branch, Icon: TiktokLogo, label: "TikTok", color: "text-gray-800" },
    {
      key: "twitter" as keyof Branch,
      Icon: TwitterLogo,
      label: "Twitter/X",
      color: "text-sky-400",
    },
  ];

  return (
    <main className="flex-1">
      <AdminHeader title="Social Links" description="Manage branch social media handles" />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatsCard
            title="Total Branches"
            value={branches.length}
            icon={<Globe size={22} weight="fill" />}
            color="plum"
          />
          <StatsCard
            title="With Social Links"
            value={withLinks}
            icon={<Link size={22} weight="fill" />}
            color="emerald"
          />
          <StatsCard
            title="Missing Links"
            value={withoutLinks}
            icon={<Link size={22} weight="fill" />}
            color="amber"
          />
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search branches…"
          className="w-full sm:w-80 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20 bg-white text-gray-900 placeholder-gray-400"
        />

        {/* Branch list */}
        <div className="space-y-3">
          {visible.map((branch) => {
            const isEditing = editId === branch.id;
            const isSaved = saved === branch.id;
            const current = isEditing ? { ...branch, ...edits[branch.id] } : branch;
            const hasSocials =
              branch.instagram ||
              branch.facebook ||
              branch.youtube ||
              branch.tiktok ||
              branch.twitter;

            return (
              <div key={branch.id} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{branch.name}</p>
                    <span className="text-xs bg-[#861657]/10 text-[#861657] px-2 py-0.5 rounded-full">
                      {branch.province}
                    </span>
                  </div>
                  {isSaved ? (
                    <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                      <Check size={13} weight="bold" /> Saved
                    </span>
                  ) : isEditing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(branch.id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium"
                      >
                        <Check size={12} weight="bold" /> Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs"
                      >
                        <X size={12} /> Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(branch)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50"
                    >
                      <PencilSimple size={13} /> Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {socials.map(({ key, Icon, label, color }) => (
                      <div key={key} className="flex items-center gap-2">
                        <Icon size={16} className={color} />
                        <input
                          value={String(current[key] ?? "")}
                          onChange={(e) => updateField(branch.id, key, e.target.value)}
                          placeholder={label}
                          className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {hasSocials ? (
                      socials
                        .filter(({ key }) => branch[key])
                        .map(({ key, Icon, color }) => (
                          <span
                            key={key}
                            className={`flex items-center gap-1.5 text-xs ${color} bg-gray-50 px-2.5 py-1 rounded-full`}
                          >
                            <Icon size={13} />
                            {String(branch[key])}
                          </span>
                        ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">No social links added yet</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

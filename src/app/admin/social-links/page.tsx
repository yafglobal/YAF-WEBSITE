"use client";

import { useState } from "react";
import { PencilSimple, Check, X, Globe, MagnifyingGlass } from "@phosphor-icons/react";
import {
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  TiktokLogo,
  TwitterLogo,
  ShareNetwork,
} from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { mockBranches } from "@/components/admin/mockData";

type Branch = (typeof mockBranches)[number];
type EditMap = Record<string, Partial<Branch>>;

const REGIONS = ["All", "Africa", "North America", "Europe", "Asia-Pacific"] as const;

const regionColors: Record<string, string> = {
  Africa: "bg-amber-50 text-amber-700 border-amber-200",
  "North America": "bg-sky-50 text-sky-700 border-sky-200",
  Europe: "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Asia-Pacific": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

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
  { key: "twitter" as keyof Branch, Icon: TwitterLogo, label: "X/Twitter", color: "text-sky-400" },
];

export default function SocialLinksPage() {
  const [branches, setBranches] = useState(mockBranches);
  const [regionFilter, setRegionFilter] = useState<(typeof REGIONS)[number]>("All");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [edits, setEdits] = useState<EditMap>({});
  const [saved, setSaved] = useState<string | null>(null);

  const visible = branches.filter((b) => {
    const matchRegion = regionFilter === "All" || b.region === regionFilter;
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.country.toLowerCase().includes(search.toLowerCase());
    return matchRegion && matchSearch;
  });

  const grouped = (["Africa", "North America", "Europe", "Asia-Pacific"] as const).reduce<
    Record<string, Branch[]>
  >((acc, r) => {
    const items = visible.filter((b) => b.region === r);
    if (items.length) acc[r] = items;
    return acc;
  }, {});

  const withLinks = branches.filter((b) => socials.some(({ key }) => !!b[key])).length;
  const withoutLinks = branches.length - withLinks;
  const continents = new Set(branches.map((b) => b.region)).size;

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

  const BranchCard = ({ branch }: { branch: Branch }) => {
    const isEditing = editId === branch.id;
    const isSaved = saved === branch.id;
    const current = isEditing ? { ...branch, ...(edits[branch.id] ?? {}) } : branch;
    const hasSocials = socials.some(({ key }) => !!branch[key]);

    return (
      <div
        className={`bg-white border rounded-xl p-5 transition-shadow hover:shadow-sm ${
          isEditing ? "border-[#861657]/40 shadow-sm" : "border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{branch.name}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-xs text-gray-400">{branch.country}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded border font-medium ${
                  regionColors[branch.region] ?? "bg-gray-50 text-gray-500 border-gray-200"
                }`}
              >
                {branch.region}
              </span>
            </div>
          </div>

          {isSaved ? (
            <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium shrink-0">
              <Check size={13} weight="bold" /> Saved
            </span>
          ) : isEditing ? (
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => saveEdit(branch.id)}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-medium hover:bg-emerald-600"
              >
                <Check size={12} weight="bold" /> Save
              </button>
              <button
                onClick={() => setEditId(null)}
                className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs hover:bg-gray-50"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => startEdit(branch)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 shrink-0"
            >
              <PencilSimple size={13} /> Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="grid grid-cols-1 gap-2">
            {socials.map(({ key, Icon, label, color }) => (
              <div key={String(key)} className="flex items-center gap-2">
                <Icon size={15} className={color} />
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
          <div className="flex flex-wrap gap-1.5 min-h-[24px]">
            {hasSocials ? (
              socials
                .filter(({ key }) => !!branch[key])
                .map(({ key, Icon, color }) => (
                  <span
                    key={String(key)}
                    className={`flex items-center gap-1 text-xs ${color} bg-gray-50 px-2 py-1 rounded-full font-medium`}
                  >
                    <Icon size={12} />
                    {String(branch[key])}
                  </span>
                ))
            ) : (
              <p className="text-xs text-gray-300 italic">No links added yet</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <main className="flex-1">
      <AdminHeader title="Social Links" description="Manage global branch social media handles" />

      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Branches"
            value={branches.length}
            icon={<Globe size={22} weight="fill" />}
            color="plum"
          />
          <StatsCard
            title="Regions"
            value={continents}
            icon={<ShareNetwork size={22} weight="fill" />}
            color="sky"
          />
          <StatsCard
            title="With Social Links"
            value={withLinks}
            icon={<Check size={22} weight="fill" />}
            color="emerald"
          />
          <StatsCard
            title="Missing Links"
            value={withoutLinks}
            icon={<X size={22} weight="fill" />}
            color="amber"
          />
        </div>

        {/* Search + region filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MagnifyingGlass
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by branch name or country…"
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20 bg-white text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  regionFilter === r
                    ? "bg-[#861657] text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {r}
                {r !== "All" && (
                  <span className="ml-1 opacity-60">
                    ({branches.filter((b) => b.region === r).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Branches — grouped by region when showing All */}
        {regionFilter === "All" ? (
          <div className="space-y-8">
            {Object.entries(grouped).map(([region, items]) => (
              <section key={region}>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-sm font-bold text-gray-700">{region}</h2>
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400">
                    {items.length} branch{items.length !== 1 ? "es" : ""}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {items.map((b) => (
                    <BranchCard key={b.id} branch={b} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {visible.map((b) => (
              <BranchCard key={b.id} branch={b} />
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            No branches match your search.
          </div>
        )}
      </div>
    </main>
  );
}

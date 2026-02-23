"use client";

import { useState, useRef } from "react";
import { Check, X, ShieldStar, DotsSixVertical } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ExportMenu } from "@/components/admin/ExportMenu";
import { mockUsers } from "@/components/admin/mockData";

// ── Column definitions ──────────────────────────────────────────────────────
const COLUMNS = [
  { id: "name", label: "User", draggable: true, hide: null },
  { id: "email", label: "Email", draggable: true, hide: "sm" },
  { id: "role", label: "Role", draggable: true, hide: null },
  { id: "ai", label: "AI", draggable: true, hide: "md" },
  { id: "joined", label: "Joined", draggable: true, hide: "lg" },
  { id: "actions", label: "", draggable: false, hide: null },
] as const;

type ColId = (typeof COLUMNS)[number]["id"];

const roles = ["All", "Super Admin", "Admin", "User"];

const roleBadge = (role: string) => {
  if (role === "Super Admin") return "bg-[#861657]/10 text-[#861657]";
  if (role === "Admin") return "bg-sky-50 text-sky-600";
  return "bg-gray-100 text-gray-600";
};

const hideClass: Record<string, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
};

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [colOrder, setColOrder] = useState<ColId[]>(COLUMNS.map((c) => c.id));
  const [dragging, setDragging] = useState<ColId | null>(null);
  const [dragOver, setDragOver] = useState<ColId | null>(null);
  const dragNode = useRef<HTMLTableCellElement | null>(null);

  const orderedCols = colOrder.map((id) => COLUMNS.find((c) => c.id === id)!);

  const filtered = mockUsers.filter((u) => {
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const onDragStart = (id: ColId) => (e: React.DragEvent) => {
    setDragging(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (id: ColId) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(id);
  };

  const onDrop = (targetId: ColId) => () => {
    if (!dragging || dragging === targetId) return;
    const next = [...colOrder];
    const from = next.indexOf(dragging);
    const to = next.indexOf(targetId);
    next.splice(from, 1);
    next.splice(to, 0, dragging);
    setColOrder(next);
    setDragging(null);
    setDragOver(null);
  };

  const onDragEnd = () => {
    setDragging(null);
    setDragOver(null);
  };

  // ── Export data ────────────────────────────────────────────────────────────
  const exportData = filtered.map((u) => ({
    name: u.name,
    email: u.email,
    role: u.role,
    ai: u.aiEnabled ? "Yes" : "No",
    joined: u.joinDate,
  }));
  const exportCols = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "AI", key: "ai" },
    { label: "Joined", key: "joined" },
  ];

  // ── Cell renderer ──────────────────────────────────────────────────────────
  const renderCell = (colId: ColId, user: (typeof mockUsers)[0]) => {
    switch (colId) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#861657]/10 flex items-center justify-center text-[#861657] text-xs font-bold shrink-0">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <span className="font-medium text-gray-900 truncate max-w-[120px]">{user.name}</span>
          </div>
        );
      case "email":
        return <span className="text-gray-500">{user.email}</span>;
      case "role":
        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge(user.role)}`}
          >
            {user.role === "Super Admin" && <ShieldStar size={12} weight="fill" />}
            {user.role}
          </span>
        );
      case "ai":
        return user.aiEnabled ? (
          <Check size={16} className="text-emerald-500" weight="bold" />
        ) : (
          <X size={16} className="text-gray-300" weight="bold" />
        );
      case "joined":
        return <span className="text-gray-400 text-xs">{user.joinDate}</span>;
      case "actions":
        return (
          <select className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none focus:border-[#861657] bg-white">
            <option>User</option>
            <option>Admin</option>
            <option>Super Admin</option>
          </select>
        );
    }
  };

  return (
    <main className="flex-1">
      <AdminHeader
        title="Users"
        description={`${mockUsers.length} total members`}
        actions={
          <ExportMenu
            data={exportData as Record<string, unknown>[]}
            columns={exportCols}
            filename="yag-users"
          />
        }
      />

      <div className="p-4 sm:p-6 space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20 bg-white text-gray-900 placeholder-gray-400"
          />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] bg-white text-gray-700"
          >
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Drag hint */}
        <p className="text-xs text-gray-400 flex items-center gap-1">
          <DotsSixVertical size={14} /> Drag column headers to reorder
        </p>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {orderedCols.map((col) => {
                    const isDragging = dragging === col.id;
                    const isOver = dragOver === col.id;
                    return (
                      <th
                        key={col.id}
                        ref={isDragging ? dragNode : null}
                        draggable={col.draggable}
                        onDragStart={col.draggable ? onDragStart(col.id) : undefined}
                        onDragOver={col.draggable ? onDragOver(col.id) : undefined}
                        onDrop={col.draggable ? onDrop(col.id) : undefined}
                        onDragEnd={onDragEnd}
                        className={[
                          "text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider select-none",
                          col.draggable ? "cursor-grab active:cursor-grabbing" : "",
                          col.hide ? hideClass[col.hide] : "",
                          isDragging ? "opacity-40" : "",
                          isOver ? "border-l-2 border-[#861657]" : "",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-1.5">
                          {col.draggable && (
                            <DotsSixVertical size={13} className="text-gray-300 shrink-0" />
                          )}
                          {col.label}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    {orderedCols.map((col) => (
                      <td
                        key={col.id}
                        className={`px-5 py-3 ${col.hide ? hideClass[col.hide] : ""}`}
                      >
                        {renderCell(col.id, user)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>
              Showing {filtered.length} of {mockUsers.length} users
            </span>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 border border-gray-200 rounded disabled:opacity-40"
                disabled
              >
                Previous
              </button>
              <button
                className="px-2 py-1 border border-gray-200 rounded disabled:opacity-40"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

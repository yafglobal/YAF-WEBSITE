"use client";

import { useState, useRef, useEffect } from "react";
import {
  Check,
  X,
  ShieldStar,
  DotsSixVertical,
  DotsThree,
  Prohibit,
  Trash,
  UserSwitch,
  Warning,
} from "@phosphor-icons/react";
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

// ── Action menu (per row) ────────────────────────────────────────────────────
function ActionMenu({
  userId,
  isBanned,
  onRoleChange,
  onBan,
  onUnban,
  onDelete,
}: {
  userId: string;
  isBanned: boolean;
  onRoleChange: (role: string) => void;
  onBan: () => void;
  onUnban: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  // Suppress linter for unused userId (kept for future use / key purposes)
  void userId;

  return (
    <div className="relative flex justify-end" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
      >
        <DotsThree size={18} weight="bold" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-20 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1 overflow-hidden">
          {/* Role section */}
          <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Change Role
          </p>
          {["User", "Admin", "Super Admin"].map((r) => (
            <button
              key={r}
              onClick={() => {
                onRoleChange(r);
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <UserSwitch size={15} className="text-gray-400" />
              {r}
            </button>
          ))}

          <div className="my-1 border-t border-gray-100" />

          {/* Ban / Unban */}
          {isBanned ? (
            <button
              onClick={() => {
                onUnban();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <Check size={15} weight="bold" />
              Unban Account
            </button>
          ) : (
            <button
              onClick={() => {
                onBan();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-amber-600 hover:bg-amber-50 transition-colors"
            >
              <Prohibit size={15} weight="bold" />
              Ban Account
            </button>
          )}

          {/* Delete */}
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash size={15} weight="bold" />
            Delete Account
          </button>
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [colOrder, setColOrder] = useState<ColId[]>(COLUMNS.map((c) => c.id));
  const [dragging, setDragging] = useState<ColId | null>(null);
  const [dragOver, setDragOver] = useState<ColId | null>(null);
  const dragNode = useRef<HTMLTableCellElement | null>(null);

  // Mutable local state for users
  const [userRoles, setUserRoles] = useState<Record<string, string>>({});
  const [bannedIds, setBannedIds] = useState<Set<string>>(new Set());
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  // Modals
  const [banTarget, setBanTarget] = useState<{ id: string; name: string } | null>(null);
  const [banReason, setBanReason] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const orderedCols = colOrder.map((id) => COLUMNS.find((c) => c.id === id)!);

  const filtered = mockUsers.filter((u) => {
    if (deletedIds.has(u.id)) return false;
    const matchRole = roleFilter === "All" || (userRoles[u.id] ?? u.role) === roleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  // ── Drag handlers ────────────────────────────────────────────────────────
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

  // ── Export ──────────────────────────────────────────────────────────────
  const exportData = filtered.map((u) => ({
    name: u.name,
    email: u.email,
    role: userRoles[u.id] ?? u.role,
    status: bannedIds.has(u.id) ? "Banned" : "Active",
    ai: u.aiEnabled ? "Yes" : "No",
    joined: u.joinDate,
  }));
  const exportCols = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Status", key: "status" },
    { label: "AI", key: "ai" },
    { label: "Joined", key: "joined" },
  ];

  // ── Cell renderer ────────────────────────────────────────────────────────
  const renderCell = (colId: ColId, user: (typeof mockUsers)[0]) => {
    const role = userRoles[user.id] ?? user.role;
    const banned = bannedIds.has(user.id);

    switch (colId) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                banned ? "bg-red-100 text-red-500" : "bg-[#861657]/10 text-[#861657]"
              }`}
            >
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="min-w-0">
              <span className="font-medium text-gray-900 truncate max-w-[120px] block">
                {user.name}
              </span>
              {banned && (
                <span className="text-[10px] font-semibold text-red-500 uppercase tracking-wider">
                  Banned
                </span>
              )}
            </div>
          </div>
        );
      case "email":
        return <span className="text-gray-500 text-xs">{user.email}</span>;
      case "role":
        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge(role)}`}
          >
            {role === "Super Admin" && <ShieldStar size={12} weight="fill" />}
            {role}
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
          <ActionMenu
            userId={user.id}
            isBanned={banned}
            onRoleChange={(r) => setUserRoles((prev) => ({ ...prev, [user.id]: r }))}
            onBan={() => setBanTarget({ id: user.id, name: user.name })}
            onUnban={() =>
              setBannedIds((prev) => {
                const s = new Set(prev);
                s.delete(user.id);
                return s;
              })
            }
            onDelete={() => setDeleteTarget({ id: user.id, name: user.name })}
          />
        );
    }
  };

  return (
    <main className="flex-1">
      <AdminHeader
        title="Users"
        description={`${mockUsers.length - deletedIds.size} members · ${bannedIds.size} banned`}
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
                  <tr
                    key={user.id}
                    className={`transition-colors ${bannedIds.has(user.id) ? "bg-red-50/40 hover:bg-red-50/60" : "hover:bg-gray-50"}`}
                  >
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
              Showing {filtered.length} of {mockUsers.length - deletedIds.size} users
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

      {/* ── Ban modal ──────────────────────────────────────────────────────── */}
      {banTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <Prohibit size={20} weight="fill" className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Ban Account</h3>
                <p className="text-sm text-gray-500">{banTarget.name}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              This user will lose access to the platform immediately. You can unban them at any
              time.
            </p>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Reason <span className="text-gray-400">(optional)</span>
              </label>
              <textarea
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                placeholder="e.g. Spam, harassment, policy violation…"
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setBanTarget(null);
                  setBanReason("");
                }}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setBannedIds((prev) => new Set([...prev, banTarget.id]));
                  setBanTarget(null);
                  setBanReason("");
                }}
                className="flex-1 px-4 py-2 bg-amber-500 rounded-lg text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
              >
                Ban Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete modal ───────────────────────────────────────────────────── */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Warning size={20} weight="fill" className="text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Delete Account</h3>
                <p className="text-sm text-gray-500">{deleteTarget.name}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              This action is <span className="font-semibold text-red-600">permanent</span>. All data
              associated with this account will be removed and cannot be recovered.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setDeletedIds((prev) => new Set([...prev, deleteTarget.id]));
                  setBannedIds((prev) => {
                    const s = new Set(prev);
                    s.delete(deleteTarget.id);
                    return s;
                  });
                  setDeleteTarget(null);
                }}
                className="flex-1 px-4 py-2 bg-red-500 rounded-lg text-sm font-semibold text-white hover:bg-red-600 transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

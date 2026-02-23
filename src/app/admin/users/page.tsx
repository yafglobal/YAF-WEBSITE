"use client";

import { useState } from "react";
import { Check, X, ShieldStar } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockUsers } from "@/components/admin/mockData";

const roles = ["All", "Super Admin", "Admin", "User"];

const roleBadge = (role: string) => {
  if (role === "Super Admin") return "bg-[#861657]/10 text-[#861657]";
  if (role === "Admin") return "bg-sky-50 text-sky-600";
  return "bg-gray-100 text-gray-600";
};

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter((u) => {
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <main className="flex-1">
      <AdminHeader title="Users" description={`${mockUsers.length} total members`} />

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

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    AI
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-[#861657]/2 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#861657]/10 flex items-center justify-center text-[#861657] text-xs font-bold shrink-0">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <span className="font-medium text-gray-900 truncate max-w-[120px]">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 hidden sm:table-cell">{user.email}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleBadge(user.role)}`}
                      >
                        {user.role === "Super Admin" && <ShieldStar size={12} weight="fill" />}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      {user.aiEnabled ? (
                        <Check size={16} className="text-emerald-500" weight="bold" />
                      ) : (
                        <X size={16} className="text-gray-300" weight="bold" />
                      )}
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs hidden lg:table-cell">
                      {user.joinDate}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <select className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-600 focus:outline-none focus:border-[#861657] bg-white">
                        <option>User</option>
                        <option>Admin</option>
                        <option>Super Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
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

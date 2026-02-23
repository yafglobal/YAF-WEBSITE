"use client";

import { useState } from "react";
import { Plus, PencilSimple, ToggleLeft, ToggleRight } from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { mockCategories } from "@/components/admin/mockData";

export default function CategoriesPage() {
  const [cats, setCats] = useState(mockCategories);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const toggleActive = (id: string) =>
    setCats((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  const addCategory = () => {
    if (!newName.trim()) return;
    setCats((prev) => [
      ...prev,
      { id: String(Date.now()), name: newName, description: newDesc, postCount: 0, active: true },
    ]);
    setNewName("");
    setNewDesc("");
    setShowAdd(false);
  };

  return (
    <main className="flex-1">
      <AdminHeader
        title="Categories"
        description="Manage community discussion categories"
        actions={
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#861657] text-white rounded-lg text-sm font-medium hover:bg-[#6a1244] transition-colors"
          >
            <Plus size={16} weight="bold" /> Add Category
          </button>
        }
      />

      <div className="p-4 sm:p-6">
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className={`flex items-center gap-4 px-5 py-4 ${!cat.active ? "opacity-50" : ""}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900 text-sm">{cat.name}</p>
                  {!cat.active && (
                    <span className="text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">
                      Disabled
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>
              </div>
              <span className="text-xs text-gray-400 hidden sm:block">{cat.postCount} posts</span>
              <div className="flex items-center gap-2 shrink-0">
                <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                  <PencilSimple size={15} />
                </button>
                <button
                  onClick={() => toggleActive(cat.id)}
                  className={`p-1.5 rounded-lg transition-colors ${cat.active ? "text-emerald-500 hover:bg-emerald-50" : "text-gray-400 hover:bg-gray-100"}`}
                >
                  {cat.active ? <ToggleRight size={18} weight="fill" /> : <ToggleLeft size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Add Category</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Name</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Category name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">
                  Description
                </label>
                <input
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Short description"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#861657] focus:ring-2 focus:ring-[#861657]/20"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addCategory}
                className="flex-1 px-4 py-2 bg-[#861657] text-white rounded-lg text-sm font-medium hover:bg-[#6a1244]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

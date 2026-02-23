"use client";

import { List } from "@phosphor-icons/react";
import { useAdmin } from "./AdminContext";

interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function AdminHeader({ title, description, actions }: AdminHeaderProps) {
  const { setSidebarOpen } = useAdmin();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <List size={20} />
          </button>

          <div className="min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
            {description && (
              <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">{description}</p>
            )}
          </div>
        </div>

        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  );
}

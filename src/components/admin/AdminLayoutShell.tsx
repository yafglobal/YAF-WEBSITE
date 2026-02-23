"use client";

import { usePathname } from "next/navigation";
import { AdminProvider } from "@/components/admin/AdminContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

const AUTH_PATHS = ["/admin/login", "/admin/signup"];

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_PATHS.includes(pathname);

  if (isAuthPage) {
    return <div className="min-h-screen bg-gray-50 text-gray-900">{children}</div>;
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AdminSidebar />
        <div className="lg:ml-64 min-h-screen flex flex-col">{children}</div>
      </div>
    </AdminProvider>
  );
}

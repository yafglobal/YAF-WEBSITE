import { AdminProvider } from "@/components/admin/AdminContext";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin — Youth Alive Global" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      {/* Force light theme for admin by using explicit light-bg colours */}
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AdminSidebar />

        {/* Main content offset for fixed sidebar on desktop */}
        <div className="lg:ml-64 min-h-screen flex flex-col">{children}</div>
      </div>
    </AdminProvider>
  );
}

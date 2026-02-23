import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export const metadata = { title: "Admin — Youth Alive Global" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}

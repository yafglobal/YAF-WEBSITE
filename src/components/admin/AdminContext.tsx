"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const AdminContext = createContext<AdminContextType>({
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);

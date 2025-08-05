'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import LayoutAdmin from '@/components/admin/LayoutAdmin/LayoutAdmin';
import Sidebar from '@/components/admin/Sidebar/Sidebar';
import Sidebar2 from '@/components/admin/Sidebar/Sidebar2';
import { UserVerifyListProvider } from '@/hooks/admin/usersPageHooks/useUserVerifyListState';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Escuchar el evento de cambio de estado del sidebar
  useEffect(() => {
    // Inicializar desde localStorage
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarCollapsed');
      setSidebarCollapsed(savedState === 'true');
    }

    // Escuchar cambios en el estado del sidebar
    const handleSidebarChange = (event: any) => {
      setSidebarCollapsed(event.detail.isCollapsed);
    };

    window.addEventListener('sidebarStateChange', handleSidebarChange);

    // Limpiar el event listener
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarChange);
    };
  }, []);

  return (
    <section className="m-auto min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      {/* <Sidebar2 /> */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-72'}`}>
        {/* <LayoutAdmin /> */}
        <UserVerifyListProvider>
          <main className="m-auto max-w-[1400px] p-4 md:p-6">{children}</main>
        </UserVerifyListProvider>
      </div>
    </section>
  );
}

'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import LayoutAdmin from '@/components/admin/LayoutAdmin/LayoutAdmin';
import Sidebar from '@/components/admin/Sidebar/Sidebar';

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
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'md:ml-16' : 'md:ml-60'} pt-16`}>
        <LayoutAdmin />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </section>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  Home,
  Menu,
  Wallet,
  FileText,
  Bell,
} from 'lucide-react';

// Crear un evento personalizado para comunicar el estado del sidebar
export const createSidebarEvent = (isCollapsed: boolean) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('sidebarStateChange', { detail: { isCollapsed } });
    window.dispatchEvent(event);
  }
};

const Sidebar = () => {
  const pathname = usePathname();
  // Inicializar el estado desde localStorage (con un valor predeterminado)
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Cargar el estado del sidebar desde localStorage al montar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarCollapsed');
      const isCollapsed = savedState === 'true';
      setCollapsed(isCollapsed);
      // Emitir el evento inicial para sincronizar el layout
      createSidebarEvent(isCollapsed);
    }
  }, []);

  // Grupos de navegación con títulos
  const navGroups = [
    {
      title: 'Principal',
      items: [
        {
          name: 'Dashboard',
          href: '/admin',
          icon: Home,
        },
      ],
    },
    {
      title: 'Operaciones',
      items: [
        {
          name: 'Transacciones',
          href: '/admin/transactions',
          icon: CreditCard,
        },
        {
          name: 'Pagos',
          href: '/admin/payments',
          icon: Wallet,
        },
      ],
    },
    {
      title: 'Gestión',
      items: [
        {
          name: 'Usuarios',
          href: '/admin/users',
          icon: Users,
        },
        {
          name: 'Reportes',
          href: '/admin/reports',
          icon: BarChart3,
        },
        {
          name: 'Notificaciones',
          href: '/admin/notifications',
          icon: Bell,
        },
      ],
    },
    {
      title: 'Sistema',
      items: [
        {
          name: 'Configuración',
          href: '/admin/settings',
          icon: Settings,
        },
        {
          name: 'Documentación',
          href: '/admin/docs',
          icon: FileText,
        },
      ],
    },
  ];

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);

    // Guardar en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', String(newState));
      // Emitir evento para notificar al layout
      createSidebarEvent(newState);
    }
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed left-4 top-4 z-40 rounded-md bg-white p-2 shadow-md dark:bg-gray-800 md:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen border-r border-gray-100 bg-white transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${collapsed ? 'w-16' : 'w-60'}`}
      >
        <div className="flex h-full flex-col">
          {/* Logo and collapse button */}
          <div className="flex h-16 items-center justify-between border-b border-gray-100 px-3 dark:border-gray-700">
            {!collapsed && <div className="text-lg font-medium text-blue-600 dark:text-blue-400">SwaplyAr</div>}
            <button
              onClick={toggleSidebar}
              className={`rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 ${collapsed ? 'mx-auto' : 'ml-auto'}`}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {navGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                {/* Group title - only show when not collapsed */}
                {!collapsed && (
                  <h3 className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {group.title}
                  </h3>
                )}

                {/* Group items */}
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));

                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive
                              ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                          } ${collapsed ? 'justify-center' : ''} `}
                        >
                          <item.icon size={18} className={collapsed ? '' : 'mr-2'} />
                          {!collapsed && <span>{item.name}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-100 p-3 dark:border-gray-700">
            {!collapsed && <div className="text-xs text-gray-500 dark:text-gray-400">Panel de Administración</div>}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

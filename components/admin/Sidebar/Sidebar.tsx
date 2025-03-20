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
  Menu,
  Clock,
  XCircle,
  CheckCircle,
  Edit,
  AlertTriangle,
  Tag,
} from 'lucide-react';

// Create a custom event to communicate sidebar state
export const createSidebarEvent = (isCollapsed: boolean) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('sidebarStateChange', { detail: { isCollapsed } });
    window.dispatchEvent(event);
  }
};

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarCollapsed');
      const isCollapsed = savedState === 'true';
      setCollapsed(isCollapsed);
      createSidebarEvent(isCollapsed);
    }
  }, []);

  // Function to create URL with preserved query params
  /*   const createStatusUrl = (statusId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', statusId);
    return `${pathname}?${params.toString()}`;
  }; */

  // Status shortcuts data with icons
  const statusShortcuts = [
    {
      title: 'Status SwaplyAr',
      items: [
        {
          id: 'en-proceso',
          color: 'text-blue-600',
          icon: Clock,
          label: 'En Proceso',
          description: 'La transacción sigue su curso',
        },
        {
          id: 'rechazada',
          color: 'text-red-600',
          icon: XCircle,
          label: 'Rechazada',
          description: 'El cliente solicitó la cancelación y el reembolso',
        },
        {
          id: 'finalizado',
          color: 'text-green-600',
          icon: CheckCircle,
          label: 'Finalizado',
          description: 'La solicitud fue finalizada con éxito',
        },
      ],
    },
    {
      title: 'Status Cliente',
      items: [
        {
          id: 'editar',
          color: 'text-amber-600',
          icon: Edit,
          label: 'Editar',
          description: 'El cliente solicitó editar la solicitud',
        },
        {
          id: 'cancelar',
          color: 'text-red-600',
          icon: AlertTriangle,
          label: 'Cancelar',
          description: 'El cliente solicitó la cancelación y el reembolso',
        },
      ],
    },
  ];

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);

    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', String(newState));
      createSidebarEvent(newState);
    }
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
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

      {/* Status Dropdown for collapsed sidebar */}
      {collapsed && statusDropdownOpen && (
        <div className="fixed left-16 top-1/4 z-50 w-64 rounded-md border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 flex items-center justify-between border-b pb-2">
            <span className="font-medium">Atajos de Status</span>
            <button
              onClick={toggleStatusDropdown}
              className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XCircle size={16} />
            </button>
          </div>
          {/* {statusShortcuts.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-3">
              <h4 className="mb-1 text-xs font-medium text-gray-600 dark:text-gray-300">{group.title}</h4>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={createStatusUrl(item.id)}
                      className="flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      onClick={() => setStatusDropdownOpen(false)}
                    >
                      <item.icon size={16} className={`${item.color} mr-2`} />
                      <span className={item.color}>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))} */}
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen border-r border-gray-100 bg-white transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${collapsed ? 'w-16' : 'w-72'}`}
      >
        <div className="flex h-full flex-col">
          {/* Logo and collapse button */}
          <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4 dark:border-gray-700">
            {!collapsed && <div className="text-lg font-medium text-blue-600 dark:text-blue-400">SwaplyAr</div>}
            <button
              onClick={toggleSidebar}
              className={`rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 ${
                collapsed ? 'mx-auto' : 'ml-auto'
              }`}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-4">
            <div>
              {/* Inicio Group */}
              <div className="mb-6">
                {!collapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Inicio
                  </h3>
                )}
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      href="/admin/transactions"
                      className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                        pathname === '/admin/transactions' || pathname?.startsWith('/admin/transactions')
                          ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                      } ${collapsed ? 'justify-center' : ''}`}
                    >
                      <CreditCard size={20} className={collapsed ? '' : 'mr-3'} />
                      {!collapsed && <span>Operación de Transacciones</span>}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/reports"
                      className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                        pathname === '/admin/reports' || pathname?.startsWith('/admin/reports')
                          ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                      } ${collapsed ? 'justify-center' : ''}`}
                    >
                      <BarChart3 size={20} className={collapsed ? '' : 'mr-3'} />
                      {!collapsed && <span>Reportes</span>}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Gestión Group */}
              <div className="mb-6">
                {!collapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Gestión
                  </h3>
                )}
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      href="/admin/users"
                      className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                        pathname === '/admin/users' || pathname?.startsWith('/admin/users')
                          ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                      } ${collapsed ? 'justify-center' : ''}`}
                    >
                      <Users size={20} className={collapsed ? '' : 'mr-3'} />
                      {!collapsed && <span>Gestión de Usuarios</span>}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Atajos Group */}
              <div className="mb-6">
                {!collapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Atajos
                  </h3>
                )}

                {!collapsed ? (
                  <div>
                    {/*  {statusShortcuts.map((group, groupIndex) => (
                      <div key={groupIndex} className="mb-3">
                        <h4 className="mb-1.5 px-3 text-xs font-medium text-gray-600 dark:text-gray-300">
                          {group.title}
                        </h4>
                        <ul className="space-y-1.5">
                          {group.items.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={createStatusUrl(item.id)}
                                className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${collapsed ? 'justify-center' : ''}`}
                              >
                                <item.icon size={20} className={`${item.color} ${collapsed ? '' : 'mr-3'}`} />
                                {!collapsed && <span className={item.color}>{item.label}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))} */}
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={toggleStatusDropdown}
                      className={`flex w-full justify-center rounded-md px-3 py-2.5 text-sm transition-colors ${statusDropdownOpen ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'}`}
                      aria-label="Mostrar atajos"
                    >
                      <Tag size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Settings at the bottom */}
            <div className="mt-auto">
              <ul>
                <li>
                  <Link
                    href="/admin/settings"
                    className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                      pathname === '/admin/settings' || pathname?.startsWith('/admin/settings')
                        ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    <Settings size={20} className={collapsed ? '' : 'mr-3'} />
                    {!collapsed && <span>Configuración</span>}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

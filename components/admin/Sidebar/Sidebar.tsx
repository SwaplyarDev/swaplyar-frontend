'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  // ChevronLeft,
  // ChevronRight,
  // BarChart3,
  // Users,
  // CreditCard,
  Menu,
  Clock,
  XCircle,
  CheckCircle,
  Edit,
  AlertTriangle,
  Tag,
} from 'lucide-react';
import { Button, styled } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Image from 'next/image';
import LogoSidebar from './componentsSidebar/LogoSidebar';
import InicioGroup from './componentsSidebar/Navigation/InicioGroup';
import GestionGroup from './componentsSidebar/Navigation/GestionGroup';
// import AtajosGroup from './componentsSidebar/Navigation/AtajosGroup';
import AnimatedCerrarSesion from '@/components/icons-internal/CerrarSesion/AnimatedCerrarSesion';
import CerrarSesionIcon from '@/components/icons-internal/CerrarSesion/CerrarSesionIcon';
import { SwaplyArLogoSolo, SwaplyArlogoWhite } from '@/utils/assets/imgDatabaseCloudinary';

// Create a custom event to communicate sidebar state
export const createSidebarEvent = (isCollapsed: boolean) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('sidebarStateChange', { detail: { isCollapsed } });
    window.dispatchEvent(event);
  }
};

// Botón de logout estilizado
const LogoutButton = styled(Button)(({ theme }) => ({
  minHeight: '38px',
  width: '90%',
  borderRadius: '1.5rem',
  padding: '6px 16px',
  fontSize: '0.875rem',
  marginTop: '8px',
  border: '1px solid',
  textTransform: 'none',
}));

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const { isDark } = useDarkTheme();

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('sidebarCollapsed');
      const isCollapsed = savedState === 'true';
      setCollapsed(isCollapsed);
      createSidebarEvent(isCollapsed);
    }
  }, []);

  // Botón estilizado para el perfil que se adapta al estado del sidebar
  const ProfileButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '8px 12px',
    borderRadius: '0.5rem',
    width: '100%',
    textTransform: 'none',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  }));

  // Function to create URL with preserved query params
  const createStatusUrl = (statusId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', statusId);
    return `${pathname}?${params.toString()}`;
  };

  const { data: session, status } = useSession();

  // Popover para el perfil de usuario
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const profileOpen = Boolean(profileAnchorEl);
  const profileId = profileOpen ? 'user-profile-popover' : undefined;

  // Popover para status
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
          {statusShortcuts.map((group, groupIndex) => (
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
          ))}
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
          <LogoSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

          {/* Navigation */}
          <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-4">
            <div>
              {collapsed && (
                <Link href="/es/auth/solicitud">
                  <Image
                    src={isDark ? SwaplyArlogoWhite : SwaplyArLogoSolo}
                    className="mb-6 max-h-14 w-full max-w-14"
                    alt="Cambiar saldo online"
                    width={200}
                    height={80}
                  />
                </Link>
              )}
              {/* Inicio Group */}
              <InicioGroup collapsed={collapsed} pathname={pathname} />

              {/* Gestión Group */}
              <GestionGroup collapsed={collapsed} pathname={pathname} />

              {/* Atajos Group */}
              {/* <AtajosGroup
                collapsed={collapsed}
                pathname={pathname}
                statusDropdownOpen={statusDropdownOpen}
                toggleStatusDropdown={toggleStatusDropdown}
                statusShortcuts={statusShortcuts}
                createStatusUrl={createStatusUrl}
              /> */}
            </div>

            {/* User at the bottom
            <UserBotton
              collapsed={collapsed}
              session={session}
              status={status}
              profileId={profileId}
              handleProfileClick={handleProfileClick}
              handleProfileClose={handleProfileClose}
              profileOpen={profileOpen}
              profileAnchorEl={profileAnchorEl}
              isDark={isDark}
              ProfileButton={ProfileButton}
              LogoutButton={LogoutButton}
            /> */}
            <div
              onClick={() => signOut()}
              className={clsx(
                'mt-6 flex cursor-pointer justify-center justify-self-end',
                collapsed ? 'px-0' : 'justify-start px-2',
              )}
            >
              {collapsed ? (
                <div className="flex items-center justify-center rounded-full bg-[#012A8E] p-2 dark:bg-[#EBE7E0]">
                  <div className="flex items-center justify-center text-[#EBE7E0]">
                    <CerrarSesionIcon isAdmin={true} />
                  </div>
                </div>
              ) : (
                <AnimatedCerrarSesion isAdmin={true} />
              )}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;

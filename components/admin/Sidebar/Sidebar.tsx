'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Users,
  CreditCard,
  Menu,
  Clock,
  XCircle,
  CheckCircle,
  Edit,
  AlertTriangle,
  Tag,
} from 'lucide-react';
import { Avatar, Button, Popover, styled, Typography, Box } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import clsx from 'clsx';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Image from 'next/image';
import LogoSidebar from './componentsSidebar/LogoSidebar';
import InicioGroup from './componentsSidebar/Navigation/InicioGroup';
import GestionGroup from './componentsSidebar/Navigation/GestionGroup';

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
              {/* Inicio Group */}
              <InicioGroup collapsed={collapsed} pathname={pathname} />

              {/* Gestión Group */}
              <GestionGroup collapsed={collapsed} pathname={pathname} />

              {/* Atajos Group */}
              <div className="mb-6">
                {!collapsed && (
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Atajos
                  </h3>
                )}

                {!collapsed ? (
                  <div>
                    {statusShortcuts.map((group, groupIndex) => (
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
                    ))}
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

            {/* User at the bottom */}
            <div className={`mt-auto ${collapsed ? 'pl-1' : 'px-3 py-2'}`}>
              {status === 'authenticated' && session?.user && (
                <>
                  {collapsed ? (
                    <button
                      aria-describedby={profileId}
                      onClick={handleProfileClick}
                      className="flex items-center justify-center hover:cursor-pointer"
                    >
                      <Avatar
                        alt="Perfil"
                        src={session.user.image || undefined}
                        sx={{
                          width: 30,
                          height: 30,
                        }}
                      >
                        {!session.user.image && (session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U')}
                      </Avatar>
                    </button>
                  ) : (
                    <ProfileButton
                      aria-describedby={profileId}
                      onClick={handleProfileClick}
                      disableRipple
                      sx={{
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                      }}
                    >
                      <Avatar
                        alt="Perfil"
                        src={session.user.image || undefined}
                        sx={{
                          width: 36,
                          height: 36,
                          marginRight: collapsed ? 0 : 2,
                        }}
                      >
                        {!session.user.image && (session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U')}
                      </Avatar>

                      {!collapsed && (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            overflow: 'hidden',
                            maxWidth: 'calc(100% - 52px)', // Ajustar según el tamaño del avatar + margen
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: isDark ? '#fff' : '#000',
                            }}
                          >
                            {session.user.name || 'Usuario'}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              maxWidth: '100%',
                            }}
                          >
                            {session.user.email}
                          </Typography>
                        </Box>
                      )}
                    </ProfileButton>
                  )}

                  <Popover
                    id={profileId}
                    open={profileOpen}
                    anchorEl={profileAnchorEl}
                    onClose={handleProfileClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    sx={{
                      mt: -1,
                      '& .MuiPaper-root': {
                        borderRadius: '1rem',
                        padding: '16px',
                        backgroundColor: isDark ? '#424141' : '#FBFCFD',
                        color: isDark ? '#FFFFFF' : '#000000',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '220px',
                      },
                    }}
                  >
                    <Avatar alt="Perfil" src={session.user.image || undefined} sx={{ width: 56, height: 56, mb: 1 }}>
                      {!session.user.image && (session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U')}
                    </Avatar>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {session.user.name || 'Usuario'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: 'underline',
                        mb: 1,
                        color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                      }}
                    >
                      {session.user.email}
                    </Typography>
                    <LogoutButton
                      onClick={() => signOut()}
                      className={clsx(
                        isDark ? 'dark:text-lightText' : '',
                        'border-buttonsLigth bg-buttonsLigth text-darkText dark:border-darkText dark:bg-darkText',
                      )}
                      variant="contained"
                    >
                      Salir
                    </LogoutButton>
                  </Popover>
                </>
              )}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

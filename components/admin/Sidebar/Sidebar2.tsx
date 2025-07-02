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
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Image from 'next/image';
import { SwaplyArlogoWhiteSidebar } from '@/utils/assets/imgDatabaseCloudinary';

// Create a custom event to communicate sidebar state
export const createSidebarEvent = (isCollapsed: boolean) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('sidebarStateChange', { detail: { isCollapsed } });
    window.dispatchEvent(event);
  }
};

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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

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
  backgroundColor: '#012a8d',
  color: 'white',
  '&:hover': {
    backgroundColor: '#001d5f',
  },
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
          color: 'bg-blue-500/20 text-white',
          iconColor: 'text-blue-300',
          icon: Clock,
          label: 'En Proceso',
          description: 'La transacción sigue su curso',
        },
        {
          id: 'rechazada',
          color: 'bg-red-500/20 text-white',
          iconColor: 'text-red-300',
          icon: XCircle,
          label: 'Rechazada',
          description: 'El cliente solicitó la cancelación y el reembolso',
        },
        {
          id: 'finalizado',
          color: 'bg-green-500/20 text-white',
          iconColor: 'text-green-300',
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
          color: 'bg-amber-500/20 text-white',
          iconColor: 'text-amber-300',
          icon: Edit,
          label: 'Editar',
          description: 'El cliente solicitó editar la solicitud',
        },
        {
          id: 'cancelar',
          color: 'bg-red-500/20 text-white',
          iconColor: 'text-red-300',
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
        className="fixed left-4 top-4 z-40 rounded-md bg-[#012a8d] p-2 text-white shadow-md md:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Status Dropdown for collapsed sidebar */}
      {collapsed && statusDropdownOpen && (
        <div className="fixed left-16 top-1/4 z-50 w-64 rounded-md border border-blue-800 bg-[#012a8d] p-3 shadow-lg">
          <div className="mb-2 flex items-center justify-between border-b border-blue-800 pb-2">
            <span className="font-medium text-white">Atajos de Status</span>
            <button onClick={toggleStatusDropdown} className="rounded-full p-1 text-white hover:bg-blue-800">
              <XCircle size={16} />
            </button>
          </div>
          {statusShortcuts.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-3">
              <h4 className="mb-1 text-xs font-medium text-blue-200">{group.title}</h4>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={createStatusUrl(item.id)}
                      className={`flex items-center rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-blue-800 ${item.color}`}
                      onClick={() => setStatusDropdownOpen(false)}
                    >
                      <item.icon size={16} className={`${item.iconColor} mr-2`} />
                      <span>{item.label}</span>
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
        className={`fixed left-0 top-0 z-40 h-screen border-r border-blue-800 bg-[#012a8d] transition-all duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 ${collapsed ? 'w-16' : 'w-72'}`}
      >
        <div className="flex h-full flex-col">
          {/* Logo and collapse button */}
          <div className="flex h-16 items-center justify-between border-b border-blue-800 px-4">
            {!collapsed && (
              <>
                <Image className="h-8" src={SwaplyArlogoWhiteSidebar} alt="Logo" />
              </>
            )}

            <button
              onClick={toggleSidebar}
              className={`rounded-md p-1.5 text-white hover:bg-blue-800 ${collapsed ? 'mx-auto' : 'ml-auto'}`}
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
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-blue-200">Inicio</h3>
                )}
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      href="/es/admin/transactions"
                      className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                        pathname === '/admin/transactions' || pathname?.startsWith('/admin/transactions')
                          ? 'bg-white/10 font-medium text-white'
                          : 'text-white hover:bg-white/10'
                      } ${collapsed ? 'justify-center' : ''}`}
                    >
                      <CreditCard size={20} className={collapsed ? '' : 'mr-3'} />
                      {!collapsed && <span>Operación de Transacciones</span>}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/es/admin/reports"
                      className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                        pathname === '/admin/reports' || pathname?.startsWith('/admin/reports')
                          ? 'bg-white/10 font-medium text-white'
                          : 'text-white hover:bg-white/10'
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
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-blue-200">Gestión</h3>
                )}
                <ul className="space-y-1.5">
                  <li>
                    <Link
                      href="/es/admin/users"
                      className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                        pathname === '/admin/users' || pathname?.startsWith('/admin/users')
                          ? 'bg-white/10 font-medium text-white'
                          : 'text-white hover:bg-white/10'
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
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-blue-200">Atajos</h3>
                )}

                {!collapsed ? (
                  <div>
                    {statusShortcuts.map((group, groupIndex) => (
                      <div key={groupIndex} className="mb-3">
                        <h4 className="mb-1.5 px-3 text-xs font-medium text-blue-200">{group.title}</h4>
                        <ul className="space-y-1.5">
                          {group.items.map((item) => (
                            <li key={item.id}>
                              <Link
                                href={createStatusUrl(item.id)}
                                className={`flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${item.color} hover:bg-opacity-30 ${collapsed ? 'justify-center' : ''}`}
                              >
                                <item.icon size={20} className={`${item.iconColor} ${collapsed ? '' : 'mr-3'}`} />
                                {!collapsed && <span>{item.label}</span>}
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
                      className={`flex w-full justify-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                        statusDropdownOpen ? 'bg-white/10 text-white' : 'text-white hover:bg-white/10'
                      }`}
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
                              color: 'white',
                            }}
                          >
                            {session.user.name || 'Usuario'}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(255,255,255,0.7)',
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
                        backgroundColor: '#FBFCFD',
                        color: '#000000',
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
                        color: 'rgba(0,0,0,0.7)',
                      }}
                    >
                      {session.user.email}
                    </Typography>
                    <LogoutButton onClick={() => signOut()} variant="contained">
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

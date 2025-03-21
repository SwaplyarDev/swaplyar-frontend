import { signOut } from '@/auth';
import { Avatar, Box, Popover, Typography } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

const UserBotton = ({
  collapsed,
  session,
  profileId,
  handleProfileClick,
  handleProfileClose,
  profileOpen,
  profileAnchorEl,
  isDark,
  ProfileButton,
  LogoutButton,
}: {
  collapsed: boolean;
  session: any;
  profileId: any;
  handleProfileClick: any;
  handleProfileClose: () => void;
  profileOpen: boolean;
  profileAnchorEl: any;
  isDark: boolean;
  ProfileButton: any;
  LogoutButton: any;
}) => {
  return (
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
  );
};

export default UserBotton;

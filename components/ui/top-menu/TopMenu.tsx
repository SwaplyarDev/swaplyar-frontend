// /components/ui/top-menu/TopMenu.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useDarkTheme } from '../theme-Provider/themeProvider';
import useStore from '@/store/authViewStore';

import { Drawer, Sidebar, Navbar } from 'flowbite-react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';

import NavLinks from '@/components/ui/top-menu/nav-links';
import Switch from './switch';
import styled from 'styled-components';
import Image from 'next/image';
import TopPopUp from './topPopUp';
import LogInButton from './log-register-bt/logiInButton';

import { signOut, useSession } from 'next-auth/react';
import RegisterButton from './log-register-bt/registerButton';
import { SwaplyArLogoSolo, SwaplyArLogoComplete } from '@/utils/assets/imgDatabaseCloudinary';
import { swaplyArAvatar } from '@/utils/assets/img-database';
import { Button, Popover, Typography } from '@mui/material';
import clsx from 'clsx';

// Styled components con uso de transient props
const StyledButton = styled.button<{ $isDark: boolean }>`
  background-color: ${({ $isDark }) => ($isDark ? 'var(--dark-bg)' : 'var(--light-bg)')};
  color: ${({ $isDark }) => ($isDark ? 'var(--dark-text)' : 'var(--light-text)')};
  border: 1px solid ${({ $isDark }) => ($isDark ? 'var(--dark-border)' : 'var(--light-border)')};
  &:hover {
    background-color: ${({ $isDark }) => ($isDark ? 'var(--dark-hover)' : 'var(--light-hover)')};
  }
`;

export function TopMenu() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [drawerMenu, setDrawerMenu] = useState(false);

  const { isDark } = useDarkTheme();

  const handleSelect = (item: string) => {
    sessionStorage.setItem('currentView', item);
    setSelectedItem(item);
  };

  useEffect(() => {
    const storage = sessionStorage.getItem('currentView');
    setSelectedItem(storage);
  }, []);

  const { data: session, status } = useSession();

  // Popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [anchorEl1, setAnchorEl1] = React.useState<HTMLButtonElement | null>(null);

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);
  const id1 = open ? 'simple-popover' : undefined;

  // Hasta aca, sacado de MUI

  return (
    <main className="sticky top-0 z-[1000] flex flex-col shadow-md">
      <TopPopUp />

      <Navbar fluid rounded className="sticky py-3 dark:bg-lightText">
        <div className="m-auto flex w-[95%] max-w-screen-2xl flex-row justify-between">
          {/* Botón para iniciar sesión o cerrar sesión */}
          <span className="hidden md:flex lg2:hidden">
            {status === 'authenticated' ? (
              <>
                <Button
                  aria-describedby={id1}
                  variant="contained"
                  onClick={handleClick1}
                  className="h-11 w-11 min-w-[inherit] rounded-full bg-buttonsLigth p-0"
                >
                  <Image src={swaplyArAvatar} alt="profile" width={40} height={40} className="h-11 w-11 rounded-full" />
                </Button>
                <Popover
                  id={id1}
                  open={open1}
                  anchorEl={anchorEl1}
                  onClose={handleClose1}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  sx={{ mt: 1 }}
                  slotProps={{
                    paper: {
                      className:
                        'bg-[#FBFCFD] dark:bg-[#424141] p-2 text-lightText dark:text-darkText rounded-2xl flex flex-col gap-1 items-center', // Aplicando el fondo con slotProps
                    },
                  }}
                >
                  <p>Bienvenido!</p>
                  <p className="text-sm underline">{session?.user?.email}</p>
                  <button
                    onClick={() => signOut()}
                    className={clsx(
                      isDark ? 'buttonSecondDark dark:text-lightText' : 'buttonSecond',
                      'relative m-1 min-h-[38px] w-11/12 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-3 py-1 text-sm text-darkText dark:border-darkText dark:bg-darkText',
                    )}
                  >
                    Salir
                  </button>
                </Popover>
              </>
            ) : (
              <LogInButton />
            )}
          </span>

          {/* Logo */}
          <Navbar.Brand href="/">
            <Image
              alt="Your Company"
              src={SwaplyArLogoComplete}
              width={200}
              height={200}
              className="hidden h-12 w-auto rounded-xl filter dark:brightness-[0%] dark:invert md:block"
            />
            <Image
              alt="Your Company"
              src={SwaplyArLogoSolo}
              width={200}
              height={200}
              className="h-12 w-auto rounded-xl filter dark:brightness-[0%] dark:invert md:hidden"
            />
          </Navbar.Brand>

          {/* Navegación */}
          <nav className="flex flex-row items-center justify-center">
            <section className="flex items-center justify-end gap-4 lg2:pr-2">
              <Switch />
              <button onClick={() => setDrawerMenu(true)} className="block lg2:hidden">
                <GiHamburgerMenu className="size-8 text-lightText dark:text-darkText" />
              </button>
            </section>

            {/* Menú desplegable */}
            <Drawer
              open={drawerMenu}
              onClose={() => setDrawerMenu(false)}
              position="right"
              className="h-full w-full max-w-full transform transition-all duration-500 ease-in-out xs-mini-phone2:w-[inherit] xs-mini-phone2:max-w-[80%]"
            >
              <Drawer.Header
                title=""
                titleIcon={() => <></>}
                closeIcon={() => <MdOutlineClose className="size-7 text-blue-800 dark:text-sky-500" />}
                className="flex items-center text-lg font-bold [&>button]:top-4"
              />
              <Drawer.Items>
                <Sidebar
                  aria-label="Sidebar with content separator example"
                  className="h-[92vh] w-full text-center [&>div]:bg-transparent [&>div]:p-0"
                >
                  <Sidebar.Items className="flex h-full w-full flex-col justify-between pt-5">
                    <div className="md:hidden">
                      {status === 'authenticated' && (
                        <div className="flex items-center">
                          <div className="h-11 w-11 min-w-[inherit] rounded-full bg-buttonsLigth p-0">
                            <Image
                              src={swaplyArAvatar}
                              alt="profile"
                              width={40}
                              height={40}
                              className="h-11 w-11 rounded-full"
                            />
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="ml-5 text-2xl">Bienvenido!</p>
                            <p className="ml-5 text-sm underline">{session?.user?.email}</p>
                          </div>
                        </div>
                      )}
                      <Sidebar.ItemGroup className="w-full bg-inherit text-left">
                        <Sidebar.Item
                          className={`text-buttonsLigth ${
                            selectedItem === 'about-us'
                              ? 'h-10 bg-gray-100 dark:bg-gray-700'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => handleSelect('about-us')}
                          href="/info/about-us"
                        >
                          Quienes Somos
                        </Sidebar.Item>
                        <Sidebar.Item
                          className={`text-buttonsLigth ${
                            selectedItem === 'how-to-use'
                              ? 'h-10 bg-gray-100 dark:bg-gray-700'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => handleSelect('how-to-use')}
                          href="/info/how-to-use"
                        >
                          Como Usar SwaplyAr
                        </Sidebar.Item>
                        <Sidebar.Item
                          className={`text-buttonsLigth ${
                            selectedItem === 'loyalty-program'
                              ? 'h-10 bg-gray-100 dark:bg-gray-700'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => handleSelect('loyalty-program')}
                          href="/info/loyalty-program"
                        >
                          Programa de Fidelización
                        </Sidebar.Item>
                      </Sidebar.ItemGroup>
                    </div>
                    <Sidebar.ItemGroup className="mt-0 hidden w-full border-t-0 bg-inherit pt-0 text-left md:block">
                      <Sidebar.Item
                        className={`text-buttonsLigth ${
                          selectedItem === 'about-us'
                            ? 'h-10 bg-gray-100 dark:bg-gray-700'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleSelect('about-us')}
                        href="/info/about-us"
                      >
                        Quienes Somos
                      </Sidebar.Item>
                      <Sidebar.Item
                        className={`text-buttonsLigth ${
                          selectedItem === 'how-to-use'
                            ? 'h-10 bg-gray-100 dark:bg-gray-700'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleSelect('how-to-use')}
                        href="/info/how-to-use"
                      >
                        Como Usar SwaplyAr
                      </Sidebar.Item>
                      <Sidebar.Item
                        className={`text-buttonsLigth ${
                          selectedItem === 'loyalty-program'
                            ? 'h-10 bg-gray-100 dark:bg-gray-700'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleSelect('loyalty-program')}
                        href="/info/loyalty-program"
                      >
                        Programa de Fidelización
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup className="w-full bg-inherit">
                      {status === 'authenticated' ? (
                        <button
                          onClick={() => signOut()}
                          className={clsx(
                            isDark ? 'buttonSecondDark dark:text-lightText' : 'buttonSecond',
                            'relative m-1 min-h-[38px] w-11/12 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-3 py-1 text-sm text-darkText dark:border-darkText dark:bg-darkText',
                          )}
                        >
                          Salir
                        </button>
                      ) : (
                        <>
                          <div className="flex flex-col md:hidden">
                            <LogInButton />
                          </div>
                          <div className="flex flex-col">
                            <RegisterButton />
                          </div>
                        </>
                      )}
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </Sidebar>
              </Drawer.Items>
            </Drawer>

            {/* Navegación completa */}
            <section className="hidden lg2:flex lg2:gap-2">
              <NavLinks />
              {status === 'authenticated' ? (
                <>
                  <Button
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}
                    className="h-11 w-11 min-w-[inherit] rounded-full bg-buttonsLigth p-0"
                  >
                    <Image
                      src={swaplyArAvatar}
                      alt="profile"
                      width={40}
                      height={40}
                      className="h-11 w-11 rounded-full"
                    />
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{ mt: 1 }}
                    slotProps={{
                      paper: {
                        className:
                          'bg-[#FBFCFD] dark:bg-[#424141] p-2 text-lightText dark:text-darkText rounded-2xl flex flex-col gap-1 items-center', // Aplicando el fondo con slotProps
                      },
                    }}
                  >
                    <p>Bienvenido!</p>
                    <p className="text-sm underline">{session?.user?.email}</p>
                    <button
                      onClick={() => signOut()}
                      className={clsx(
                        isDark ? 'buttonSecondDark dark:text-lightText' : 'buttonSecond',
                        'relative m-1 min-h-[38px] w-11/12 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-3 py-1 text-sm text-darkText dark:border-darkText dark:bg-darkText',
                      )}
                    >
                      Salir
                    </button>
                  </Popover>
                </>
              ) : (
                <>
                  <LogInButton />
                  <RegisterButton />
                </>
              )}
            </section>
          </nav>
        </div>
      </Navbar>
    </main>
  );
}

'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDarkTheme } from '../../ui/theme-Provider/themeProvider';
import { MdOutlineClose } from 'react-icons/md';
import NavLinks from '@/components/ui/top-menu/nav-links';
import Image from 'next/image';

import Switch from '@/components/ui/top-menu/switch';
import { swaplyArAvatar, SwaplyArLogoComplete, SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';
import { Button, Popover } from '@mui/material';
import clsx from 'clsx';
import { Drawer, Navbar, Sidebar } from 'flowbite-react';
import { signOut, useSession } from 'next-auth/react';
import ShortButton from '@/components/ui/NewButtons/ShortButton';
import { Menu } from 'lucide-react';
import LogoSwaplyMobile from '@/public/LogoSwaplyMobile.svg'

// Array de enlaces de navegación
const NAVIGATION_LINKS = [
  {
    id: 'about-us',
    label: 'Quienes Somos',
    href: '/es/quienes-somos',
  },
  {
    id: 'how-to-use',
    label: 'Como Usar SwaplyAr',
    href: '/es/como-usar-swaplyar',
  },
  {
    id: 'loyalty-program',
    label: 'Programa de Fidelización',
    href: '/es/programa-de-fidelizacion',
  },
];

const NavbarLanding = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [drawerMenu, setDrawerMenu] = useState(false);

  useEffect(() => {
    if (drawerMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerMenu]);

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

  const closeDrawer = () => {
    setDrawerMenu(false);
  };

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

  return (
    <div className="w-full mx-auto px-[10px] py-1 h-[48.5px] sm-phone:h-[57px] sm-phone:px-[14px] navbar-desktop:h-[68px] navbar-desktop:max-w-screen-desktop navbar-desktop:px-4 navbar-desktop:py-[10px]">
      <Navbar
        fluid
        rounded
        className="sticky mx-auto w-full h-full bg-custom-whiteD-500 dark:bg-lightText !p-0 navbar-landing"
      >
        <div className="flex w-full h-full flex-row p-0 justify-between items-center">
          {/* Botón para iniciar sesión o cerrar sesión */}
          <span className="hidden sm-phone:flex sm-phone:max-w-[156px] sm-phone:h-[41px] navbar-desktop:hidden">
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
                <ShortButton
                  href="/es/iniciar-sesion"
                  text="Iniciar sesión"
                  onButtonClick={closeDrawer}
                  fondoOscuro={false}
                  className='!h-full'
                />
            )}
          </span>

          {/* Logo */}
          <Navbar.Brand href="/" className='h-full navbar-desktop:h-[46px] sm-phone:h-[45px]'>
            <Image
              alt="SwaplyAr Logo"
              src={SwaplyArLogoComplete}
              width={300}
              height={200}
              className="hidden h-[46px] w-auto rounded-xl filter dark:brightness-[0%] dark:invert sm-phone:block"
            />
            {/* <Image
              alt="SwaplyAr Logo"
              src={SwaplyArLogoSolo}
              width={200}
              height={200}
              className="h-12 w-auto scale-90 rounded-xl filter dark:brightness-[0%] dark:invert md:hidden"
              /> */}
            <Image
              src={LogoSwaplyMobile}
              alt="SwaplyAr Logo"
              width={40}
              height={40}
              className="h-9 w-auto scale-90 rounded-xl filter dark:brightness-[0%] dark:invert sm-phone:hidden"
            />
            
          </Navbar.Brand>

          {/* Navegación */}
          <nav className="flex flex-row items-center justify-center h-full">
            <section className="flex items-center justify-end gap-3 navbar-desktop:pr-2">
              <Switch />
              <button onClick={() => setDrawerMenu(true)} className="block navbar-desktop:hidden">
                <Menu className="size-6 stroke-[2.5px] sm-phone:stroke-[3px] sm-phone:size-9 text-custom-blue dark:text-darkText" />
              </button>
            </section>

            {/* Menú desplegable */}
            <Drawer
              open={drawerMenu}
              onClose={closeDrawer}
              position="right"
              className="flex h-full w-full max-w-full transform flex-col items-center justify-between transition-all duration-500 ease-in-out xs-mini-phone2:w-[inherit] xs-mini-phone2:max-w-[80%]"
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
                    <div className="sm-phone:hidden">
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
                            {session?.user?.role === 'admin' ? (
                              <Link href={'/admin/transactions'}>
                                <p className="text-blue-600 underline decoration-white transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 active:text-blue-900">
                                  Administración
                                </p>
                              </Link>
                            ) : null}
                          </div>
                        </div>
                      )}
                      <Sidebar.ItemGroup className="w-full bg-inherit text-left">
                        {NAVIGATION_LINKS.map((link) => (
                          <Sidebar.Item
                            key={link.id}
                            className={`text-buttonsLigth ${
                              selectedItem === link.id
                                ? 'h-10 bg-gray-100 dark:bg-gray-700'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => handleSelect(link.id)}
                            href={link.href}
                          >
                            {link.label}
                          </Sidebar.Item>
                        ))}
                      </Sidebar.ItemGroup>
                    </div>
                    <Sidebar.ItemGroup className="mt-0 hidden w-full border-t-0 bg-inherit pt-0 text-left sm-phone:block">
                      {NAVIGATION_LINKS.map((link) => (
                        <Sidebar.Item
                          key={link.id}
                          className={`text-buttonsLigth ${
                            selectedItem === link.id
                              ? 'h-10 bg-gray-100 dark:bg-gray-700'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          onClick={() => handleSelect(link.id)}
                          href={link.href}
                        >
                          {link.label}
                        </Sidebar.Item>
                      ))}
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup className="w-full bg-inherit">
                      {status === 'authenticated' ? (
                        <button
                          onClick={() => {
                            signOut();
                            closeDrawer();
                          }}
                          className={clsx(
                            isDark ? 'buttonSecondDark dark:text-lightText' : 'buttonSecond',
                            'relative m-1 min-h-[38px] w-11/12 items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth px-3 py-1 text-sm text-darkText dark:border-darkText dark:bg-darkText',
                          )}
                        >
                          Salir
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="flex flex-col sm-phone:hidden">
                            <ShortButton
                              href="/es/iniciar-sesion"
                              text="Iniciar sesión"
                              onButtonClick={closeDrawer}
                              fondoOscuro={false}
                            />
                          </div>
                          <div className="flex h-[60px] flex-col">
                            <ShortButton
                              href="/es/registro"
                              text="Registrarse"
                              onButtonClick={closeDrawer}
                              fondoOscuro={true}
                            />
                          </div>
                        </div>
                      )}
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </Sidebar>
              </Drawer.Items>
            </Drawer>

            {/* Navegación completa */}
            <section className="hidden navbar-desktop:flex navbar-desktop:items-center navbar-desktop:gap-2">
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
                    {session?.user?.role === 'admin' ? (
                      <Link href={'/admin/transactions'}>
                        <p className="text-blue-600 underline decoration-white transition-all duration-150 hover:text-blue-800 hover:decoration-blue-800 active:text-blue-900">
                          Administración
                        </p>
                      </Link>
                    ) : null}
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
                <div className="flex gap-2 max-w-[294px]">
                  <ShortButton
                    href="/es/iniciar-sesion"
                    text="Iniciar sesión"
                    onButtonClick={closeDrawer}
                    fondoOscuro={false}
                  />
                  <ShortButton
                    href="/es/registro"
                    text="Registrarse"
                    onButtonClick={closeDrawer}
                    fondoOscuro={true}
                  />
                </div>
              )}
            </section>
          </nav>
        </div>
      </Navbar>
    </div>
  );
};

export default NavbarLanding;

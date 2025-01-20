// /components/ui/top-menu/TopMenu.tsx

'use client';

import { useState, useEffect } from 'react';
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

  const { setView } = useStore();
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

  return (
    <main className="sticky top-0 z-[1000] flex flex-col shadow-md">
      <TopPopUp />

      <Navbar fluid rounded className="sticky px-4 py-3 dark:bg-lightText md:px-8 lg:px-4">
        <div className="m-auto flex w-full max-w-[1204px] flex-row justify-between">
          {/* Botón para iniciar sesión o cerrar sesión */}
          <span className="hidden md:flex lg:hidden">
            {status === 'authenticated' ? (
              <StyledButton
                $isDark={isDark}
                onClick={() => signOut()}
                className="relative m-1 h-[48px] items-center justify-center rounded-3xl p-3"
              >
                Salir
              </StyledButton>
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
            <section className="flex items-center justify-end gap-4 lg:pr-2">
              <Switch />
              <button onClick={() => setDrawerMenu(true)} className="block lg:hidden">
                <GiHamburgerMenu className="size-8 text-lightText dark:text-darkText" />
              </button>
            </section>

            {/* Menú desplegable */}
            <Drawer
              open={drawerMenu}
              onClose={() => setDrawerMenu(false)}
              position="right"
              className="h-full max-w-[80%] transform transition-all duration-500 ease-in-out"
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
                  className="m-auto h-[92vh] text-center [&>div]:bg-transparent [&>div]:p-0"
                >
                  <Sidebar.Items className="flex h-full w-full flex-col justify-between pt-5">
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
                    </Sidebar.ItemGroup>
                  </Sidebar.Items>
                </Sidebar>
              </Drawer.Items>
            </Drawer>

            {/* Navegación completa */}
            <section className="hidden lg:flex lg:gap-2">
              <NavLinks />
              {status === 'authenticated' ? (
                <>
                  <div>
                    <p>Bienvenido!</p>
                    <p>{session?.user?.email}</p>
                  </div>
                  <StyledButton
                    $isDark={isDark}
                    onClick={() => signOut()}
                    className="relative m-1 h-[48px] items-center justify-center rounded-3xl p-3"
                  >
                    Salir
                  </StyledButton>
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

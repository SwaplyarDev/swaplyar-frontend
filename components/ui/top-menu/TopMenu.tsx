// /components/ui/top-menu/TopMenu.tsx

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useStore from '@/store/authViewStore';

import { Drawer, Sidebar, Navbar } from 'flowbite-react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsChevronRight } from 'react-icons/bs';

import NavLinks from '@/components/ui/top-menu/nav-links';
import Switch from './switch';
import Image from 'next/image';
import Link from 'next/link';
import S from '../../../public/images/logo-solo.png';

export function TopMenu() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [bgOpacity, setBgOpacity] = useState(false);

  const [drawerMenu, setDrawerMenu] = useState(false);

  const { setView } = useStore();

  const pathname = usePathname();

  const handleSelect = (item: string) => {
    sessionStorage.setItem('currentView', item);
    setSelectedItem(item);
  };

  useEffect(() => {
    const storage = sessionStorage.getItem('currentView');
    setSelectedItem(storage);

    const handleScroll = () => {
      setBgOpacity(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <Navbar
      fluid
      rounded
      className={`sticky top-0 z-50 py-6 shadow-md transition-opacity duration-200 dark:bg-lightText ${
        bgOpacity
          ? 'bg-opacity-80 dark:bg-opacity-80'
          : 'bg-opacity-100 dark:bg-opacity-100'
      }`}
    >
      <div className="m-auto flex w-full max-w-screen-2xl flex-row justify-between">
        <Link
          key="Iniciar sesión"
          href="/auth/login-register"
          onClick={() => setView('login')}
          className={`relative m-1 hidden h-[48px] items-center gap-2 rounded-3xl border border-lightText p-3 transition-transform duration-300 ease-in-out hover:scale-105 dark:border-darkText md:flex lg:hidden ${pathname === '/auth/login-register' ? 'underline decoration-lightText dark:decoration-darkText' : ''} `}
        >
          <p className="font-bold">Iniciar sesión</p>
        </Link>

        <Navbar.Brand href="/">
          <Image
            alt="Your Company"
            src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
            width={200}
            height={200}
            className="hidden h-12 w-auto rounded-xl filter hover:outline hover:outline-[1px] hover:outline-offset-4 hover:outline-slate-500 dark:brightness-[0%] dark:invert dark:hover:outline-darkText md:block"
          />
          <Image
            alt="Your Company"
            src={S}
            width={200}
            height={200}
            className="h-12 w-auto rounded-xl filter hover:outline hover:outline-[1px] hover:outline-offset-4 hover:outline-slate-500 dark:brightness-[0%] dark:invert dark:hover:outline-darkText md:hidden"
          />
        </Navbar.Brand>

        <nav className="flex flex-row items-center justify-center">
          <section className="flex items-center justify-end gap-5">
            <Switch/>
            <button
              onClick={() => setDrawerMenu(true)}
              className="block lg:hidden"
            >
              <GiHamburgerMenu className="size-8 text-lightText dark:text-darkText" />
            </button>
          </section>

          <Drawer
            open={drawerMenu}
            onClose={() => setDrawerMenu(false)}
            position="right"
          >
            <Drawer.Header title="Menu" titleIcon={() => <></>} />
            <Drawer.Items className="h-[90vh]">
              <Sidebar aria-label="Sidebar with content separator example">
                <Sidebar.Items className="flex h-full flex-col justify-between">
                  <Sidebar.ItemGroup>
                    <Sidebar.Item
                      className={`cursor-pointer ${
                        selectedItem === 'about-us'
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handleSelect('about-us')}
                      href="/info/about-us"
                    >
                      Quienes Somos
                    </Sidebar.Item>

                    <Sidebar.Item
                      className={`cursor-pointer ${
                        selectedItem === 'how-to-use'
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handleSelect('how-to-use')}
                      href="/info/how-to-use"
                    >
                      Como Usar Swaplyar
                    </Sidebar.Item>

                    <Sidebar.Item
                      className={`cursor-pointer ${
                        selectedItem === 'loyalty-program'
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => handleSelect('loyalty-program')}
                      href="/info/loyalty-program"
                    >
                      Programa de Fidelización
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>

                  <Sidebar.ItemGroup className="block md:hidden">
                    <Sidebar.Item
                      className={`flex cursor-pointer items-center gap-2 rounded-3xl border border-lightText p-3 text-center dark:border-darkText`}
                      onClick={() => {
                        handleSelect('login');
                        setView('login');
                        setDrawerMenu(false);
                      }}
                      href="/auth/login-register"
                    >
                      Iniciar sesión
                    </Sidebar.Item>

                    <Sidebar.Item
                      className={`flex cursor-pointer items-center gap-2 rounded-3xl border border-lightText bg-lightText p-3 text-center text-darkText dark:border-darkText dark:bg-darkText dark:text-lightText`}
                      onClick={() => {
                        handleSelect('register');
                        setView('register');
                        setDrawerMenu(false);
                      }}
                      href="/auth/login-register"
                    >
                      Registrarse
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </Sidebar>
            </Drawer.Items>
          </Drawer>

          <section className="hidden lg:flex">
            <NavLinks />
          </section>
        </nav>
      </div>
    </Navbar>
  );
}

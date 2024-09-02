// /components/ui/top-menu/TopMenu.tsx

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import useStore from '@/store/authViewStore';

import { Dropdown, Navbar } from 'flowbite-react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsChevronRight } from 'react-icons/bs';

import NavLinks from '@/components/ui/top-menu/nav-links';
import Image from 'next/image';
import Link from 'next/link';
import styles from './switchStyle.module.css';
import S from '../../../public/images/logo-solo.png';

export function TopMenu() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [bgOpacity, setBgOpacity] = useState(false);

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

  const { changeTheme, isDark } = useDarkTheme();

  return (
    <Navbar
      fluid
      rounded
      className={`sticky top-0 z-50 w-full p-6 dark:bg-lightText shadow-md transition-opacity duration-200 ${
        bgOpacity
          ? 'bg-opacity-80 dark:bg-opacity-80'
          : 'bg-opacity-100 dark:bg-opacity-100'
      }`}
    >
      <div
        className="m-auto flex w-full max-w-screen-2xl flex-row-reverse justify-between gap-4 lg:flex-row"
      >
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

        <nav className="flex flex-row-reverse items-center justify-center lg:flex-row">
          <section className="flex items-center justify-end">
            <label className={`${styles.switch} mx-2`}>
              <input type="checkbox" onClick={changeTheme} />
              <span
                className={isDark ? styles.sliderDark : styles.sliderLight}
              ></span>
            </label>
          </section>

          <section className="flex lg:hidden">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <GiHamburgerMenu className="size-8 text-gray-800 dark:text-gray-200" />
              }
            >
              <Dropdown.Item
                className={`cursor-pointer ${
                  selectedItem === 'about-us'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleSelect('about-us')}
              >
                <Link href="/info/about-us" className="flex items-center">
                  <BsChevronRight />
                  Quienes Somos
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className={`cursor-pointer ${
                  selectedItem === 'how-to-use'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleSelect('how-to-use')}
              >
                <Link href="/info/how-to-use" className="flex items-center">
                  <BsChevronRight />
                  Como Usar Swaplyar
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className={`cursor-pointer ${
                  selectedItem === 'loyalty-program'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleSelect('loyalty-program')}
              >
                <Link
                  href="/info/loyalty-program"
                  className="flex items-center"
                >
                  <BsChevronRight />
                  Programa de Fidelización
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <section className="md:hidden">
                <Dropdown.Item
                  className={`cursor-pointer ${
                    selectedItem === 'login'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleSelect('login')}
                >
                  <Link
                    href="/auth/login-register"
                    onClick={() => setView('login')}
                    className="flex items-center"
                  >
                    <BsChevronRight />
                    Login
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  className={`cursor-pointer ${
                    selectedItem === 'register'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => handleSelect('register')}
                >
                  <Link
                    href="/auth/login-register"
                    onClick={() => setView('register')}
                    className="flex items-center"
                  >
                    <BsChevronRight />
                    Register
                  </Link>
                </Dropdown.Item>
              </section>
            </Dropdown>
          </section>

          <section className="hidden lg:flex">
            <NavLinks />
          </section>
        </nav>
      </div>
    </Navbar>
  );
}

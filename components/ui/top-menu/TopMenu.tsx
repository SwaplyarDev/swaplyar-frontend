// /components/ui/top-menu/TopMenu.tsx

'use client';

import { useState } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import NavLinks from '@/components/ui/nav-links';
import Image from 'next/image';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import useStore from '@/store/store';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import styles from './switchStyle.module.css';
import { usePathname } from 'next/navigation';

export function TopMenu() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { setView } = useStore();

  const pathname = usePathname();

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  const handleChange = () => {
    setView('register');
  };

  const { changeTheme, isDark } = useDarkTheme();

  return (
    <Navbar fluid rounded className="p-4 shadow-md">
      <div className="flex w-full flex-row-reverse justify-between lg:flex-row">
        <Link
          key="Iniciar sesión"
          href="/auth/login-register"
          onClick={() => setView('login')}
          className={`hidden relative md:flex lg:hidden h-[48px] items-center gap-2 rounded-md p-3 ${pathname === '/auth/login-register' ? 'border-2 border-sky-200 bg-gray-500 text-white' : 'text-gray-900'} m-1 transition-colors duration-300 ease-in-out hover:bg-gray-600 hover:text-white hover:shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
        >
          <p
            className="font-bold"
          >
            Iniciar sesión
          </p>
        </Link>

        <Navbar.Brand href="/">
          <Image
            alt="Your Company"
            src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
            width={200}
            height={200}
            className="h-12 w-auto filter dark:brightness-[300%]"
          />
        </Navbar.Brand>
        <nav className="flex flex-row-reverse items-center justify-center lg:flex-row">
          <section className="flex items-center justify-end">
            <label className={`${styles.switch} ml-3`}>
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
                <Link href="/info/about-us">Quienes Somos</Link>
              </Dropdown.Item>
              <Dropdown.Item
                className={`cursor-pointer ${
                  selectedItem === 'how-to-use'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleSelect('how-to-use')}
              >
                <Link href="/info/how-to-use">Como Usar Swaplyar</Link>
              </Dropdown.Item>
              <Dropdown.Item
                className={`cursor-pointer ${
                  selectedItem === 'loyalty-program'
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleSelect('loyalty-program')}
              >
                <Link href="/info/loyalty-program">
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
                  >
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
                  >
                    Register
                  </Link>
                </Dropdown.Item>
              </section>
            </Dropdown>
          </section>

          <Navbar.Collapse>
            <section className="hidden lg:flex">
              <NavLinks />
            </section>
          </Navbar.Collapse>
        </nav>
      </div>
    </Navbar>
  );
}

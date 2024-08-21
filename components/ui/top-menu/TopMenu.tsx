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

export function TopMenu() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { setView } = useStore();

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  const handleChange = () => {
    setView('register');
  };
  const { changeTheme, isDark } = useDarkTheme();

  return (
    <Navbar fluid rounded className="bg-white p-4 shadow-md dark:bg-gray-800">
      <Navbar.Brand href="/">
        <Image
          alt="Your Company"
          src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
          width={200}
          height={200}
          className="h-12 w-auto filter dark:brightness-[300%]"
        />
      </Navbar.Brand>
      <div className="flex items-center justify-center">

        <section className="flex items-center justify-end">
          <label className={`${styles.switch} m-3 lg:-mr-5 `}>
            <input type="checkbox" onClick={changeTheme} />
            <span className={isDark ? styles.sliderDark : styles.sliderLight}></span>
          </label>
        </section>

        <div className="flex lg:hidden">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <GiHamburgerMenu className="h-8 w-8 text-gray-800 dark:text-gray-200" />
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
              <Link href="/info/loyalty-program">Programa de Fidelización</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <section className='md:hidden'>

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

        </div>

        <Navbar.Collapse>
          <div className="hidden lg:ml-6 lg:flex">
            <NavLinks />
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

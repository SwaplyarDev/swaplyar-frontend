// /components/ui/top-menu/TopMenu.tsx

'use client';

import { useState } from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import NavLinks from '@/components/ui/nav-links';
import Image from 'next/image';
import Link from 'next/link';
import styled from '@emotion/styled';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import useStore from '@/store/authViewStore';

const MenuIcon = styled(GiHamburgerMenu)`
  width: 30px;
  height: 30px;
  color: #333;
  cursor: pointer;

  &:hover {
    color: #007BFF;
  }
`;

const StyledNavbar = styled(Navbar)`
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100px;
  padding:0.5%;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  width: 100%;


  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto; 
  
  }

  .navbar-brand {
    display: flex;
    align-items: center;
  }

  .navbar-collapse {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .navbar-toggler {
    border: none;
    background: none;
    font-size: 1.5rem;
  }

  .dropdown-item {
    font-size: 0.9rem;
  }
`;

export function TopMenu() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { setView } = useStore();

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  const { changeTheme, isDark } = useDarkTheme();

  return (
    <StyledNavbar fluid rounded className="bg-white p-4 shadow-md dark:bg-gray-800">
<div className='navbar-content'>
<Navbar.Brand href="/" className='navbar-brand'>
        <Image
          alt="Your Company"
          src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
          width={200}
          height={200}
          className="h-12 w-auto"
        />
      </Navbar.Brand>
      <div className="flex items-center">
        <section className="flex items-center justify-end">
          <button
            className="mr-1 rounded-md p-3 transition-colors duration-300 ease-in-out hover:bg-gray-600 hover:text-white hover:shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white dark:hover:text-black md:-mr-2"
            onClick={changeTheme}
          >
            {isDark ? (
              <SunIcon className="size-6" />
            ) : (
              <MoonIcon className="size-6" />
            )}
          </button>
        </section>
        <div className="flex md:hidden">
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
          </Dropdown>
        </div>

        <Navbar.Collapse className='navbar-collapse'>
          <div className="hidden md:ml-6 md:flex">
            <NavLinks />
          </div>
        </Navbar.Collapse>
      </div>
</div>
    </StyledNavbar>
  );
}

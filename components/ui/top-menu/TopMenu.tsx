"use client";

import { useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import NavLinks from '@/components/ui/nav-links';
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from 'react-icons/gi';

export function TopMenu() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <Navbar fluid rounded className="bg-white dark:bg-gray-800 shadow-md p-4">
      <Navbar.Brand href="/">
        <Image
          alt="Your Company"
          src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
          width={200}
          height={200}
          className="h-12 w-auto"
        />
      </Navbar.Brand>
      <div className="flex items-center">
        <div className="flex md:hidden">
          <Dropdown
            arrowIcon={false}
            inline
            label={<GiHamburgerMenu className="w-8 h-8 text-gray-800 dark:text-gray-200" />}
          >
            <Dropdown.Item
              className={`cursor-pointer ${
                selectedItem === 'about-us' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleSelect('about-us')}
            >
              <Link href="/info/about-us">Quienes Somos</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={`cursor-pointer ${
                selectedItem === 'how-to-use' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleSelect('how-to-use')}
            >
              <Link href="/info/how-to-use">Como Usar Swaplyar</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={`cursor-pointer ${
                selectedItem === 'loyalty-program' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleSelect('loyalty-program')}
            >
              <Link href="/info/loyalty-program">Programa de Fidelización</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              className={`cursor-pointer ${
                selectedItem === 'login' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleSelect('login')}
            >
              <Link href="/auth/login">Login</Link>
            </Dropdown.Item>
            <Dropdown.Item
              className={`cursor-pointer ${
                selectedItem === 'register' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleSelect('register')}
            >
              <Link href="/auth/new-account">Register</Link>
            </Dropdown.Item>
          </Dropdown>
        </div>

        <Navbar.Collapse>
          <div className="hidden md:flex md:ml-6">
            <NavLinks />
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}


"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import NavLinks from '@/components/ui/nav-links';
import Image from "next/image";
import Link from "next/link";
import styled from '@emotion/styled';
import { GiHamburgerMenu } from 'react-icons/gi';

const MenuIcon = styled(GiHamburgerMenu)`
    width: 30px;
    height: 30px;
    color: #333; // Customize the color
    cursor: pointer; // Add pointer cursor on hover

    &:hover {
        color: #555; // Change color on hover
    }
`;

export function TopMenu () {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
          <Image
            alt="Your Company"
            src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
            width={200}
            height={200}
            className="h-12 w-auto"
          />
      </Navbar.Brand>
      <div>
        <div className="flex md:hidden">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <MenuIcon />
            }
          >

            <Dropdown.Item>
              <Link href="/info/about-us">Quienes Somos</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/info/how-to-use">Como Usar Swaplyar</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/info/loyalty-program">Programa de Fidelizacion</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link href="/auth/login">login</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/auth/new-account">register</Link>
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















          {/* <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header> */}
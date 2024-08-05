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
    color: #333;
    cursor: pointer;

    &:hover {
        color: #007BFF;
    }
`;

const StyledNavbar = styled(Navbar)`
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;

  .navbar-brand {
    display: flex;
    align-items: center;
    margin-left: 2em; 
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
  return (
    <StyledNavbar fluid rounded>
      <Navbar.Brand href="/">
        <Image
          alt="Your Company"
          src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
          width={200}
          height={200}
          className="h-12 w-auto navbar-brand"
        />
      </Navbar.Brand>
      <div className="flex items-center">
        <div className="flex md:hidden">
          <Dropdown
            arrowIcon={false}
            inline
            label={<MenuIcon />}
          >
            <Dropdown.Item >
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
              <Link href="/auth/login">Login</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/auth/new-account" >Register</Link>
            </Dropdown.Item>
          </Dropdown>
        </div>

        <Navbar.Collapse>
          <div className="hidden md:flex md:ml-6">
            <NavLinks />
          </div>
        </Navbar.Collapse>
      </div>
    </StyledNavbar>
  );
}















          {/* <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header> */}
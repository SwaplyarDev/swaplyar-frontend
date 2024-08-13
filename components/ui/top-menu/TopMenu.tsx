"use client";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import NavLinks from '@/components/ui/nav-links';
import Image from "next/image";
import Link from "next/link";
import styled from '@emotion/styled';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from "react";

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
  padding: 1.5rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  width: 100%;


  .navbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto; 
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

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <StyledNavbar fluid rounded >
      <div className="navbar-content">
        <Navbar.Brand href="/">
          <Image
            alt="Your Company"
            src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
            width={200}
            height={200}
            className="h-12 w-auto navbar-brand"
          />
        </Navbar.Brand>
        <div className="flex ">
          <div className="flex md:hidden">
            <Dropdown
              arrowIcon={false}
              inline
              label={<MenuIcon />}
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
                <Link href="/auth/login">Login</Link>
              </Dropdown.Item>
              <Dropdown.Item>
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
      </div>
    </StyledNavbar>

  );
}

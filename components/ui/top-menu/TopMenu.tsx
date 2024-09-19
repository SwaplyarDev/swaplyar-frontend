// /components/ui/top-menu/TopMenu.tsx

'use client';

import { useState, useEffect } from 'react';
import useStore from '@/store/authViewStore';

import { Drawer, Sidebar, Navbar } from 'flowbite-react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineClose } from 'react-icons/md';

import NavLinks from '@/components/ui/top-menu/nav-links';
import Switch from './switch';
import Image from 'next/image';
import S from '../../../public/images/logo-solo.png';
import TopPopUp from './topPopUp';

import LogInButton from './log-register-bt/LogInButton/logiInButton';
import logStyles from './log-register-bt/LogInButton/logInButtonAnimation.module.css';
import rgStyles from './log-register-bt/RegisterButton/registerButton.module.css';

export function TopMenu() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [drawerMenu, setDrawerMenu] = useState(false);

  const { setView } = useStore();

  const handleSelect = (item: string) => {
    sessionStorage.setItem('currentView', item);
    setSelectedItem(item);
  };

  useEffect(() => {
    const storage = sessionStorage.getItem('currentView');
    setSelectedItem(storage);
  }, []);

  return (
    <main className="sticky top-0 z-[1000] flex flex-col shadow-md">
      <TopPopUp />

      <Navbar
        fluid
        rounded
        className={`sticky py-3 dark:bg-lightText`} // dejar el sticky para no romper la animacion del log in
      >
        <div className="m-auto flex w-[95%] max-w-screen-2xl flex-row justify-between">
          <span className="hidden md:flex lg:hidden">
            <LogInButton />
          </span>

          <Navbar.Brand href="/">
            <Image
              alt="Your Company"
              src="https://res.cloudinary.com/df5jwzuq9/image/upload/v1722209853/logo_g74htq.png"
              width={200}
              height={200}
              className="hidden h-12 w-auto rounded-xl filter dark:brightness-[0%] dark:invert md:block"
            />
            <Image
              alt="Your Company"
              src={S}
              width={200}
              height={200}
              className="h-12 w-auto rounded-xl filter dark:brightness-[0%] dark:invert md:hidden"
            />
          </Navbar.Brand>

          <nav className="flex flex-row items-center justify-center">
            <section className="flex items-center justify-end gap-4 lg:pr-2">
              <Switch />
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
              className="h-full max-w-[80%] transform transition-all duration-500 ease-in-out"
            >
              <Drawer.Header
                title=""
                titleIcon={() => <></>}
                closeIcon={() => (
                  <MdOutlineClose className="size-7 text-blue-800 dark:text-sky-500" />
                )}
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
                        className={`text-blue-500 ${
                          selectedItem === 'about-us'
                            ? 'h-10 bg-gray-100 dark:bg-gray-700'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleSelect('about-us')}
                        href="/info/about-us"
                      >
                        <div
                          className={`${
                            selectedItem === 'about-us'
                              ? 'bg-blue-800 dark:bg-sky-500'
                              : ''
                          } absolute left-0 -mt-2 h-10 w-2 rounded-r-md`}
                        ></div>
                        Quienes Somos
                      </Sidebar.Item>

                      <Sidebar.Item
                        className={`text-blue-500 ${
                          selectedItem === 'how-to-use'
                            ? 'h-10 bg-gray-100 dark:bg-gray-700'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleSelect('how-to-use')}
                        href="/info/how-to-use"
                      >
                        <div
                          className={`${
                            selectedItem === 'how-to-use'
                              ? 'bg-blue-800 dark:bg-sky-500'
                              : ''
                          } absolute left-0 -mt-2 h-10 w-2 rounded-r-md`}
                        ></div>
                        Como Usar Swaplyar
                      </Sidebar.Item>

                      <Sidebar.Item
                        className={`text-blue-500 ${
                          selectedItem === 'loyalty-program'
                            ? 'h-10 bg-gray-100 dark:bg-gray-700'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleSelect('loyalty-program')}
                        href="/info/loyalty-program"
                      >
                        <div
                          className={`${
                            selectedItem === 'loyalty-program'
                              ? 'bg-blue-800 dark:bg-sky-500'
                              : ''
                          } absolute left-0 -mt-2 h-10 w-2 rounded-r-md`}
                        ></div>
                        Programa de Fidelización
                      </Sidebar.Item>
                    </Sidebar.ItemGroup>

                    <Sidebar.ItemGroup className=" border-t-2 border-blue-800 px-2 dark:border-sky-500 ">
                      <Sidebar.Item
                        className={`relative md:hidden m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth p-3 text-buttonsLigth hover:bg-transparent dark:border-darkText dark:hover:bg-transparent ${logStyles.buttonLight}`}
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
                        className={`dark:hover:bg- relative m-1 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${rgStyles.buttonSecond} `}
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

            <section className="hidden lg:flex lg:gap-2">
              <NavLinks />
            </section>
          </nav>
        </div>
      </Navbar>
    </main>
  );
}

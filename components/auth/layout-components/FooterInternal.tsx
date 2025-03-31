'use client';
import { useState } from 'react';
import { NavIcons } from './NavIcons';
import { TabView } from './NavbarInternal';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import useWindowWidth from '@/hooks/useWindowWidth';

export const FooterInternal = () => {
  const [tabDesktop, setTabDesktop] = useState<TabView>(TabView.NONE);
  const { isDark } = useDarkTheme();
  const windowWidth = useWindowWidth();
  const isMobile = () => (windowWidth >= 390 ? false : true);
  return (
    <footer className={`fixed bottom-0 left-0 flex h-16 w-full justify-center ${isDark ? 'bg-white' : 'bg-nav-blue'}`}>
      <NavIcons setTabDesktop={setTabDesktop} tabDesktop={tabDesktop} />
    </footer>
  );
};

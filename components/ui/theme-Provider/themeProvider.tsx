// /components/ui/theme-Provider/themeProvider.tsx

'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
  isDark: boolean;
  changeTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useDarkTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useDarkTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
      setIsDark(currentTheme === 'dark');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(systemPrefersDark);
    }

    setMounted(true);
  }, []);

  const changeTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
  };

  return <ThemeContext.Provider value={{ isDark, changeTheme, mounted }}>{children}</ThemeContext.Provider>;
}

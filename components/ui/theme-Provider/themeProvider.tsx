// /components/ui/theme-Provider/themeProvider.tsx

'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
  isDark: boolean;
  changeTheme: () => void;
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

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const appliedTheme = currentTheme || (systemPref ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', appliedTheme === 'dark');
    setIsDark(appliedTheme === 'dark');
  }, []);

  const changeTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface ThemeContextProps {
  isDark: boolean;
  changeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useDarkTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useDarkTheme must be used with a context ThemeProvider');
  }
  return context;
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const systemPref = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (currentTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(systemPref);
      document.documentElement.classList.toggle('dark', systemPref);
    }
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

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import clsx from 'clsx';
import { Sun, Moon } from 'lucide-react';

const ThemeToggleAside = ({ collapsed }: { collapsed: boolean }) => {
  const { changeTheme, isDark } = useDarkTheme();

  return (
    <button
      onClick={changeTheme}
      className={clsx(
        'flex items-center justify-center rounded-md transition-all',
        collapsed ? 'mx-auto h-9 w-9' : 'mx-2 my-2 h-9 w-full px-3',
        isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200',
      )}
      aria-label="Toggle theme"
    >
      <div className="relative">
        <Sun
          className={clsx('h-[1.2rem] w-[1.2rem] transition-all', isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100')}
        />
        <Moon
          className={clsx(
            'absolute left-0 top-0 h-[1.2rem] w-[1.2rem] transition-all',
            isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0',
          )}
        />
      </div>
      {!collapsed && <span className="ml-2 text-sm">{isDark ? 'Dark Mode' : 'Light Mode'}</span>}
    </button>
  );
};

export default ThemeToggleAside;

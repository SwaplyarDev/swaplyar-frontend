import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import Switch from '@/components/ui/top-menu/switch';
import Link from 'next/link';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { SwaplyArLogoSolo, SwaplyArlogoWhite } from '@/utils/assets/imgDatabaseCloudinary';

const LogoSidebar = ({ collapsed, toggleSidebar }: { collapsed: boolean; toggleSidebar: () => void }) => {
  const { isDark } = useDarkTheme();
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4 dark:border-gray-700">
      <Link href="/es/auth/solicitud">
        <Image
          src={isDark ? SwaplyArlogoWhite : SwaplyArLogoSolo}
          className="max-h-14 w-full max-w-14"
          alt="Cambiar saldo online"
          width={200}
          height={80}
        />
      </Link>
      <div className="flex items-center justify-self-end">
        {!collapsed && <Switch />}
        <button
          onClick={toggleSidebar}
          className={`rounded-md p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 ${
            collapsed ? 'mx-auto' : 'ml-2'
          }`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );
};

export default LogoSidebar;

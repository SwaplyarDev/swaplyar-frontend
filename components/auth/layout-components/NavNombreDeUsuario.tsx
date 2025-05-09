import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function NavNombreDeUsuario() {
  const { isDark } = useDarkTheme();
  const { data: session } = useSession();

  if (!session) return false;

  const user = session.user;

  return (
    <div className={`flex-1 ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} flex w-full items-center`}>
      <p className="hidden whitespace-nowrap pl-2 font-sans text-white dark:text-black sm-tablet2:block">
        {user.fullName}
      </p>
    </div>
  );
}

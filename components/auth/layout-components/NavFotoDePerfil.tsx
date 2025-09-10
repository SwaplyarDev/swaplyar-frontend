import Link from 'next/link';
import React, { useState } from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { swaplyArAvatar } from '@/utils/assets/imgDatabaseCloudinary';

export default function NavFotoDePerfil() {
  const pathname = usePathname();
  const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false);
  const { isDark } = useDarkTheme();
  const isActive = pathname.split('/')[3];
  const { data: session } = useSession();

  if (!session) return false;
  const user = session.user;
  const isAdmin = user.role === 'admin' ? true : false;
  return (
    <>
      <div className={`mask-nav h-16 w-[8rem] self-start ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'}`}></div>
  <Link
        href={isAdmin ? '#' : '/es/auth/perfil'}
        onClick={() => {
          setMostrarModalPerfil(!mostrarModalPerfil);
        }}
        className={`${isActive === 'perfil' || pathname === '/es/auth/perfil' ? 'bg-gradient-to-t' : ''} absolute left-4 top-2 h-24 w-24 rounded-full from-[#98cf09] via-[#B614FF] to-[#092993] p-[0.25rem] hover:bg-gradient-to-t`}
      >
        <Image
          src={user.profile?.profilePictureUrl ? user.profile.profilePictureUrl : swaplyArAvatar}
          alt="Foto perfil Usuario"
          width={100}
          height={100}
          className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-lightText"
        />
      </Link>
      <div
        className={`absolute ${isAdmin && mostrarModalPerfil ? 'flex flex-col items-start justify-center gap-1' : 'hidden'} ${isDark ? 'text-[#252526]' : 'text-white'} ${isDark ? 'bg-[#EBE7E0]' : 'bg-[#012A8E]'} left-2 top-28 h-20 whitespace-nowrap rounded-3xl border-2 border-[#EBE7E0] px-4 text-lg font-semibold`}
      >
        <Link
          href={'/es/auth/perfil/'}
          onClick={() => {
            setMostrarModalPerfil(!mostrarModalPerfil);
          }}
        >
          Ver perfil
        </Link>
        <Link
          href={'/es/auth/admin/'}
          onClick={() => {
            setMostrarModalPerfil(!mostrarModalPerfil);
          }}
        >
          Ver admin
        </Link>
      </div>
    </>
  );
}

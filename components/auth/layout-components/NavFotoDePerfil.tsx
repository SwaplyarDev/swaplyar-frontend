import Link from 'next/link';
import React, { useState } from 'react';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { swaplyArAvatar } from '@/utils/assets/imgDatabaseCloudinary';
import { Session } from '@auth/core/types';

interface Props {
  isDark: boolean;
  isActive: string;
  session: Session | null;
}

export default function NavFotoDePerfil({ isDark, isActive, session }: Props) {

  if (!session) return false;
  return (
      <div className="relative flex h-full">
        <div className="relative flex justify-center">
          <div className={`h-full cursor-pointer mask-nav w-32 ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'}`} />

        <div className={`absolute left-[18px] top-2 h-[92px] w-[92px] flex flex-row items-center justify-center rounded-[6.25rem]`}>
            <Link
              href="/es/auth/perfil"
            className={`${isActive === 'perfil' ? 'bg-gradient-to-t' : ''} relative h-[92px] w-[92px] rounded-full from-[#98cf09] via-[#B614FF] to-[#092993] p-[4px] hover:bg-gradient-to-t`}
            >
              <Image
                src={session?.user.profile?.profilePictureUrl || swaplyArAvatar}
                alt="Foto perfil Usuario"
                width={100}
                height={100}
                className="h-full w-full overflow-hidden rounded-full object-cover bg-white dark:bg-lightText"
              />
            </Link>
          </div>
        </div>

        <p className={`block content-center font-titleFont font-semibold text-white dark:text-black capitalize px-1 ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'} -ml-[1px]`}>
          {session?.user.fullName}
        </p>
      </div>
  );
}

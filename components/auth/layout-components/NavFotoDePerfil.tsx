import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { avatarUser1 } from '@/utils/assets/imgDatabaseCloudinary';
import { useProfileStore } from '@/store/useProfileStore';
import { useSession } from 'next-auth/react';
interface Props {
  isDark: boolean;
  isActive: string;
}

export default function NavFotoDePerfil({ isDark, isActive }: Props) {
  const { data: session } = useSession();
  const { userProfile } = useProfileStore();

  const displayName = userProfile?.nickName
    ? userProfile.nickName
    : `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`.trim();

  const profilePictureUrl = userProfile?.profilePictureUrl || session?.user.profile?.profilePictureUrl || avatarUser1;

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
                src={profilePictureUrl}
                alt="Foto perfil Usuario"
                width={100}
                height={100}
                className="h-full w-full overflow-hidden rounded-full object-cover bg-white dark:bg-lightText"
              />
            </Link>
          </div>
        </div>

        <p className={`hidden sm:block content-center font-titleFont font-semibold text-white dark:text-black capitalize px-1 ${isDark ? 'bg-custom-whiteD' : 'bg-nav-blue'} -ml-[1px]`}>
        {displayName}
        </p>
      </div>
  );
}

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { swaplyArAvatar } from '@/utils/assets/imgDatabaseCloudinary';
import { profileMock } from './utils/ProfileMock';
import SocialMediaModal from './Modals/RedesSocialesModal';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import WhatsappModal from './Modals/WhatsappModal';
import { useSession } from 'next-auth/react';
import InfoPersonalModal from './Modals/InfoPersonalModal';
import InfoCard from './ui/ProfileCards/InfoCard';
import EmailCard from './ui/ProfileCards/EmailCard';
import WhatsAppCard from './ui/ProfileCards/WhatsAppCard';
import SocialMediaCard from './ui/ProfileCards/SocialMediaCard';


const Profile = () => {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showWhatsAppModal || showProfileModal || showSocialMediaModal ? 'hidden' : 'auto';
    console.log('Session data:', session);
  }, [showWhatsAppModal, showProfileModal, showSocialMediaModal, session]);

  const ProfileSectionCard = ({ children }: { children: React.ReactNode }) => {
    const { isDark } = useDarkTheme();

    return (
      <div className={`sm:mx-4 mb-4 w-[90%] max-w-[796px] rounded-2xl sm:p-4 p-2 md-tablet:w-full ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black shadow-xl'}`}>
        {children}
      </div>
    );
  };

  return (
    <div className="my-14 min-h-screen font-textFont text-white">
      <header className={`mb-10 flex max-h-[150px] w-full items-center justify-center ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'}`}>
        <div className="flex w-full max-w-[1200px] justify-between xs:p-4">
          <h1 className="ml-4 sm:mt-6 text-lg font-bold sm:text-xl md:ml-[183px]">Perfil</h1>
          <div className="mr-4 flex flex-col-reverse items-end xs:flex-row xs:items-center xs:justify-end">
            <div className={`sm:mt-[110px] flex flex-col items-end px-2 xs:mb-4 xs:px-10 ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'}`}>
              <p className="text-xl font-semibold">{session?.user.fullName}</p>
              <p className="text-[16px] text-gray-400 underline">Registrado en 2019</p>
            </div>
            <div className="relative h-[90px] w-[90px] xs:h-32 xs:w-32">
              <Image src={session?.user.profile?.profilePictureUrl || swaplyArAvatar} alt="Profile picture" fill className="rounded-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="mt-5 flex flex-col items-center">
        <ProfileSectionCard>
          <InfoCard setShow={setShowProfileModal} />
          {showProfileModal && <InfoPersonalModal show={showProfileModal} setShow={setShowProfileModal} />}
        </ProfileSectionCard>

        <ProfileSectionCard>
          <EmailCard />
        </ProfileSectionCard>

        <ProfileSectionCard>
          <WhatsAppCard setShow={setShowWhatsAppModal} />
          {showWhatsAppModal && <WhatsappModal show={showWhatsAppModal} setShow={setShowWhatsAppModal} />}
        </ProfileSectionCard>

        <ProfileSectionCard>
          <SocialMediaCard
            socialNetworks={profileMock.redesSociales}
            onEdit={() => setShowSocialMediaModal(true)}
          />
          {showSocialMediaModal && (
            <SocialMediaModal
              show={showSocialMediaModal}
              setShow={setShowSocialMediaModal}
              socialNetworks={profileMock.redesSociales}
            />
          )}
        </ProfileSectionCard>
      </div>
    </div>
  );
};

export default Profile;

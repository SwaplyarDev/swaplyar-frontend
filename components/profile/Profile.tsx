'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { swaplyArAvatar } from '@/utils/assets/imgDatabaseCloudinary';
import { profileMock } from './utils/ProfileMock';
import SocialNetworkModal from './Modals/RedesSocialesModal';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import WhatsappModal from './Modals/WhatsappModal';
import { useSession } from 'next-auth/react';
import InfoPersonalModal from './Modals/InfoPersonalModal';
import InfoCard from './ui/ProfileCards/InfoCard';
import EmailCard from './ui/ProfileCards/EmailCard';
import WhatsAppCard from './ui/ProfileCards/WhatsAppCard';
import SocialNetworkCard from './ui/ProfileCards/SocialNetworkCard';
import ProfilePictureModal from './Modals/ProfilePictureModal';
import { useSocialNetworksStore } from './store/socialNetworksStore';
import { LoadingState } from '../historial/loadingState';
import { useTransactions } from '@/hooks/useTransactions';


const Profile = () => {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showSocialNetworkModal, setShowSocialNetworkModal] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);

  const socialAccounts = useSocialNetworksStore((state) => state.socialAccounts);
  const { loading } =
      useTransactions();

  useEffect(() => {
    document.body.style.overflow = showWhatsAppModal || showProfileModal || showSocialNetworkModal ? 'hidden' : 'auto';
    console.log('Session data:', session);
  }, [showWhatsAppModal, showProfileModal, showSocialNetworkModal, session]);

  const ProfileSectionCard = ({ children }: { children: React.ReactNode }) => {
    const { isDark } = useDarkTheme();

    return (
      <div className={`sm:mx-4 mb-4 w-[90%] max-w-[796px] rounded-2xl sm:p-4 p-2 md-tablet:w-full ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black shadow-xl'}`}>
        {children}
      </div>
    );
  };

  if (loading) {
      return (
        <div className="mx-auto mb-24 mt-10 w-full max-w-xl rounded-xl p-6 sm:my-6">
          <LoadingState />
        </div>
      );
    }

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
            <div
              className="relative h-[120px] w-[120px] cursor-pointer"
              onClick={() => setShowPictureModal(true)}
            >
              <Image
                src={session?.user.profile?.profilePictureUrl || swaplyArAvatar}
                alt="Profile picture"
                fill
                className="rounded-full object-cover hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 hover:opacity-100 transition">
                <span className="text-sm text-white">Cambiar</span>
              </div>
            </div>

            {showPictureModal && <ProfilePictureModal setShow={setShowPictureModal} />}
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
          <SocialNetworkCard
            socialNetworks={socialAccounts}
            onEdit={() => setShowSocialNetworkModal(true)}
          />
          {showSocialNetworkModal && (
            <SocialNetworkModal
              show={showSocialNetworkModal}
              setShow={setShowSocialNetworkModal}
              socialNetworks={socialAccounts}
            />
          )}
        </ProfileSectionCard>
      </div>
    </div>
  );
};

export default Profile;

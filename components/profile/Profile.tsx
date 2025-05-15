'use client';

import { Button } from '@mui/material';
import { Instagram } from '@mui/icons-material';
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

const Profile = () => {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);

  useEffect(() => {
    if (showWhatsAppModal || showProfileModal || showSocialMediaModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showWhatsAppModal]);

  return (
    <div className="my-14 min-h-screen font-textFont text-white">
      {/* Header */}
      <header
        className={`flex max-h-[150px] items-center justify-center ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'} `}
      >
        <div className="flex w-full max-w-[1200px] justify-between xs:p-4">
          <h1 className="ml-4 text-xl font-bold xs:ml-8 md:ml-[183px]">Perfil</h1>
          {/* User Info */}
          <div className="mr-4 flex flex-col-reverse items-end xs:flex-row">
            <div
              className={`flex flex-col items-end px-2 xs:mb-4 ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'} xs:px-10`}
            >
              <p className="">{session?.user.fullName}</p>
              <p className="text-xs text-gray-400 underline">Registrado en 2019</p>
            </div>
            <div className="relative h-[110px] w-[110px] xs:h-32 xs:w-32">
              <Image
                src={swaplyArAvatar}
                alt="Profile picture"
                width={100}
                height={100}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="mt-5 flex flex-col items-center">
        {/* Personal Information */}
        <InfoCard setShow={setShowProfileModal} />
        <div>{showProfileModal && <InfoPersonalModal show={showProfileModal} setShow={setShowProfileModal} />}</div>

        <EmailCard />

        {/* WhatsApp */}
        <div
          className={`mx-4 mb-4 w-[75%] max-w-[796px] rounded-2xl ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black shadow-xl'} bg-[#4B4B4B] p-4 md-tablet:w-full`}
        >
          <WhatsAppCard setShow={setShowWhatsAppModal} />
          {showWhatsAppModal && <WhatsappModal show={showWhatsAppModal} setShow={setShowWhatsAppModal} />}
        </div>

        {/* Social Network */}
        <div
          className={`mx-10 mb-4 w-[75%] max-w-[796px] rounded-2xl ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black shadow-xl'} p-4 md-tablet:w-full`}
        >
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg">Red Social</h2>
            <Instagram className="h-[50px] w-[50px]" />
          </div>
          {profileMock.redesSociales.map((redSocial, index) => (
            <div key={`ProifileRedSocial-${index}`} className="flex justify-between">
              <p className="mb-2">{redSocial.type[0].toUpperCase() + redSocial.type.slice(1, redSocial.type.length)}</p>
              <p className="">@{redSocial.username}</p>
            </div>
          ))}
          <div className="text-end">
            <Button onClick={() => setShowSocialMediaModal(true)} className="h-6 px-2 text-xs text-gray-400">
              Editar
            </Button>
          </div>
        </div>
        {showSocialMediaModal && (
          <SocialMediaModal
            show={showSocialMediaModal}
            setShow={setShowSocialMediaModal}
            socialNetworks={profileMock.redesSociales}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;

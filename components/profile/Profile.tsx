
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { swaplyArAvatar } from '@/utils/assets/imgDatabaseCloudinary';
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
import { LoadingState } from '../historial/loadingState';
import { useProfileStore } from '@/store/useProfileStore';
import { VerifyCodeModal } from './Modals/VerifyCodeModal';
import ManagementCard from './ui/ProfileCards/ManagementCard';
import CloseAccountModal from './Modals/CloseAccountModal';

const Profile = () => {
  const { isDark } = useDarkTheme();
  const { data: session } = useSession();
  const { userProfile, loading, fetchProfile } = useProfileStore();

  // Fetch profile on mount or when session changes
  useEffect(() => {
    if (session?.accessToken) {
      fetchProfile(session.accessToken);
    }
  }, [session?.accessToken, fetchProfile]);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showVerificationCodeModal, setShowVerificationCodeModal] = useState(false);
  const [showSocialNetworkModal, setShowSocialNetworkModal] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showManagementModal, setShowManagementModal] = useState(false);


  useEffect(() => {
    const anyModalOpen = showWhatsAppModal || showProfileModal || showSocialNetworkModal || showVerificationCodeModal;
    document.body.style.overflow = anyModalOpen ? 'hidden' : 'auto';
  }, [showWhatsAppModal, showProfileModal, showSocialNetworkModal, showVerificationCodeModal]);

  const ProfileSectionCard = ({ children }: { children: React.ReactNode }) => {
    const { isDark } = useDarkTheme();
    return (
      <div className={`shadow-infoCard w-full max-w-[796px] rounded-2xl z-30 p-3 sm:px-6 sm:py-2.5 md-tablet:w-full ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black'}`}>
        {children}
      </div>
    );
  };

  const handleWhatsAppSubmitSuccess = () => {
    setShowWhatsAppModal(false);
    setShowVerificationCodeModal(true);
  };

  const handleVerificationComplete = () => {
    setShowVerificationCodeModal(false);
  };

/*   if (loading) {
    return (
      <div className="mx-auto mb-24 mt-10 w-full max-w-xl rounded-xl p-6 sm:my-6">
        <LoadingState />
      </div>
    );
  } */

  const getYearOfRegister = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const displayName = `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`.trim();

  const profilePictureUrl = userProfile?.profilePictureUrl || session?.user.profile?.profilePictureUrl || swaplyArAvatar;


  return (
    <div className={`container-spacing ${(!loading) && 'min-h-screen'} !px-0 font-textFont text-white`}>
      <header className={`mb-10 flex max-h-[150px] w-full items-center justify-center ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'}`}>
        <div className="h-full flex w-full max-w-[1040px] justify-between py-4 px-8">
          <h1 className="text-2xl md:text-3.5xl font-bold">Perfil</h1>
          <div className="flex items-end flex-row justify-end">
            <div className={`flex flex-col items-end px-2 xs:px-10 ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'}`}>
              <p className="text-sm xs:text-xl font-semibold capitalize text-end">{displayName}</p>
              <p className="text-xs underline">Registrado en { getYearOfRegister(userProfile?.user.createdAt || '')}</p>
            </div>
            <div
              className="relative z-50 size-20 md:size-[120px] cursor-pointer"
              onClick={() => setShowPictureModal(true)}
            >
              <Image
                src={profilePictureUrl}
                alt="Profile picture"
                fill
                className="rounded-full object-cover hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 hover:opacity-100 transition">
                <span className="text-sm text-white">Cambiar</span>
              </div>
            </div>

            {showPictureModal && <ProfilePictureModal imgProfile={profilePictureUrl} setShow={setShowPictureModal} />}
          </div>
        </div>
      </header>

      <div className="mt-5 mx-4 md:mx-8 flex flex-col gap-7 items-center">
        <ProfileSectionCard>
          <InfoCard setShow={setShowProfileModal} />
          {showProfileModal && <InfoPersonalModal show={showProfileModal} setShow={setShowProfileModal} />}
        </ProfileSectionCard>

        <ProfileSectionCard>
          <EmailCard setShow={setShowEmailModal} />
        </ProfileSectionCard>

        <ProfileSectionCard>
          <WhatsAppCard setShow={setShowWhatsAppModal} />
          {showWhatsAppModal && (
            <WhatsappModal
              show={showWhatsAppModal}
              setShow={setShowWhatsAppModal}
              onVerificationSuccess={handleWhatsAppSubmitSuccess} // Nueva prop
            />
          )}
        </ProfileSectionCard>

        {/*verify code email */}
        {showVerificationCodeModal && (
          <VerifyCodeModal
            show={showVerificationCodeModal}
            setShow={setShowVerificationCodeModal}
            onVerify={handleVerificationComplete}
          />
        )}

        <ProfileSectionCard>
          <SocialNetworkCard
            onEdit={() => setShowSocialNetworkModal(true)}
          />
          {showSocialNetworkModal && (
            <SocialNetworkModal
              show={showSocialNetworkModal}
              setShow={setShowSocialNetworkModal}
            />
          )}
        </ProfileSectionCard>

        <ProfileSectionCard>
          <ManagementCard
            setShow={setShowManagementModal}
          />
          {showManagementModal && (
            <CloseAccountModal
              show={showManagementModal}
              setShow={setShowManagementModal}
            />
          )}
        </ProfileSectionCard>
      </div>
    </div>
  );
};

export default Profile;
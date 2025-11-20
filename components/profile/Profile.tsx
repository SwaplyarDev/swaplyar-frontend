
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
import { useTransactions } from '@/hooks/useTransactions';
import { useProfileStore } from '@/store/useProfileStore';
import { VerifyCodeModal } from './Modals/VerifyCodeModal';

const Profile = () => {
  const { isDark } = useDarkTheme();
  const { data: session } = useSession();
  const { userProfile, loading: profileLoading, fetchProfile } = useProfileStore();

  // Fetch profile on mount or when session changes
  useEffect(() => {
    if (session?.accessToken) {
      fetchProfile(session.accessToken);
    }
  }, [session?.accessToken, fetchProfile]);

  const { socialAccounts } = useProfileStore();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showVerificationCodeModal, setShowVerificationCodeModal] = useState(false);
  const [showSocialNetworkModal, setShowSocialNetworkModal] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const { loading } = useTransactions();

  useEffect(() => {
    const anyModalOpen = showWhatsAppModal || showProfileModal || showSocialNetworkModal || showVerificationCodeModal;
    document.body.style.overflow = anyModalOpen ? 'hidden' : 'auto';
  }, [showWhatsAppModal, showProfileModal, showSocialNetworkModal, showVerificationCodeModal]);

  const ProfileSectionCard = ({ children }: { children: React.ReactNode }) => {
    const { isDark } = useDarkTheme();
    return (
      <div className={`shadow-infoCard sm:mx-4 mb-4 w-[90%] max-w-[796px] rounded-2xl z-30 px-6 py-2.5 md-tablet:w-full ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black'}`}>
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

  if (loading || profileLoading) {
    return (
      <div className="mx-auto mb-24 mt-10 w-full max-w-xl rounded-xl p-6 sm:my-6">
        <LoadingState />
      </div>
    );
  }

  const getYearOfRegister = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const displayName = `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`.trim();

  const profilePictureUrl = userProfile?.profilePictureUrl || session?.user.profile?.profilePictureUrl || swaplyArAvatar;


  return (
    <div className={`container-spacing ${!loading && 'min-h-screen'} !px-0 font-textFont text-white`}>
      <header className={`mb-10 flex max-h-[150px] w-full items-center justify-center ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'}`}>
        <div className="h-full flex w-full max-w-[1040px] justify-between py-4 px-4 md:px-8">
          <h1 className="text-3.5xl font-bold">Perfil</h1>
          <div className="flex flex-col-reverse items-end xs:flex-row  xs:justify-end">
            <div className={`flex flex-col items-end px-2 xs:px-10 ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'}`}>
              <p className="text-xl font-semibold capitalize">{displayName}</p>
              <p className="text-[16px]  underline">Registrado en { getYearOfRegister(userProfile?.user.createdAt || '')}</p>
            </div>
            <div
              className="relative z-50 h-[120px] w-[120px] cursor-pointer"
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

      <div className="mt-5 flex flex-col items-center">
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
      </div>
    </div>
  );
};

export default Profile;
// import { useEffect, useState } from 'react';
// import { swaplyArAvatar } from '@/utils/assets/imgDatabaseCloudinary';
// import { profileMock } from './utils/ProfileMock';
// import SocialNetworkModal from './Modals/RedesSocialesModal';
// import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
// import WhatsappModal from './Modals/WhatsappModal';
// import { useSession } from 'next-auth/react';
// import InfoPersonalModal from './Modals/InfoPersonalModal';
// import InfoCard from './ui/ProfileCards/InfoCard';
// import EmailCard from './ui/ProfileCards/EmailCard';
// import WhatsAppCard from './ui/ProfileCards/WhatsAppCard';
// import SocialNetworkCard from './ui/ProfileCards/SocialNetworkCard';
// import ProfilePictureModal from './Modals/ProfilePictureModal';
// import { useSocialNetworksStore } from './store/socialNetworksStore';
// import { LoadingState } from '../historial/loadingState';
// import { useTransactions } from '@/hooks/useTransactions';
// import { useWhatsAppFormStore } from './store/WhatsAppFormStore';
// import EmailModal from './Modals/EmailModal';



// const Profile = () => {
//   const { isDark } = useDarkTheme();

//   const { data: session } = useSession();
//   useEffect(() => {
//     if (session?.user.profile?.phone) {
//       useWhatsAppFormStore.setState({ phone: session.user.profile.phone });
//     }
//   }, [session]);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
//   const [showSocialNetworkModal, setShowSocialNetworkModal] = useState(false);
//   const [showPictureModal, setShowPictureModal] = useState(false);
//   const [showEmailModal, setShowEmailModal] = useState(false);

//   const socialAccounts = useSocialNetworksStore((state) => state.socialAccounts);
//   const { loading } =
//     useTransactions();

//   useEffect(() => {
//     document.body.style.overflow = showWhatsAppModal || showProfileModal || showSocialNetworkModal ? 'hidden' : 'auto';
//     console.log('Session data:', session);
//   }, [showWhatsAppModal, showProfileModal, showSocialNetworkModal, session]);

//   const ProfileSectionCard = ({ children }: { children: React.ReactNode }) => {
//     const { isDark } = useDarkTheme();

//     return (
//       <div className={`sm:mx-4 mb-4 w-[90%] max-w-[796px] rounded-2xl z-30 sm:p-2 p-1 md-tablet:w-full ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black shadow-xl'}`}>
//         {children}
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="mx-auto mb-24 mt-10 w-full max-w-xl rounded-xl p-6 sm:my-6">
//         <LoadingState />
//       </div>
//     );
//   }
//   const mockSocialNetworks = [
//     { type: "Instagram", username: "Suarez_Oa" },
//     { type: "Twitter", username: "Suarez_Tw" },
//     { type: "Facebook", username: "SuarezFb" },
//   ];
//   return (
//     <div className="my-14 min-h-screen font-textFont text-white">
//       <header className={`mb-10 flex max-h-[150px] w-full items-center justify-center ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'}`}>
//         <div className="flex w-full max-w-[1200px] justify-between xs:p-4">
//           <h1 className="ml-4 sm:mt-6 text-lg font-bold sm:text-xl md:ml-[183px]">Perfil</h1>
//           <div className="mr-4 flex flex-col-reverse items-end xs:flex-row xs:items-center xs:justify-end">
//             <div className={`sm:mt-[110px] flex flex-col items-end px-2 xs:mb-4 xs:px-10 ${isDark ? 'bg-[#4B4B4B]' : 'bg-nav-blue text-white'}`}>
//               <p className="text-xl font-semibold">{session?.user.fullName}</p>
//               <p className="text-[16px] text-gray-400 underline">Registrado en 2019</p>
//             </div>
//             <div
//               className="relative z-50  h-[120px] w-[120px] cursor-pointer"
//               onClick={() => setShowPictureModal(true)}
//             >
//               <Image
//                 src={session?.user.profile?.profilePictureUrl || swaplyArAvatar}
//                 alt="Profile picture"
//                 fill
//                 className="rounded-full object-cover hover:opacity-80"
//               />
//               <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 hover:opacity-100 transition">
//                 <span className="text-sm text-white">Cambiar</span>
//               </div>
//             </div>

//             {showPictureModal && <ProfilePictureModal imgProfile={session?.user.profile?.profilePictureUrl || swaplyArAvatar} setShow={setShowPictureModal} />}
//           </div>
//         </div>
//       </header>

//       <div className="mt-5 flex flex-col items-center">
//         <ProfileSectionCard>
//           <InfoCard setShow={setShowProfileModal} />
//           {showProfileModal && <InfoPersonalModal show={showProfileModal} setShow={setShowProfileModal} />}
//         </ProfileSectionCard>

//         <ProfileSectionCard>
//           <EmailCard setShow={setShowEmailModal} />
//           {/* the user can not edit his email */}
//           {/* {showEmailModal && (
//             <EmailModal show={showEmailModal} setShow={setShowEmailModal} />
//           )} */}
//         </ProfileSectionCard>

//         <ProfileSectionCard>
//           <WhatsAppCard setShow={setShowWhatsAppModal} />
//           {showWhatsAppModal && <WhatsappModal show={showWhatsAppModal} setShow={setShowWhatsAppModal} />}
//         </ProfileSectionCard>

//         <ProfileSectionCard>
//           <SocialNetworkCard
//             socialNetworks={mockSocialNetworks}
//             onEdit={() => setShowSocialNetworkModal(true)}
//           />
//           {showSocialNetworkModal && (
//             <SocialNetworkModal
//               show={showSocialNetworkModal}
//               setShow={setShowSocialNetworkModal}
//               socialNetworks={socialAccounts}
//             />
//           )}
//         </ProfileSectionCard>
//       </div>
//     </div>
//   );
// };

// export default Profile;

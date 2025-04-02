'use client';

import { Button } from '@mui/material';
import { Email, Instagram, WhatsApp } from '@mui/icons-material';
import Image from 'next/image';
import { useState } from 'react';
import { swaplyArAvatar } from '@/utils/assets/imgDatabaseCloudinary';
import InfoPersonalModal from './Modals/InfoPersonalModal';
import WhatsAppModal from './Modals/WhatsappModal';
import EmailModal from './Modals/EmailModal';
import { profileMock } from './utils/ProfileMock';
import SocialMediaModal from './Modals/RedesSocialesModal';

const Profile = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);

  return (
    <div className="min-h-screen font-textFont text-white">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#4B4B4B] p-4">
        <h1 className="text-lg font-medium">Perfil</h1>
        <div className="relative h-12 w-12">
          <Image
            src={swaplyArAvatar}
            alt="Profile picture"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>
      </header>

      {/* User Info */}
      <div className="mb-4 flex flex-col items-end bg-[#4B4B4B] px-4">
        <p className="text-sm">{profileMock.informacionPersonal.nombreLegal}</p>
        <p className="text-xs text-gray-400">Registrado en {profileMock.anioRegistro}</p>
      </div>

      <div className="flex flex-col items-center">
        {/* Personal Information */}
        <div className="mx-4 mb-4 w-[75%] max-w-[796px] rounded-lg bg-[#4B4B4B] p-4 md-tablet:w-full">
          <h2 className="mb-3 text-lg">Informacion Personal</h2>

          <div className="grid grid-cols-2 gap-y-2">
            <p className="text-sm text-gray-400">Nombre Legal</p>
            <p className="text-right text-sm">{profileMock.informacionPersonal.nombreLegal}</p>

            <p className="text-sm text-gray-400">Nacionalidad</p>
            <p className="text-right text-sm">{profileMock.informacionPersonal.nacionalidad}</p>

            <p className="text-sm text-gray-400">N° de Documento</p>
            <p className="text-right text-sm">{profileMock.informacionPersonal.numeroDocumento}</p>

            <p className="text-sm text-gray-400">Fecha de Nacimiento</p>
            <p className="text-right text-sm">Mayo 25 1995</p>

            <p className="text-sm text-gray-400">Apodo</p>
            <div className="flex items-center justify-end gap-2 text-right text-sm">
              {profileMock.informacionPersonal.apodo}
              <Button onClick={() => setShowProfileModal(true)} className="h-6 px-2 text-xs">
                Editar
              </Button>
            </div>
            {showProfileModal && <InfoPersonalModal show={showProfileModal} setShow={setShowProfileModal} />}
          </div>
        </div>

        {/* Email */}
        <div className="mx-4 mb-4 w-[75%] max-w-[796px] rounded-lg bg-[#4B4B4B] p-4 md-tablet:w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">Correo Electrónico</h2>
            <Email className="h-5 w-5" />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm">{profileMock.email}</p>
            <Button onClick={() => setShowEmailModal(true)} className="h-6 px-2 text-xs">
              Editar
            </Button>
          </div>
          {showEmailModal && <EmailModal show={showEmailModal} setShow={setShowEmailModal} />}
        </div>

        {/* WhatsApp */}
        <div className="mx-4 mb-4 w-[75%] max-w-[796px] rounded-lg bg-[#4B4B4B] p-4 md-tablet:w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg">WhatsApp</h2>
            <WhatsApp />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm">{profileMock.whatsapp}</p>
            <Button onClick={() => setShowWhatsAppModal(true)} className="h-6 px-2 text-xs">
              Editar
            </Button>
          </div>
          {showWhatsAppModal && <WhatsAppModal show={showWhatsAppModal} setShow={setShowWhatsAppModal} />}
        </div>

        {/* Social Network */}
        <div className="mx-10 mb-4 w-[75%] max-w-[796px] rounded-lg bg-[#4B4B4B] p-4 md-tablet:w-full">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg">Red Social</h2>
            <Instagram className="h-5 w-5" />
          </div>
          {profileMock.redesSociales.map((redSocial, index) => (
            <div key={`ProifileRedSocial-${index}`} className="flex justify-between">
              <p className="text-sm">{redSocial[0]}</p>
              <p className="text-sm">@{redSocial[1]}</p>
            </div>
          ))}
          {/* <div className='text-end'>
            <Button onClick={() => setShowSocialMediaModal(true)} className="h-6 px-2 text-xs">Editar</Button>
          </div> */}
        </div>
        {/* {showSocialMediaModal && <SocialMediaModal show={showSocialMediaModal} setShow={setShowSocialMediaModal} />} */}
      </div>
    </div>
  );
};

export default Profile;

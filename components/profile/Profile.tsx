'use client';

import { Button } from '@mui/material';
import { Email, Instagram, WhatsApp } from '@mui/icons-material';
import Image from 'next/image';
import { useState } from 'react';
import WhatsAppVerification from './Modals/WhatsappModal';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen font-textFont text-white">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#4B4B4B] p-4">
        <h1 className="text-lg font-medium">Perfil</h1>
        <div className="relative h-12 w-12">
          <Image src={``} alt="Profile picture" width={48} height={48} className="rounded-full object-cover" />
        </div>
      </header>

      {/* User Info */}
      <div className="mb-4 flex flex-col items-end bg-[#4B4B4B] px-4">
        <p className="text-sm">Oa Johan Javier Suarez Merchan</p>
        <p className="text-xs text-gray-400">Registrado en 2019</p>
      </div>

      {/* Personal Information */}
      <div className="mx-4 mb-4 rounded-lg bg-[#4B4B4B] p-4">
        <h2 className="mb-3 text-lg">Informacion Personal</h2>

        <div className="grid grid-cols-2 gap-y-2">
          <p className="text-sm text-gray-400">Nombre Legal</p>
          <p className="text-right text-sm">Oa Johan Javier Suarez Merchan</p>

          <p className="text-sm text-gray-400">Nacionalidad</p>
          <p className="text-right text-sm">Argentina</p>

          <p className="text-sm text-gray-400">N° de Documento</p>
          <p className="text-right text-sm">2522525525</p>

          <p className="text-sm text-gray-400">Fecha de Nacimiento</p>
          <p className="text-right text-sm">Mayo 25 1995</p>

          <p className="text-sm text-gray-400">Apodo</p>
          <div className="flex items-center justify-end gap-2 text-right text-sm">
            Suarez Oa
            <Button className="h-6 px-2 text-xs">Editar</Button>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="mx-4 mb-4 rounded-lg bg-[#4B4B4B] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Correo Electrónico</h2>
          <Email className="h-5 w-5" />
        </div>
        <p className="mt-2 text-sm">ceo_oa@swaplyar.com</p>
      </div>

      {/* WhatsApp */}
      <div className="mx-4 mb-4 rounded-lg bg-[#4B4B4B] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">WhatsApp</h2>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm">03874555521</p>
          <Button onClick={() => setShowModal(true)} className="h-6 px-2 text-xs">
            Editar
          </Button>
        </div>
        {showModal && <WhatsAppVerification show={showModal} setShow={setShowModal} />}
      </div>

      {/* Social Network */}
      <div className="mx-4 mb-4 rounded-lg bg-[#4B4B4B] p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Red Social</h2>
          <Instagram className="h-5 w-5" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm">Instagram</p>
          <div className="text-right">
            <p className="text-sm">Suarez_Oa</p>
            <Button className="h-6 px-2 text-xs">Editar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

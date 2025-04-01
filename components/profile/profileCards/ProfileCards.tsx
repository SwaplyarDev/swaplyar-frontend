'use client';
import { Email, Instagram, WhatsApp } from '@mui/icons-material';
import { Card } from '../Profile';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import EditarInfo from '../editarInfo/EditarInfo';
import { useState } from 'react';

type ProfileCardsProps = {
  content: Card;
};

const ProfileCards = ({ content }: ProfileCardsProps) => {
  const { isDark } = useDarkTheme();

  const [editar, setEditar] = useState(false);

  return (
    <div className="">
      {content === Card.INFOPERSONAL && (
        <section className="mx-auto h-[252px] w-full rounded-2xl bg-[#4B4B4B] xs:w-5/6 xs:max-w-[768px] md:w-[796px]">
          <h2 className="weight-bold p-4 text-3xl xs:text-2xl">Informacion Personal</h2>
          <div className="flex justify-between p-4">
            <div>
              <p>Nombre Legal:</p>
              <p>Nacionalidad:</p>
              <p>N° Documento:</p>
              <p>Fecha Nacimiento:</p>
            </div>
            <div className="flex flex-col items-end">
              <p>Oa Johan Javier Suarez</p>
              <p>Argentina</p>
              <p>12345678</p>
              <p>01/01/2000</p>
            </div>
          </div>
          <div className="flex justify-between p-4">
            <p>Apodo</p>
            <div className="flex">
              <p className="mr-10">Suarez Oa</p>
              <span onClick={() => console.log('hola')}>Editar</span>
            </div>
          </div>
        </section>
      )}
      {content === Card.EMAIL && (
        <section className="mx-auto h-[148px] w-full rounded-2xl bg-[#4B4B4B] xs:w-5/6 xs:max-w-[768px] md:w-[796px]">
          <div className="flex justify-between p-4">
            <h2 className="weight-bold text-3xl xs:text-2xl">Correo Electronico</h2>
            <Email />
          </div>
          <p className="p-4">ceo_oa@swaplyar.com</p>
        </section>
      )}
      {content === Card.WHATSAPP && (
        <section className="mx-auto h-[148px] w-full rounded-2xl bg-[#4B4B4B] xs:w-5/6 xs:max-w-[768px] md:w-[796px]">
          <div className="flex justify-between p-4">
            <h2 className="weight-bold text-3xl xs:text-2xl">Whatsapp</h2>
            <WhatsApp />
          </div>
          <div className="flex justify-between p-4">
            <p>12345678</p>
            <span onClick={() => console.log('hola')}>Editar</span>
          </div>
        </section>
      )}
      {content === Card.REDES && (
        <section className="mx-auto h-[148px] w-full rounded-2xl bg-[#4B4B4B] xs:w-5/6 xs:max-w-[768px] md:w-[796px]">
          <div className="flex justify-between p-4">
            <h2 className="weight-bold text-3xl xs:text-2xl">Redes Sociales</h2>
            <Instagram />
          </div>
          <div className="flex justify-between p-4">
            <p>Swaplyar</p>
            <div className="flex flex-col items-end">
              <p>Suarez_Oa</p>
              <span onClick={() => setEditar(true)}>Editar</span>
            </div>
            {editar && <EditarInfo />}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfileCards;

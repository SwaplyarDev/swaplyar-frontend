'use client';
import Link from 'next/link';
import React from 'react';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { FlyerGif } from '@/utils/assets/img-database';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';

const NewSwaply = () => {
  const isDark = useDarkTheme();
  return (
    <div>
      <div className="mt-10 text-center">
        <FlyerTrabajo
          imageSrc={FlyerGif}
          title="¿Nuevo en SwaplyAr?"
          description="Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma sencilla y segura."
          nameButton="¡Empieza ahora!"
        />
      </div>
    </div>
  );
};

export default NewSwaply;

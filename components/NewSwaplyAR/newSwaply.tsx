'use client';
import React from 'react';
import { FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';

const NewSwaply = () => {
  return (
    <div>
      <div className="mt-10 text-center">
        <FlyerTrabajo
          href="/es/iniciar-sesion-o-registro"
          imageSrc={FlyerGif}
          description="Accede a más funciones y guardar tu historial de cambios"
          nameButton="Crear mi cuenta gratis"
        />
      </div>
    </div>
  );
};

export default NewSwaply;

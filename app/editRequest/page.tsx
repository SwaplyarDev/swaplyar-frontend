import EditSoli from '@/components/EditSolicitud/EditSoli';
import NewSwaply from '@/components/NewSwaplyAR/newSwaply';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Envía tu Solicitud a Atención al Cliente | SwaplyAr',
  description:
    'Envía tu solicitud con texto e imágenes para que nuestro equipo de atención al cliente evalúe su aceptación. Proceso rápido y sencillo en SwaplyAr',
};

const editRequestPage: React.FC = () => {
  return (
    <>
      <div className="flex-column container flex w-full flex-wrap items-center justify-center px-5 py-10 lg:px-0 xl:px-20">
        <EditSoli></EditSoli>
      </div>
      <div className="w-full">
        <NewSwaply></NewSwaply>
      </div>
    </>
  );
};

export default editRequestPage;

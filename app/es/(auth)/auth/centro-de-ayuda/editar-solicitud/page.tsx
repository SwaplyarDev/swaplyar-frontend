import EditSoli from '@/components/EditSolicitud/EditSoli';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Envía tu Solicitud a Atención al Cliente | SwaplyAr',
  description:
    'Envía tu solicitud con texto e imágenes para que nuestro equipo de atención al cliente evalúe su aceptación. Proceso rápido y sencillo en SwaplyAr',
  openGraph: {
    title: 'Editar tu Solicitud - Swaplyar',
    description: 'Modifica los detalles de tu solicitud de forma rápida y sencilla en Swaplyar.',
    url: 'https://www.swaplyar.com/editRequest',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740149014/8_kzkkwu.png',
        width: 1200,
        height: 630,
        alt: 'Editar tu Solicitud - Swaplyar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editar tu Solicitud - Swaplyar',
    description: 'Modifica los detalles de tu solicitud de forma rápida y sencilla en Swaplyar.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740149014/8_kzkkwu.png'],
    site: '@Swaplyar',
  },
};

const page: React.FC = () => {
  return (
    <>
      <EditSoli />
    </>
  );
};

export default page;

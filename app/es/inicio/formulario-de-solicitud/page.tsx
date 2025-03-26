// /app/request/page.tsx
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import StepperContainer from '@/components/request/form/StepperContainer';
import { FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulario de Solicitud de Envío de Dinero | SwaplyAr',
  description:
    'Completa el formulario de envío de dinero con datos del remitente, destinatario y monto. SwaplyAr lo hace fácil, seguro y rápido.',
  openGraph: {
    title: 'Formulario de Solicitud - Swaplyar',
    description: 'Completa tu solicitud con Swaplyar de forma rápida y segura. Accede al formulario aquí.',
    url: 'https://www.swaplyar.com/home/formulario-de-solicitud',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740149048/17_iduoj0.png',
        width: 1200,
        height: 630,
        alt: 'Formulario de Solicitud - Swaplyar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formulario de Solicitud - Swaplyar',
    description: 'Completa tu solicitud con Swaplyar de forma rápida y segura. Accede al formulario aquí.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740149048/17_iduoj0.png'],
    site: '@Swaplyar',
  },
};

const RequestPage = () => {
  return (
    <>
      <div className="flex items-center justify-center px-5 py-10 xs-phone:px-10">
        <StepperContainer />
      </div>
      <FlyerTrabajo
        href="/es/iniciar-sesion-o-registro"
        description="Para acceder a más beneficios y seguimiento en tiempo real registrate gratis"
        nameButton="¡Me quiero registrar!"
        imageSrc={FlyerGif}
      />
    </>
  );
};

export default RequestPage;

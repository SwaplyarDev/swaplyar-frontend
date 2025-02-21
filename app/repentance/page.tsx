import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import RepentanceForm from '@/components/repentance/Repentance';
import { FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancelación y Reembolso | SwaplyAr - Proceso Transparente',
  description:
    'Descubre cómo cancelar transacciones y solicitar reembolsos con SwaplyAr. Proceso claro, rápido y transparente. Contacta al soporte si necesitas ayuda',
  openGraph: {
    title: 'Cancelación y Reembolso - Swaplyar',
    description:
      'Conoce nuestra política de cancelación y reembolso para que gestiones tus transacciones con confianza.',
    url: 'https://www.swaplyar.com/repentance',
    type: 'website',
    images: [{ url: '/images/homeOG.png', width: 1200, height: 630, alt: 'Cancelación y Reembolso - Swaplyar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancelación y Reembolso - Swaplyar',
    description:
      'Conoce nuestra política de cancelación y reembolso para que gestiones tus transacciones con confianza.',
    images: ['/images/homeOG.png'],
    site: '@Swaplyar',
  },
};

const Page: React.FC = () => {
  return (
    <main>
      <div className="flex-column flex w-full flex-wrap items-center justify-center lg:px-10">
        <RepentanceForm />
      </div>
      <FlyerTrabajo
        href="/auth/login-register"
        imageSrc={FlyerGif}
        description="Creá una cuenta gratuita en SwaplyAr para gestionar tus reembolsos sin complicaciones"
        nameButton="Registrate"
      />
    </main>
  );
};

export default Page;

import RepentanceFormAuth from '@/components/auth/info/repentance/RepentanceAuth';
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
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740149010/6_xisubx.png',
        width: 1200,
        height: 630,
        alt: 'Cancelación y Reembolso - Swaplyar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cancelación y Reembolso - Swaplyar',
    description:
      'Conoce nuestra política de cancelación y reembolso para que gestiones tus transacciones con confianza.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740149010/6_xisubx.png'],
    site: '@Swaplyar',
  },
};

const Page: React.FC = () => {
  return <RepentanceFormAuth />;
};

export default Page;

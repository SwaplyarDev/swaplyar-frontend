import SwaplyArInstructions from '@/components/ui/swaply-arInstructions/SwaplyArInstructions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo Usar Swaplyar',
  description: 'Aprende cómo usar Swaplyar en simples pasos y aprovecha nuestras soluciones financieras.',
  openGraph: {
    title: 'Cómo Usar Swaplyar',
    description: 'Aprende cómo usar Swaplyar en simples pasos y aprovecha nuestras soluciones financieras.',
    url: 'https://www.swaplyar.com/es/como-usar-swaplyar',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dwrhturiy/image/upload/v1740149032/15_hm33bh.png',
        width: 1200,
        height: 630,
        alt: 'Cómo Usar Swaplyar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo Usar Swaplyar',
    description: 'Aprende cómo usar Swaplyar en simples pasos y aprovecha nuestras soluciones financieras.',
    images: ['https://res.cloudinary.com/dwrhturiy/image/upload/v1740149032/15_hm33bh.png'],
    site: '@Swaplyar',
  },
};

const page = () => {
  return (
    <>
      <SwaplyArInstructions />
    </>
  );
};

export default page;

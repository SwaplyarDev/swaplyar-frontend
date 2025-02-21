import SwaplyArInstructions from '@/components/ui/swaply-arInstructions/SwaplyArInstructions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo Usar Swaplyar',
  description: 'Aprende cómo usar Swaplyar en simples pasos y aprovecha nuestras soluciones financieras.',
  openGraph: {
    title: 'Cómo Usar Swaplyar',
    description: 'Aprende cómo usar Swaplyar en simples pasos y aprovecha nuestras soluciones financieras.',
    url: 'https://www.swaplyar.com/info/how-to-use',
    type: 'website',
    images: [{ url: '/images/homeOG.png', width: 1200, height: 630, alt: 'Cómo Usar Swaplyar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo Usar Swaplyar',
    description: 'Aprende cómo usar Swaplyar en simples pasos y aprovecha nuestras soluciones financieras.',
    images: ['/images/homeOG.png'],
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

import HomePage from '@/components/home/HomePage';
import { constructMetadata } from '@/components/seo/SeoComp';

export const metadata = constructMetadata({
  title: 'SwaplyAr | Tu Aliado en Transferencias, cambio y dólar cripto',
  description:
    'Descubre cómo Swaplyar simplifica tus Transferencias internacionales, billeteras virtuales o Cripto y gestión de pagos de manera segura, rápida y eficiente.',
});

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}

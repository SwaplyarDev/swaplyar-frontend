import HomePage from '@/components/home/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SwaplyAr | Tu Aliado en Transferencias, cambio y dólar cripto',
  description:
    'Descubre cómo Swaplyar simplifica tus Transferencias internacionales, billeteras virtuales o Cripto y gestión de pagos de manera segura, rápida y eficiente.',
  openGraph: {
    title: 'Swaplyar - Soluciones Financieras Rápidas y Seguras',
    description: 'Descubre cómo Swaplyar puede ayudarte con soluciones financieras seguras, rápidas y eficientes.',
    url: 'https://www.swaplyar.com',
    type: 'website',
    siteName: 'Swaplyar',
    images: [{ url: '/images/homeOG.png', width: 1200, height: 630, alt: 'Swaplyar - Soluciones Financieras' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swaplyar - Soluciones Financieras Rápidas y Seguras',
    description: 'Descubre cómo Swaplyar puede ayudarte con soluciones financieras seguras, rápidas y eficientes.',
    images: ['/images/homeOG.png'],
    site: '@Swaplyar',
  },
};

export default function Home() {
  return (
    <main className="relative py-10">
      <HomePage />
    </main>
  );
}

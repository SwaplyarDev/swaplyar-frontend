// /app/layout.tsx

/**
 * Configuración del layout principal de la aplicación en Next.js 14.
 *
 * Este archivo define la estructura global de la aplicación, incluyendo el HTML, head, y body.
 * También integra varios proveedores de contexto, herramientas de análisis y seguimiento,
 * y componentes globales como el menú de navegación y el pie de página.
 */

import type { Metadata } from 'next';
import Footer from '@/components/footer/Footer';
import { TopMenu } from '@/components/ui/top-menu/TopMenu';
import ThemeProvider from '../components/ui/theme-Provider/themeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { roboto } from '@/config/fonts/fonts';
import { MarginProvider } from '@/context/MarginProvider';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

/**
 * Metadatos globales de la aplicación.
 *
 * Define el título, la descripción y los íconos del sitio, optimizando su visibilidad en buscadores y en dispositivos con diferentes temas.
 */
export const metadata: Metadata = {
  title: 'SwaplyAr | Pasar dólares de PayPal a pesos argentinos',
  description:
    'Descubre cómo Swaplyar simplifica tus Transferencias internacionales, billeteras virtuales o Cripto y gestión de pagos de manera segura, rápida y eficiente.',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/favicon-light.png',
        href: '/images/favicon-light.png',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/favicon-dark.png',
        href: '/images/favicon-dark.png',
      },
    ],
  },
};

/**
 * RootLayout - Layout global de la aplicación.
 *
 * @param children - Contenido de la página renderizada.
 * @returns Estructura principal del HTML y elementos globales.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* Integración de Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-W2VLHMCW" />
      <head>
        {/* Verificación de propiedad en Google Search Console */}
        <meta name="google-site-verification" content="bZu9PkFbaRVlAaT4NKUHZPD0o17JxMv08rBT-gzfpC0" />

        {/* Script para establecer el tema de la aplicación según las preferencias del usuario o del sistema */}
        <script>
          {`(function() {
            const theme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = theme === 'dark' || (!theme && systemPrefersDark);
            if (isDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          })();`}
        </script>
      </head>
      <body className={`bg-white text-lightText dark:bg-lightText dark:text-darkText`}>
        {/* Proveedores de contexto y herramientas de análisis */}
        <SessionProvider>
          <ThemeProvider>
            <MarginProvider>
              <GoogleAnalytics gaId="G-F7NZPRXT31" />
              <SpeedInsights />
              <Analytics />

              {/* Componentes globales de UI */}
              <TopMenu />
              {children}
              <Footer />
            </MarginProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

// /app/layout.tsx

/**
 * @file layout.tsx
 * @description Componente de diseño raíz de la aplicación, encargado de la configuración global,
 * la gestión del tema, la integración con herramientas de análisis y la estructura básica de la UI.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import Footer from '@/components/footer/Footer';
import { TopMenu } from '@/components/ui/top-menu/TopMenu';
import ThemeProvider from '../components/ui/theme-Provider/themeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { roboto } from '@/config/fonts/fonts';
import { MarginProvider } from '@/context/MarginProvider';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

/**
 * Metadata de la aplicación, incluyendo título, descripción y favicons.
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
 * @component RootLayout
 * @description Componente principal que define la estructura base de la aplicación.
 * Incluye proveedores de sesión y tema, configuraciones de análisis y la interfaz global.
 *
 * @param {React.ReactNode} children - Elementos secundarios de la aplicación.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <GoogleTagManager gtmId="GTM-W2VLHMCW" />
      <head>
        {/* Verificación de propiedad en Google Search Console */}
        <meta name="google-site-verification" content="bZu9PkFbaRVlAaT4NKUHZPD0o17JxMv08rBT-gzfpC0" />
      </head>

      <body className={`bg-white text-lightText dark:bg-lightText dark:text-darkText`}>
        {/* Integración de Google Analytics con next/script */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F7NZPRXT31" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F7NZPRXT31');
          `}
        </Script>

        {/* Manejo del modo oscuro basado en preferencias del sistema */}
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`
            (function() {
              const theme = localStorage.getItem('theme');
              const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const isDark = theme === 'dark' || (!theme && systemPrefersDark);
              isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
            })();
          `}
        </Script>

        <SessionProvider>
          <ThemeProvider>
            <MarginProvider>
              <SpeedInsights />
              <Analytics />
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

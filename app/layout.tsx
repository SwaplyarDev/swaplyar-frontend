import type { Metadata } from 'next';
import ThemeProvider from '../components/ui/theme-Provider/themeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { MarginProvider } from '@/context/MarginProvider';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Footerblog from '@/components/footerblog/Footerblog';
import { iconoMetadata, iconoMetadataDark } from '@/utils/assets/imgDatabaseCloudinary';

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
        url: iconoMetadata,
        href: iconoMetadata,
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: iconoMetadataDark,
        href: iconoMetadataDark,
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
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="theme-ready hydrated" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = theme === 'dark' || (!theme && systemPrefersDark);

                  if (isDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.backgroundColor = '#1a1a1a';
                    document.documentElement.style.color = '#ffffff';
                  } else {
                    document.documentElement.classList.remove('dark');
                  }

                  document.documentElement.classList.add('theme-ready', 'hydrated');
                } catch (e) {
                  console.error('Error applying theme script', e);
                }
              })();
            `,
          }}
        />

        {/* Integración de Google Tag Manager */}
        <GoogleTagManager gtmId="GTM-WMGWHJ7J" />

        {/* Verificación de propiedad en Google Search Console */}
        <meta
          name="google-site-verification"
          content="TDYMmlsmcxOohMXHebZJtRXZ-Y0otZk006ExVzrbPqs"
        />
      </head>
      <body className="theme-ready hydrated bg-white text-lightText dark:bg-lightText dark:text-darkText">
        <SessionProvider>
          {/* Integración de Google Analytics */}
          <GoogleAnalytics gaId="G-PX1MMJCPQL" />
          {/* {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-F7NZPRXT31" />} */}
          <ThemeProvider>
            <MarginProvider>
              <SpeedInsights />
              <Analytics />
              {children}
              <Footerblog />
            </MarginProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
'use client';

import { usePathname } from 'next/navigation';
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
import Script from 'next/script';
import Footerblog from '@/components/footerblog/Footerblog';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname(); // Obtener la URL actual

  return (
    <html lang="es">
      <head>
        <GoogleTagManager gtmId="GTM-W2VLHMCW" />
        <meta name="google-site-verification" content="bZu9PkFbaRVlAaT4NKUHZPD0o17JxMv08rBT-gzfpC0" />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              const theme = localStorage.getItem('theme');
              const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const isDark = theme === 'dark' || (!theme && systemPrefersDark);
              if (isDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })();
          `}
        </Script>
      </head>
      <body className={`bg-white text-lightText dark:bg-lightText dark:text-darkText`}>
        <SessionProvider>
          <GoogleAnalytics gaId="G-F7NZPRXT31" />
          <ThemeProvider>
            <MarginProvider>
              <SpeedInsights />
              <Analytics />
              <TopMenu />
              {children}
              {pathname === '/blog' ? <Footerblog /> : <Footer />}
            </MarginProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

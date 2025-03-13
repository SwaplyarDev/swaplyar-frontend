import { usePathname } from 'next/navigation';
import { getTranslatedPath, routes } from './routes';

export const useLocalizedPath = () => {
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // ✅ Extrae el idioma de la URL

  return (routeKey: keyof typeof routes) => {
    return `/${locale}${getTranslatedPath(routeKey, locale as keyof (typeof routes)[typeof routeKey])}`;
  };
};

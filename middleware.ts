import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { middleware as localeMiddleware } from './middleware/locale';
import { middleware as authMiddleware } from './middleware/auth';
import { routing } from '@/i18n/routing';
import { routes, getTranslatedPath } from './i18n/routes';

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const searchParams = nextUrl.search; // ✅ Capturar los query parameters
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments.length > 0 ? segments[0] : null;

  // 🔴 **Si la URL es `/`, redirigir a `/es` en lugar de `/en`**
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}${searchParams}`, req.url));
  }

  // 🔴 **Si la URL tiene un idioma no permitido, redirigir a `/es`**
  if (!routing.locales.includes(locale as any)) {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}${searchParams}`, req.url));
  }

  // Obtener la ruta base sin el prefijo de idioma
  const cleanPath = `/${segments.slice(1).join('/')}`;

  // 🔎 **Detectar si la ruta existe en `routes.ts` (incluyendo dinámicas)**
  const matchedRoute = Object.entries(routes).find(([_, paths]) =>
    Object.values(paths).some((path) => {
      const regex = new RegExp(`^${path.replace(/\[.*?\]/g, '([^/]+)')}$`);
      return regex.test(cleanPath);
    }),
  );

  if (matchedRoute) {
    const routeKey = matchedRoute[0] as keyof typeof routes;
    const originalPath = matchedRoute[1][routing.defaultLocale];

    // 🔍 **Extraer valores dinámicos de la URL original**
    const paramKeys = (originalPath.match(/\[.*?\]/g) || []).map((p) => p.replace(/\[|\]/g, ''));
    const paramValues =
      cleanPath.match(
        new RegExp(matchedRoute[1][locale as keyof (typeof matchedRoute)[1]].replace(/\[.*?\]/g, '([^/]+)')) || [],
      ) || [];

    const params: Record<string, string> = {};
    paramKeys.forEach((key, index) => {
      params[key] = paramValues[index + 1] || segments[index + 2] || ''; // ✅ Asegurar que el parámetro no se borre
    });

    // 🔄 **Generar la nueva ruta traducida con los parámetros dinámicos**
    const translatedPath = getTranslatedPath(routeKey, locale as keyof (typeof routes)[typeof routeKey], params);

    // 🔄 **Redirigir si la URL no está en su versión traducida correcta**
    if (`/${locale}${cleanPath}` !== `/${locale}${translatedPath}`) {
      return NextResponse.redirect(new URL(`/${locale}${translatedPath}${searchParams}`, req.url)); // ✅ Mantener los parámetros de búsqueda
    }
  }

  // ✅ Si la URL ya tiene un idioma válido (`/es` o `/en`), continuar normalmente
  return localeMiddleware(req) ?? authMiddleware(req, { params: {} });
}

// ✅ Ahora solo permitimos `/en` y `/es` en las rutas
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|gif|fonts|logos|icons|public).*)',
  ],
};

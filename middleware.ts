import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { middleware as localeMiddleware } from './middleware/locale';
import { middleware as authMiddleware } from './middleware/auth';
import { routing } from '@/i18n/routing';
import { routes } from './i18n/routes';

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments.length > 0 ? segments[0] : null;

  // 🔴 **Si la URL es `/`, redirigir a `/es` en lugar de `/en`**
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, req.url));
  }

  // 🔴 **Si la URL tiene un idioma no permitido, redirigir a `/es`**
  if (!routing.locales.includes(locale as any)) {
    console.warn(`Idioma no permitido: ${locale}. Redirigiendo a /${routing.defaultLocale}`);
    const newUrl = new URL(`/${routing.defaultLocale}`, req.url);
    return NextResponse.redirect(newUrl);
  }

  // Obtener la ruta base sin el prefijo de idioma
  const cleanPath = pathname.replace(`/${locale}`, '') || '/';

  // Buscar si la ruta existe en `routes.ts`
  const translatedPath = Object.entries(routes).find(([_, paths]) =>
    Object.values(paths).includes(cleanPath as (typeof paths)[keyof typeof paths]),
  );

  if (translatedPath) {
    const routeKey = translatedPath[0] as keyof typeof routes;
    const newPath = routes[routeKey][locale as keyof (typeof routes)[typeof routeKey]];

    // Si la URL no está en su versión traducida correcta, redirigir
    if (newPath && cleanPath !== newPath) {
      return NextResponse.redirect(new URL(`/${locale}${newPath}`, req.url));
    }
  }

  // ✅ Si la URL ya tiene un idioma válido (`/es` o `/en`), continuar normalmente
  return localeMiddleware(req) ?? authMiddleware(req, { params: {} });
}

// ✅ Ahora solo permitimos `/en` y `/es` en las rutas
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public).*)', // ❌ Excluye archivos estáticos
  ],
};

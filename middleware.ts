import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth'; // Importa NextAuth correctamente
import { configRoutes } from './config/routes';
import { createRouteMatchers } from './lib/route';
import { routeTranslations } from './lib/routes';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const locale = req.nextUrl.locale;

  // Eliminar el prefijo del idioma
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');

  // Buscar la ruta traducida
  for (const [originalPath, translations] of Object.entries(routeTranslations)) {
    // Si estamos en la ruta original pero en un idioma diferente
    if (pathnameWithoutLocale === originalPath && locale !== 'en' && translations[locale] !== originalPath) {
      // Redirigir a la versión traducida
      return NextResponse.redirect(new URL(`/${locale}${translations[locale]}`, req.url));
    }

    // Si estamos en una ruta traducida pero en otro idioma
    if (locale !== 'en') {
      const isTranslatedPath = Object.values(translations).includes(pathnameWithoutLocale);
      if (isTranslatedPath) {
        // Encontrar la ruta correcta para el idioma actual
        const correctPath = translations[locale];
        if (pathnameWithoutLocale !== correctPath) {
          return NextResponse.redirect(new URL(`/${locale}${correctPath}`, req.url));
        }
      }
    }
  }

  // 2️⃣ Obtener la sesión de autenticación
  const session = await auth(); // ⚠️ `auth()` NO recibe `req` como parámetro

  try {
    const { isPublicRoute, isProtectedRoute, isApiRoute, isAuthRoute } = createRouteMatchers(configRoutes, req);
    const { nextUrl } = req;
    const isLoggedIn = !!session; // Verifica si hay un usuario autenticado

    // 3️⃣ Redirigir al mantenimiento si la ruta contiene "blog"
    if (nextUrl.pathname.includes('blog')) {
      return NextResponse.redirect(new URL('/maintenance', req.url));
    }

    // 4️⃣ Protección de rutas /admin
    const isAdminRoute = nextUrl.pathname.startsWith('/admin');

    if (isProtectedRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (isAdminRoute) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      const userRole = session?.user?.role;
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // 5️⃣ Bloquear acceso directo a `/request` sin referer válido
    if (nextUrl.pathname === '/request') {
      const referer = req.headers.get('referer');
      if (!referer || !referer.includes('/')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error('Error en middleware:', err);
    return NextResponse.redirect(new URL('/error-500', req.url));
  }
}

// Aplicar el middleware en todas las rutas excepto API, estáticos e imágenes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

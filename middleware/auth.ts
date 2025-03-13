import { NextResponse } from 'next/server';
import { auth } from '../auth'; // Importa el objeto `auth` de tu configuración de NextAuth
import { configRoutes } from '../config/routes';
import { createRouteMatchers } from '../lib/route';

export const middleware = auth((req) => {
  try {
    const { isPublicRoute, isProtectedRoute, isApiRoute, isAuthRoute } = createRouteMatchers(configRoutes, req);
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Verificar si la ruta está bajo /admin
    const isAdminRoute = nextUrl.pathname.startsWith('/admin');

    // Redirigir si la ruta es protegida y el usuario no está logueado
    if (isProtectedRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Verificar si la ruta es /admin y el usuario no es admin
    if (isAdminRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (isAdminRoute && isLoggedIn) {
      const userRole = req.auth?.user?.role; // Obtener el rol del usuario desde el token JWT
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url)); // Redirigir al home si no es admin
      }
    }
    if (nextUrl.pathname === '/request') {
      const referer = req.headers.get('referer'); // Obtener la URL previa
      if (!referer || !referer.includes('/')) {
        return NextResponse.redirect(new URL('/', req.url)); // Bloquear acceso directo
      }
    }

    // Permitir el acceso si no hay problemas
    return NextResponse.next();
  } catch (err) {
    console.error('Error de servidor ', err);
    return NextResponse.redirect(new URL('/error-500', req.url));
  }
});

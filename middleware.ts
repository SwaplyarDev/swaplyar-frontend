import { NextResponse } from 'next/server';
import { auth } from './auth'; // Importa el objeto `auth` de tu configuración de NextAuth
import { configRoutes } from './config/routes';
import { createRouteMatchers } from './lib/route';

export default auth((req) => {
  try {
    const { isPublicRoute, isProtectedRoute, isApiRoute } = createRouteMatchers(configRoutes, req);
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Redirigir al home si la ruta contiene "blog"
    if (nextUrl.pathname.includes('blog')) {
      return NextResponse.redirect(new URL('/es/pagina-en-mantenimiento', req.url));
    }

    // Verificar si la ruta está bajo /admin
    const isAdminRoute = nextUrl.pathname.startsWith('/es/admin');

    if (isAdminRoute && isLoggedIn) {
      const userRole = req.auth?.decodedToken.role; // Obtener el rol del usuario desde el token JWT
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url)); // Redirigir al home si no es admin
      }
    }
    // Verificar si la ruta está bajo /es/auth

    const isAuthRoute = nextUrl.pathname.startsWith('/es/auth');

    if (!isAuthRoute && isLoggedIn && !isAdminRoute) {
      return NextResponse.redirect(new URL('/es/auth/solicitud', req.url));
    }
    // Redirigir si la ruta es protegida y el usuario no está logueado
    if (isProtectedRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL('/es/iniciar-sesion-o-registro', req.url));
    }

    // Verificar si la ruta es /admin y el usuario no es admin
    if (isAdminRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (isAuthRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL('/es/iniciar-sesion-o-registro', req.url));
    }

    if (nextUrl.pathname === '/es/inicio/formulario-de-solicitud') {
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

export const config = {
  /*
    Match all request paths except for the ones starting with:
    api (API routes)
    _next/static (static files)
    _next/image (image optimization files)
    favicon.ico (favicon file)
  */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

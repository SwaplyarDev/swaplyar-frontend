import { NextResponse } from 'next/server';
import { auth } from './auth';
import { configRoutes } from './config/routes';
import { createRouteMatchers } from './lib/route';

export default auth((req) => {
  try {
    const { isPublicRoute, isProtectedRoute } = createRouteMatchers(configRoutes, req);
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const pathname = nextUrl.pathname;
    const isAdminRoute = pathname.startsWith('/es/admin');
    const isAuthSectionRoute = pathname.startsWith('/es/auth');
    const isLoginRoute = configRoutes.authRoutes.includes(pathname);

    // 1) Rutas de Admin: requieren login y rol admin
    if (isAdminRoute) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/es/iniciar-sesion-o-registro', req.url));
      }
      const role = (req.auth as any)?.user?.role;
      if (role !== 'admin') {
        return NextResponse.redirect(new URL('/es/auth/solicitud', req.url));
      }
    }

    // 2) Rutas protegidas (incluye /es/auth/* por config): requieren login
    if (isProtectedRoute && !isLoggedIn) {
      return NextResponse.redirect(new URL('/es/iniciar-sesion-o-registro', req.url));
    }

    // 3) Si ya está logueado y visita rutas de login/registro, redirigir al dashboard
    if (isLoggedIn && isLoginRoute) {
      return NextResponse.redirect(new URL('/es/auth/solicitud', req.url));
    }

    // 4) Bloqueo de acceso directo a formularios específicos
    if (
      pathname === '/es/inicio/formulario-de-solicitud' ||
      pathname === '/es/auth/solicitud/formulario-de-solicitud'
    ) {
      const referer = req.headers.get('referer');
      if (!referer || !referer.includes('/')) {
        return NextResponse.redirect(new URL('/', req.url));
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

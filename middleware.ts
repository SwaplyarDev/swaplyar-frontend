import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from './auth.config';
import { configRoutes } from './config/routes/index';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Permitir todas las rutas de API que no sean de autenticación
  if (configRoutes.apiRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }
  // Permitir todas las rutas de API de autenticación
  // if (nextUrl.pathname.startsWith(configRoutes.apiRoutes[0])) {
  //     return NextResponse.next();
  // }

  // Permitir acceso a rutas públicas sin importar el estado de autenticación
  if (configRoutes.publicRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
  if (isLoggedIn && configRoutes.authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  // Redirigir a /auth/login si el usuario no está logueado y trata de acceder a una ruta protegida
  if (
    !isLoggedIn &&
    !configRoutes.authRoutes.includes(nextUrl.pathname) &&
    !configRoutes.publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/auth/login-register', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

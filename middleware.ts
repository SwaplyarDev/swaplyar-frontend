import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { pathToRegexp } from "path-to-regexp";
import authConfig from "./auth.config";
import { configRoutes } from "./config/routes/index";

const { auth } = NextAuth(authConfig);

// Función para verificar si una ruta es pública
function isPublicRoute(pathname: string): boolean {
  return configRoutes.publicRoutes.some((route) => {
    const { regexp } = pathToRegexp(route);  // Accedemos al objeto y extraemos la expresión regular
    return regexp.test(pathname);  // Ahora podemos usar test() en la expresión regular
  });
}
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Permitir todas las rutas de API que no sean de autenticación
  if (configRoutes.apiRoutes.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Permitir acceso a rutas públicas sin importar el estado de autenticación
  if (isPublicRoute(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
  if (isLoggedIn && configRoutes.authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/error404", nextUrl));
  }

  // Redirigir a /auth/login si el usuario no está logueado y trata de acceder a una ruta protegida
  if (
    !isLoggedIn &&
    !configRoutes.authRoutes.includes(nextUrl.pathname) &&
    !isPublicRoute(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/error404", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
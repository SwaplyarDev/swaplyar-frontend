import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from './auth.config';
import { configRoutes } from './config/routes';
import { createRouteMatchers } from './lib/route';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { isPublicRoute, isProtectedRoute, isApiRoute, isAuthRoute } = createRouteMatchers(configRoutes, req);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // console.log(Middleware: ${req.nextUrl.pathname});
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

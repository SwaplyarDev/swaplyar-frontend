import type { ConfigRoutes } from '@/types/routes';

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    '/',
    // '/auth/change-password',
    '/es/quienes-somos',
    '/info/blog',
    '/info/blog/:cardId',
    '/es/centro-de-ayuda',
    '/es/como-usar-swaplyar',
    '/es/programa-de-fidelizacion',
    '/info/terms-and-conditions',
    '/es/garantia',
    '/info/why-choose-swaplyar',
    '/info/sapr-terms-conditions',
    '/es/centro-de-ayuda/preguntas-frecuentes',
    '/request',
    '/es/centro-de-ayuda/estado-de-solicitud',
    '/repentance',
    '/es/centro-de-ayuda/editar-solicitud',
  ],
  authRoutes: ['/es/iniciar-sesion-o-registro', '/es/iniciar-sesion-o-registro/verificacion-email'],
  apiRoutes: ['/api/login', '/api/users', '/api/company', '/api/roles', '/api/paypal'],
  protectedRoutes: ['/es/auth/:path*', '/es/admin/:path*'],
};

import type { ConfigRoutes } from '@/types/routes';

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    '/',
    // '/auth/change-password',
    '/info/about-us',
    '/info/blog',
    '/info/blog/:cardId',
    '/info/help-center',
    '/info/how-to-use',
    '/info/loyalty-program',
    '/info/terms-and-conditions',
    '/info/warranty',
    '/info/why-choose-swaplyar',
    '/info/sapr-terms-conditions',
    '/info/questions',
    '/request',
    '/request/search-request',
    '/repentance',
    '/editRequest',
  ],
  authRoutes: ['/es/iniciar-sesion-o-registro', '/es/iniciar-sesion-o-registro/verificacion-email'],
  apiRoutes: ['/api/login', '/api/users', '/api/company', '/api/roles', '/api/paypal'],
  protectedRoutes: ['/es/auth/:path*', '/es/admin/:path*'],
};

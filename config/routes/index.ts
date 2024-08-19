import type { ConfigRoutes } from '@/types/routes';

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    '/',
    '/auth/login',
    '/auth/change-password',
    '/info/about-us',
    '/info/help-center',
    '/info/how-to-use',
    '/info/loyalty-program',
    '/info/terms-and-conditions',
    '/info/warranty',
    '/info/why-choose-swaplyar',
    '/request',
  ],
  authRoutes: ['/auth/login'],
  apiRoutes: ['/api/login', '/api/users', '/api/company', '/api/roles'],
  protectedRoutes: ['/auth/settings', '/products/:path*'],
};

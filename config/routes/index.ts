import type { ConfigRoutes } from '@/types/routes';

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    '/',
    '/auth/change-password',
    '/info/about-us',
    '/info/help-center',
    '/info/how-to-use',
    '/info/loyalty-program',
    '/info/terms-and-conditions',
    '/info/warranty',
    '/info/why-choose-swaplyar',
    '/request',
    '/auth/login-register',
    '/info/sapr-terms-conditions'
  ],
  authRoutes: ['/auth/login-register'],
  apiRoutes: [
    '/api/login',
    '/api/users',
    '/api/company',
    '/api/roles',
    '/api/paypal',
  ],
  protectedRoutes: ['/products/:path*'],
};

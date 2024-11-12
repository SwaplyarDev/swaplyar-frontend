import type { ConfigRoutes } from '@/types/routes';

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    '/',
    '/auth/change-password',
    '/info/about-us',
    '/info/blog',
    '/info/help-center',
    '/info/how-to-use',
    '/info/loyalty-program',
    '/info/terms-and-conditions',
    '/info/warranty',
    '/info/why-choose-swaplyar',
    '/info/sapr-terms-conditions',
    '/error404',
    '/request',
  ],
  authRoutes: [
    '/auth/login-register',
    '/auth/login-register/email-verification',
  ],
  apiRoutes: [
    '/api/login',
    '/api/users',
    '/api/company',
    '/api/roles',
    '/api/paypal',
  ],
  protectedRoutes: ['/products/:path*'],
};

import type { ConfigRoutes } from '@/types/routes';

export const configRoutes: ConfigRoutes = {
  publicRoutes: [
    '/',
    '/es/quienes-somos',
    '/es/blog',
    '/es/centro-de-ayuda',
    '/es/centro-de-ayuda/preguntas-frecuentes',
    '/es/centro-de-ayuda/estado-de-solicitud',
    '/es/centro-de-ayuda/editar-solicitud',
    '/es/centro-de-ayuda/cancelacion-y-reembolso',
    '/es/centro-de-ayuda/prevencion-y-fraude',
    '/es/como-usar-swaplyar',
    '/es/programa-de-fidelizacion',
    '/es/terminos-y-condiciones',
    '/es/garantia',
    '/es/inicio/formulario-de-solicitud',
    '/es/registro',
    '/es/iniciar-sesion',
    '/es/iniciar-sesion/verificacion-email',
  ],
  authRoutes: [
    '/es/iniciar-sesion-o-registro',
    '/es/iniciar-sesion-o-registro/verificacion-email',
  ],
  apiRoutes: [
    '/api/login',
    '/api/users',
    '/api/company',
    '/api/roles',
    '/api/paypal',
  ],
  protectedRoutes: [
    '/es/auth',
    '/es/admin',
  ],
};

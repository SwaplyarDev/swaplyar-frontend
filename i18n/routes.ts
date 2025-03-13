export const routes = {
  aboutUs: {
    en: '/info/about-us',
    es: '/info/sobre-nosotros',
  },
  helpCenter: {
    en: '/info/help-center',
    es: '/info/centro-de-ayuda',
  },
  howToUse: {
    en: '/info/how-to-use',
    es: '/info/como-usar-swaplyar',
  },
  loyaltyProgram: {
    en: '/info/loyalty-program',
    es: '/info/programa-de-fidelizacion',
  },
  questions: {
    en: '/info/questions',
    es: '/info/preguntas-frecuentes',
  },
  termsFraudPrevention: {
    en: '/info/terms/fraud-prevention',
    es: '/info/terminos/prevencion-de-fraude',
  },
  termsSapTermsConditions: {
    en: '/info/terms/sapr-terms-conditions',
    es: '/info/terminos/terminos-y-condiciones-sapr',
  },
  termsAndConditions: {
    en: '/info/terms/terms-and-conditions',
    es: '/info/terminos/terminos-y-condiciones',
  },
  warranty: {
    en: '/info/warranty',
    es: '/info/garantia',
  },
  whyChooseSwaplyar: {
    en: '/info/why-choose-swaplyar',
    es: '/info/por-que-elegir-swaplyar',
  },
  maintenance: {
    en: '/maintenance/[section]',
    es: '/mantenimiento/[section]',
  },
  repentance: {
    en: '/repentance',
    es: '/arrepentimiento',
  },
  request: {
    en: '/request',
    es: '/solicitud',
  },
  requestSearchRequest: {
    en: '/request/search-request',
    es: '/solicitud/buscar-solicitud',
  },
  requestCompleted: {
    en: '/request-completed/[id]',
    es: '/solicitud-completada/[id]',
  },
  testError: {
    en: '/test-error',
    es: '/error-de-prueba',
  },
  blogPost: {
    en: '/maintenance',
    es: '/mantenimiento',
  },
  editRequest: {
    en: '/editRequest',
    es: '/editar-solicitud',
  },
  authLoginRegisterLogin: {
    en: '/auth/login-register',
    es: '/auth/iniciar-sesion-registro',
  },
  authLoginRegisterRegister: {
    en: '/auth/login-register',
    es: '/auth/iniciar-sesion-registro',
  },
  authEmailVerification: {
    en: '/auth/login-register/email-verification',
    es: '/auth/iniciar-sesion-registro/verificacion-de-correo',
  },
} as const;

export const getTranslatedPath = (
  routeKey: keyof typeof routes,
  locale: keyof (typeof routes)[typeof routeKey],
  params?: Record<string, string>,
): string => {
  if (!routes[routeKey]) {
    console.warn(`getTranslatedPath: La ruta '${routeKey}' no existe en routes.ts`);
    return '/'; // ✅ Retorna una ruta válida por defecto
  }

  let path: string = routes[routeKey][locale] || routes[routeKey].en || '/';

  if (params) {
    Object.keys(params).forEach((key) => {
      path = path.replace(`[${key}]`, params[key]);
    });
  }

  return path;
};

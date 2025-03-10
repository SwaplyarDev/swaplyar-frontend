// lib/routes.ts
export const routeTranslations: Record<string, Record<string, string>> = {
  '/info/about-us': {
    en: '/info/about-us',
    es: '/info/sobre-nosotros',
  },
  '/info/how-to-use': {
    en: '/info/how-to-use',
    es: '/info/como-usar-swaplyar',
  },
};

export function getLocalizedRoute(path: string, locale: string): string {
  for (const [key, translations] of Object.entries(routeTranslations)) {
    if (translations[locale as keyof typeof translations] === path) {
      return path;
    }

    if (key === path) {
      return translations[locale as keyof typeof translations] || path;
    }
  }

  return path;
}

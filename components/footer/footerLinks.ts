// /components/footer/footerLinks.ts
import { routes } from '@/i18n/routes';
import { faLinkedin, faInstagram, faFacebook, faWhatsapp, IconDefinition } from '@fortawesome/free-brands-svg-icons';

interface FooterLink {
  href: keyof typeof routes;
  label: string;
  view?: 'login' | 'register';
}

interface SocialLink {
  href: string;
  icon: IconDefinition;
  label: string;
}

export const footerLinks = {
  registro: [
    { href: 'authLoginRegisterLogin', label: 'Iniciar Sesión', view: 'login' },
    { href: 'authLoginRegisterRegister', label: 'Registrarse', view: 'register' },
    { href: 'loyaltyProgram', label: 'Programa de Fidelización' },
  ] as FooterLink[],
  normativa: [
    { href: 'warranty', label: 'Garantía' },
    { href: 'termsAndConditions', label: 'Términos y Condiciones' },
    { href: 'termsSapTermsConditions', label: 'T&C Plus Rewards' },
  ] as FooterLink[],
  atencion: [
    { href: 'helpCenter', label: 'Centro de Ayuda' },
    { href: 'questions', label: 'Preguntas Frecuentes' },
    { href: 'blogPost', label: 'SwaplyAr Blog' },
  ] as FooterLink[],
  social: [
    { href: 'https://www.linkedin.com/company/swaplyar/', icon: faLinkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/swaplyar/', icon: faInstagram, label: 'Instagram' },
    { href: 'https://www.facebook.com/swaplyar/', icon: faFacebook, label: 'Facebook' },
    { href: 'https://wa.me/5491123832198', icon: faWhatsapp, label: 'WhatsApp' },
  ] as SocialLink[],
};

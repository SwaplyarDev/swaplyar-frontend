// /components/footer/footerLinks.ts
import { faLinkedin, faInstagram, faFacebook, faWhatsapp, IconDefinition } from '@fortawesome/free-brands-svg-icons';

interface FooterLink {
  href: string;
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
    { href: '/auth/login-register', label: 'Iniciar Sesión', view: 'login' },
    { href: '/auth/login-register', label: 'Registrarse', view: 'register' },
    { href: '/info/loyalty-program', label: 'Programa de Fidelización' },
  ] as FooterLink[],
  normativa: [
    { href: '/info/warranty', label: 'Garantía' },
    { href: '/info/terms/terms-and-conditions', label: 'Términos y Condiciones' },
    { href: '/info/terms/sapr-terms-conditions', label: 'T&C Plus Rewards' },
  ] as FooterLink[],
  atencion: [
    { href: '/info/help-center', label: 'Centro de Ayuda' },
    { href: '/info/questions', label: 'Preguntas Frecuentes' },
    { href: '/blog', label: 'SwaplyAr Blog' },
  ] as FooterLink[],
  social: [
    { href: 'https://www.linkedin.com/company/swaplyar/', icon: faLinkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/swaplyar/', icon: faInstagram, label: 'Instagram' },
    { href: 'https://www.facebook.com/swaplyar/', icon: faFacebook, label: 'Facebook' },
    { href: 'https://wa.me/5491123832198', icon: faWhatsapp, label: 'WhatsApp' },
  ] as SocialLink[],
};

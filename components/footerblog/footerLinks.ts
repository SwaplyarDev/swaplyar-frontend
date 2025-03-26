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
    { href: '/es/iniciar-sesion-o-registro', label: 'Iniciar Sesión', view: 'login' },
    { href: '/es/iniciar-sesion-o-registro', label: 'Registrarse', view: 'register' },
    { href: '/es/programa-de-fidelizacion', label: 'Programa de Fidelización' },
  ] as FooterLink[],
  normativa: [
    { href: '/es/garantia', label: 'Garantía' },
    { href: '/es/terminos-y-condiciones/tyc-swaplyar', label: 'Términos y Condiciones' },
    { href: '/es/terminos-y-condiciones/tyc-plus-rewards', label: 'T&C Plus Rewards' },
  ] as FooterLink[],
  atencion: [
    { href: '/es/centro-de-ayuda', label: 'Centro de Ayuda' },
    { href: '/es/quienes-somos', label: 'Preguntas Frecuentes' },
    { href: '/es/pagina-en-mantenimiento', label: 'SwaplyAr Blog' },
  ] as FooterLink[],
  social: [
    { href: 'https://www.linkedin.com/company/swaplyar/', icon: faLinkedin, label: 'LinkedIn' },
    { href: 'https://www.instagram.com/swaplyar/', icon: faInstagram, label: 'Instagram' },
    { href: 'https://www.facebook.com/swaplyar/', icon: faFacebook, label: 'Facebook' },
    { href: 'https://wa.me/5491123832198', icon: faWhatsapp, label: 'WhatsApp' },
  ] as SocialLink[],
};

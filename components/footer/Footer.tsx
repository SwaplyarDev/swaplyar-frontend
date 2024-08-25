'use client';

import Link from 'next/link';
import Image from 'next/image';
import S from '../../public/images/logo-solo.png';
import SDark from '../../public/images/dark-mode-footerr-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import useStore from '@/store/authViewStore';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider'; // Asegúrate de importar el hook useDarkTheme

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  view?: 'login' | 'register';
}

function FooterLink({ href, children, view }: FooterLinkProps) {
  const { setView } = useStore();
  return (
    <Link
      href={href}
      {...(view ? { onClick: () => setView(view) } : {})}
      className="rs-link text-sm text-blue-500 dark:text-sky-500 transition duration-200 ease-in-out hover:text-blue-700"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const { isDark } = useDarkTheme(); 

  return (
    <footer className="rs-wrapper-v4 py-8 bg-white dark:bg-gray-900 mx-auto mb-12 w-full px-4">
      <div className="one-info-footer flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between px-4 sm:w-4/5 md:mx-auto">
        <div className="flex flex-col items-center sm:items-start dark:text-white text-center sm:text-left w-full sm:w-1/3 mb-4 sm:mb-0 sm:w-80%">
          <h4 className="text-gray-900 text-lg dark:text-white mb-2">Regístrate y disfruta de beneficios</h4>
          <FooterLink href="/auth/login">Iniciar Sesión</FooterLink>
          <FooterLink href="/auth/new-account">Registrarse</FooterLink>
          <FooterLink href="/info/loyalty-program">Programa de Fidelización</FooterLink>
        </div>
        <div className="flex flex-col items-center sm:items-center dark:text-white text-center sm:text-center w-full sm:w-1/3 mb-4 sm:mb-0 sm:w-80%">
          <h4 className="text-gray-900 text-lg dark:text-white mb-2">Normativa</h4>
          <FooterLink href="/info/warranty">Garantía</FooterLink>
          <FooterLink href="/info/terms-and-conditions">Términos y condiciones</FooterLink>
          <FooterLink href="/info/privacy-policy">Política de privacidad</FooterLink>
        </div>

        <div className="flex flex-col items-center sm:items-end dark:text-white text-center sm:text-right w-full sm:w-1/3 sm:w-80%">
          <h4 className="text-gray-900 text-lg dark:text-white mb-2">Atención al Cliente</h4>
          <FooterLink href="/info/centro-de-ayuda">Centro de Ayuda</FooterLink>
          <FooterLink href="/info/quienes-somos">Quienes Somos</FooterLink>
          <FooterLink href="/info/por-que-elegir-swaplyar">¿Por qué Elegir SwaplyAr?</FooterLink>
        </div>
      </div>

      <div className="two-info-footer flex flex-col sm:flex-row items-center justify-between mt-5 px-4 pt-4 sm:w-9/12 sm:mx-auto">
        <div className="container-footer-icon-social flex justify-center sm:justify-start space-x-4 mb-4 sm:mb-0 sm:w-1/3">
          <a href="https://www.linkedin.com/company/swaplyar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="SwaplyAr CEO en LinkedIn" className="hover:opacity-75 transition-opacity duration-200">
            <FontAwesomeIcon icon={faLinkedin} className="text-[#012D8A] text-2xl dark:text-white" />
          </a>
          <a href="https://www.instagram.com/swaplyar/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="SwaplyAr en Instagram" className="hover:opacity-75 transition-opacity duration-200">
            <FontAwesomeIcon icon={faInstagram} className="text-[#012D8A] text-2xl dark:text-white" />
          </a>
          <a href="https://www.facebook.com/swaplyar/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="SwaplyAr en Facebook" className="hover:opacity-75 transition-opacity duration-200">
            <FontAwesomeIcon icon={faFacebook} className="text-[#012D8A] text-2xl dark:text-white" />
          </a>
          <a href="https://wa.me/5491123832198" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="SwaplyAr en WhatsApp" className="hover:opacity-75 transition-opacity duration-200">
            <FontAwesomeIcon icon={faWhatsapp} className="text-[#012D8A] text-2xl dark:text-white" />
          </a>
        </div>
        <div className="flex-grow flex justify-center sm:justify-center mb-4 sm:mb-0 sm:w-1/3">
          <Link href="/">
            <Image src={isDark ? SDark : S} alt="Cambiar saldo online" width={65} height={70} /> 
          </Link>
        </div>
        <div className="flex items-center justify-center sm:justify-end sm:w-1/3">
          <p className="text-gray-600 dark:text-gray-400 text-center text-xs">
            Todos los derechos reservados © SWAPLYAR | Group OA
          </p>
        </div>
      </div>
    </footer>
  );
}

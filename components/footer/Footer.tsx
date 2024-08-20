'use client';

import Link from 'next/link';
import Image from 'next/image';
import S from '../../public/images/logo-solo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faInstagram,
  faFacebook,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import useStore from '@/store/authViewStore';

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
      className="rs-link text-sm text-blue-500 transition duration-200 ease-in-out hover:text-blue-700"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="rs-wrapper-v4 mx-auto mb-12 w-full bg-white px-4 py-8 dark:bg-gray-900">
      <div className="one-info-footer flex flex-col gap-4 px-4 sm:w-4/5 sm:flex-row sm:justify-between sm:gap-0 md:mx-auto">
        <div className="mb-4 flex flex-col items-start text-left sm:mb-0 sm:w-1/3">
          <h4 className="mb-2 text-lg text-gray-900 dark:text-white">
            Regístrate y disfruta de beneficios
          </h4>
          <FooterLink href="/auth/login-register" view="login">
            Iniciar Sesión
          </FooterLink>
          <FooterLink href="/auth/login-register" view="register">
            Registrarse
          </FooterLink>
          <FooterLink href="/info/loyalty-program">
            Programa de Fidelización
          </FooterLink>
        </div>
        <div className="mb-4 flex flex-col items-start text-left sm:mb-0 sm:w-1/3 sm:items-center sm:text-center">
          <h4 className="mb-2 text-lg text-gray-900 dark:text-white">
            Normativa
          </h4>
          <FooterLink href="/info/warranty">Garantía</FooterLink>
          <FooterLink href="/info/terms-and-conditions">
            Términos y condiciones
          </FooterLink>
          <FooterLink href="/info/privacy-policy">
            Política de privacidad
          </FooterLink>
        </div>

        <div className="flex flex-col items-start text-left sm:w-1/3 sm:items-end sm:text-right">
          <h4 className="mb-2 text-lg text-gray-900 dark:text-white">
            Atención al Cliente
          </h4>
          <FooterLink href="/info/help-center">Centro de Ayuda</FooterLink>
          <FooterLink href="/info/about-us">Quienes Somos</FooterLink>
          <FooterLink href="/info/why-choose-swaplyar">
            ¿Por qué Elegir SwaplyAr?
          </FooterLink>
        </div>
      </div>

      <div className="two-info-footer mt-5 flex flex-col items-center justify-between px-4 pt-4 sm:mx-auto sm:w-9/12 sm:flex-row">
        <div className="container-footer-icon-social mb-4 flex justify-center space-x-4 sm:mb-0 sm:w-1/3 sm:justify-start">
          <a
            href="https://www.linkedin.com/company/swaplyar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="SwaplyAr CEO en LinkedIn"
            className="transition-opacity duration-200 hover:opacity-75"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-2xl text-[#012D8A]"
            />
          </a>
          <a
            href="https://www.instagram.com/swaplyar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="SwaplyAr en Instagram"
            className="transition-opacity duration-200 hover:opacity-75"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-2xl text-[#012D8A]"
            />
          </a>
          <a
            href="https://www.facebook.com/swaplyar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="SwaplyAr en Facebook"
            className="transition-opacity duration-200 hover:opacity-75"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-2xl text-[#012D8A]"
            />
          </a>
          <a
            href="https://wa.me/5491123832198"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="SwaplyAr en WhatsApp"
            className="transition-opacity duration-200 hover:opacity-75"
          >
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-2xl text-[#012D8A]"
            />
          </a>
        </div>
        <div className="mb-4 flex flex-grow justify-center sm:mb-0 sm:w-1/3 sm:justify-center">
          <Link href="/">
            <Image src={S} alt="Cambiar saldo online" width={65} height={70} />
          </Link>
        </div>
        <div className="flex items-center justify-center sm:w-1/3 sm:justify-end">
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            Todos los derechos reservados © SWAPLYAR | Group OA
          </p>
        </div>
      </div>
    </footer>
  );
}

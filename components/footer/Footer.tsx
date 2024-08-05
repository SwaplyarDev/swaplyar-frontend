'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedin,
    faInstagram,
    faFacebook,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';

interface FooterLinkProps {
    href: string;
    children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
    return (
        <Link href={href} className="rs-link text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out">
            {children}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer className="rs-wrapper-v4 py-8 bg-gray-100 dark:bg-gray-900">
            <div className="one-info-footer grid grid-cols-1 sm:grid-cols-3 gap-8 px-8">
                <div className="flex flex-col items-start">
                    <h4 className="text-gray-900 dark:text-white mb-4 font-semibold">Regístrate y disfruta de beneficios</h4>
                    <FooterLink href="/auth/login">Iniciar Sesión</FooterLink>
                    <FooterLink href="/auth/new-account">Registrarse</FooterLink>
                    <FooterLink href="/info/loyalty-program">Programa de Fidelización</FooterLink>
                </div>
                <div className="flex flex-col items-start">
                    <h4 className="text-gray-900 dark:text-white mb-4 font-semibold">Normativa</h4>
                    <FooterLink href="/info/warranty">Garantía</FooterLink>
                    <FooterLink href="/info/terms-and-conditions">Términos y condiciones</FooterLink>
                </div>
                <div className="flex flex-col items-start">
                    <h4 className="text-gray-900 dark:text-white mb-4 font-semibold">Atención al Cliente</h4>
                    <FooterLink href="/info/centro-de-ayuda">Centro de Ayuda</FooterLink>
                    <FooterLink href="/info/quienes-somos">Quienes Somos</FooterLink>
                    <FooterLink href="/info/por-que-elegir-swaplyar">¿Por qué Elegir SwaplyAr?</FooterLink>
                </div>
            </div>

            <div className="two-info-footer grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 px-8 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="container-footer-icon-social flex space-x-6">
                    <a href="https://www.linkedin.com/in/oa-suarez" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="SwaplyAr CEO en LinkedIn" className="hover:opacity-75 transition-opacity duration-200">
                        <FontAwesomeIcon icon={faLinkedin} className="text-blue-500 hover:text-blue-700" />
                    </a>
                    <a href="https://www.instagram.com/swaplyar/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="SwaplyAr en Instagram" className="hover:opacity-75 transition-opacity duration-200">
                        <FontAwesomeIcon icon={faInstagram} className="text-pink-500 hover:text-pink-700" />
                    </a>
                    <a href="https://www.facebook.com/swaplyar/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="SwaplyAr en Facebook" className="hover:opacity-75 transition-opacity duration-200">
                        <FontAwesomeIcon icon={faFacebook} className="text-blue-700 hover:text-blue-900" />
                    </a>
                    <a href="https://wa.me/5491123832198" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="SwaplyAr en WhatsApp" className="hover:opacity-75 transition-opacity duration-200">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 hover:text-green-700" />
                    </a>
                </div>
                {/* <div className="container-logo-footer flex items-center justify-center">
                    <Link href="/"> 
                        <a>
                            <Image src="/images/logo-solo.png" alt="Cambiar saldo online" width={641} height={176} />
                        </a>
                    </Link>
                </div> */}
                <p className="text-gray-600 dark:text-gray-400 sm:col-span-2 sm:text-center mt-4 sm:mt-0">
                    Todos los derechos reservados © SWAPLYAR | Group OA
                </p>
            </div>
        </footer>
    );
}

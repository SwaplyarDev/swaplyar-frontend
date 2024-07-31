'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLinkedin,
    faInstagram,
    faFacebook,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons'; // Importa los íconos

interface FooterLinkProps {
    href: string;
    children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
    return (
        <Link href={href} className="rs-link text-blue-500 hover:underline">
            {children}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer className="rs-wrapper-v4">
            <div className="one-info-footer grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-start">
                    <h4>Regístrate y disfruta de beneficios</h4>
                    <FooterLink href="/auth/login">Iniciar Sesión</FooterLink>
                    <FooterLink href="/auth/register">Registrarse</FooterLink>
                    <FooterLink href="/info/loyalty-program">Programa de Fidelización</FooterLink>
                </div>
                <div className="flex flex-col items-start">
                    <h4>Normativa</h4>
                    <FooterLink href="/info/garantia">Garantía</FooterLink>
                    <FooterLink href="/info/terminos-y-condiciones">Términos y condiciones</FooterLink>
                </div>
                <div className="flex flex-col items-start">
                    <h4>Atención al Cliente</h4>
                    <FooterLink href="/info/centro-de-ayuda">Centro de Ayuda</FooterLink>
                    <FooterLink href="/info/quienes-somos">Quienes Somos</FooterLink>
                    <FooterLink href="/info/por-que-elegir-swaplyar">¿Por qué Elegir SwaplyAr?</FooterLink>
                </div>
            </div>

            <div className="two-info-footer grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="container-footer-icon-social flex space-x-4">
                    <a href="https://www.linkedin.com/in/oa-suarez" target="_blank" rel="noopener" aria-label="LinkedIn" title="SwaplyAr CEO en LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="https://www.instagram.com/swaplyar/" target="_blank" rel="noopener" aria-label="Instagram" title="SwaplyAr en Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://www.facebook.com/swaplyar/" target="_blank" rel="noopener" aria-label="Facebook" title="SwaplyAr en Facebook">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://wa.me/5491123832198" target="_blank" rel="noopener" aria-label="WhatsApp" title="SwaplyAr en WhatsApp">
                        <FontAwesomeIcon icon={faWhatsapp} />
                    </a>
                </div>
                {/* <div className="container-logo-footer flex items-center justify-center">
                    <Link href="/"> 
                        <img src="/images/logo-solo.png" alt="Cambiar saldo online" width={641} height={176} />
                    </Link>
                </div> */}
                <p>Todos los derechos reservados © SWAPLYAR | Group OA</p>
            </div>
        </footer>
    );
}

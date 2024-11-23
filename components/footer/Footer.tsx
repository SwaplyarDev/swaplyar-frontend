'use client';

import Link from 'next/link';
import Image from 'next/image';
import S from '../../public/images/logo-solo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import useStore from '@/store/authViewStore';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

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
      className="rs-link text-base text-buttonsLigth transition duration-300 ease-in-out hover:scale-105 hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-600"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="rs-wrapper-v4 mx-auto max-w-screen-2xl px-4 py-8">
      <div className="one-info-footer hidden w-full flex-col items-center gap-4 px-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0 md-tablet:flex">
        <section className="mb-4 flex flex-col items-center text-left sm:mb-0 sm:w-1/3 sm:items-start">
          <h4 className="mb-2 text-pretty text-start text-xl font-bold">Regístrate y disfruta de beneficios</h4>
          <FooterLink href="/auth/login-register" view="login">
            Iniciar Sesión
          </FooterLink>
          <FooterLink href="/auth/login-register" view="register">
            Registrarse
          </FooterLink>
          <FooterLink href="/info/loyalty-program">Programa de Fidelización</FooterLink>
        </section>
        <section className="mb-4 flex flex-col items-center text-left sm:mb-0 sm:w-1/3 sm:items-center sm:text-center">
          <h4 className="mb-2 text-xl font-bold">Normativa</h4>
          <FooterLink href="/info/warranty">Garantía</FooterLink>
          <FooterLink href="/info/terms-and-conditions">Términos y Condiciones</FooterLink>
          <FooterLink href="/info/sapr-terms-conditions">T&C Plus Rewards</FooterLink>
          <FooterLink href="/info/arepentimiento">SwaplyAr Solicitud</FooterLink>
        </section>

        <section className="flex flex-col items-center text-left sm:w-1/3 sm:items-end sm:text-right">
          <h4 className="mb-2 text-xl font-bold">Atención al Cliente</h4>
          <FooterLink href="/info/help-center">Centro de Ayuda</FooterLink>
          <FooterLink href="/info/about-us">Preguntas y Respuestas</FooterLink>
          <FooterLink href="/info/blog">SwaplyAr Blog</FooterLink>
        </section>
      </div>

      <div className="flex flex-col md-tablet:hidden">
        <Accordion className="border-0 bg-transparent shadow-none">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="h-10 w-10 text-buttonsLigth dark:text-darkText" />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="min-h-10"
            sx={{
              minHeight: '0!important',
              '& .MuiAccordionSummary-content': {
                margin: '0!important',
              },
            }}
          >
            <h4 className="text-pretty text-start text-xl font-bold text-lightText dark:text-darkText">
              Registro y Beneficios
            </h4>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col pb-0 pl-10 pr-0 pt-2">
            <FooterLink href="/auth/login-register" view="login">
              Iniciar Sesión
            </FooterLink>
            <FooterLink href="/auth/login-register" view="register">
              Registrarse
            </FooterLink>
            <FooterLink href="/info/loyalty-program">Programa de Fidelización</FooterLink>
          </AccordionDetails>
        </Accordion>
        <Accordion className="border-0 bg-transparent shadow-none before:content-none">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="h-10 w-10 text-buttonsLigth dark:text-darkText" />}
            aria-controls="panel2-content"
            id="panel2-header"
            className="min-h-10"
            sx={{
              minHeight: '0!important',
              '& .MuiAccordionSummary-content': {
                margin: '0!important',
              },
            }}
          >
            <h4 className="text-xl font-bold text-lightText dark:text-darkText">Normativa</h4>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col pb-0 pl-10 pr-0 pt-2">
            <FooterLink href="/info/warranty">Garantía</FooterLink>
            <FooterLink href="/info/terms-and-conditions">Términos y Condiciones</FooterLink>
            <FooterLink href="/info/sapr-terms-conditions">T&C Plus Rewards</FooterLink>
            <FooterLink href="/info/arepentimiento">SwaplyAr Solicitud</FooterLink>
          </AccordionDetails>
        </Accordion>
        <Accordion className="border-0 bg-transparent shadow-none before:content-none">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="h-10 w-10 text-buttonsLigth dark:text-darkText" />}
            aria-controls="panel3-content"
            id="panel3-header"
            className="min-h-10"
            sx={{
              minHeight: '0!important',
              '& .MuiAccordionSummary-content': {
                margin: '0!important',
              },
            }}
          >
            <h4 className="text-xl font-bold text-lightText dark:text-darkText">Atención al Cliente</h4>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col pb-0 pl-10 pr-0 pt-2">
            <FooterLink href="/info/help-center">Centro de Ayuda</FooterLink>
            <FooterLink href="/info/about-us">Preguntas y Respuestas</FooterLink>
            <FooterLink href="/info/blog">SwaplyAr Blog</FooterLink>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="two-info-footer mt-5 flex flex-col items-center justify-between px-4 pt-4 sm:flex-row">
        <section className="container-footer-icon-social mb-4 flex justify-center space-x-4 sm:mb-0 sm:w-1/3 sm:justify-start">
          <Link
            href="https://www.linkedin.com/company/swaplyar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="SwaplyAr CEO en LinkedIn"
            className="transition-opacity duration-200 hover:opacity-75"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl text-[#012D8A] dark:text-[#FFFFFF]" />
          </Link>
          <Link
            href="https://www.instagram.com/swaplyar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="SwaplyAr en Instagram"
            className="transition-opacity duration-200 hover:opacity-75"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-2xl text-[#012D8A] dark:text-[#FFFFFF]" />
          </Link>
          <Link
            href="https://www.facebook.com/swaplyar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            title="SwaplyAr en Facebook"
            className="transition-opacity duration-200 hover:opacity-75"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-2xl text-[#012D8A] dark:text-[#FFFFFF]" />
          </Link>
          <Link
            href="https://wa.me/5491123832198"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            title="SwaplyAr en WhatsApp"
            className="transition-opacity duration-200 hover:opacity-75"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-[#012D8A] dark:text-[#FFFFFF]" />
          </Link>
        </section>
        <section className="mb-4 flex flex-grow justify-center filter dark:brightness-[0%] dark:invert sm:mb-0 sm:w-1/3 sm:justify-center">
          <Link href="/">
            <Image src={S} alt="Cambiar saldo online" width={65} height={70} />
          </Link>
        </section>
        <section className="flex items-center justify-center sm:w-1/3 sm:justify-end">
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            Todos los derechos reservados © SWAPLYAR | Group OA
          </p>
        </section>
      </div>
    </footer>
  );
}

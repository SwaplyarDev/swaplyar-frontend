// /components/footer/Footer.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { footerLinks } from './footerLinks';
import useStore from '@/store/authViewStore';
import { SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';

interface FooterLinkProps {
  href: string;
  label: string;
  view?: 'login' | 'register';
}

function FooterLink({ href, label, view }: FooterLinkProps) {
  const { setView } = useStore();
  return (
    <Link
      href={href}
      {...(view ? { onClick: () => setView(view) } : {})}
      className="rs-link text-base text-buttonsLigth transition duration-300 ease-in-out hover:scale-105 hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-600"
    >
      {label}
    </Link>
  );
}

function Section({
  title,
  links,
  align,
}: {
  title: string;
  links: FooterLinkProps[];
  align: 'start' | 'center' | 'end';
}) {
  return (
    <section
      className={`mb-4 flex flex-col items-center text-left sm:mb-0 sm:w-1/3 sm:items-center sm:text-center lg:items-${align}`}
    >
      <p className="mb-2 text-xl font-bold">{title}</p>
      {links.map(({ href, label, view }) => (
        <FooterLink key={href} href={href} label={label} view={view} />
      ))}
    </section>
  );
}

function AccordionSection({ title, links }: { title: string; links: FooterLinkProps[] }) {
  return (
    <Accordion className="border-0 bg-transparent shadow-none">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="h-10 w-10 text-buttonsLigth dark:text-darkText" />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        className="min-h-10"
        sx={{
          minHeight: '0!important',
          '& .MuiAccordionSummary-content': {
            margin: '0!important',
          },
        }}
      >
        <h4 className="text-xl font-bold text-lightText dark:text-darkText">{title}</h4>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col pb-0 pl-10 pr-0 pt-2">
        {links.map(({ href, label, view }) => (
          <FooterLink key={href} href={href} label={label} view={view} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default function Footer() {
  return (
    <footer className="rs-wrapper-v4 mx-auto w-full max-w-[1204px] px-4 py-8 md:px-8 lg:px-4">
      {/* Desktop View */}
      <div className="one-info-footer hidden w-full flex-col items-center gap-4 px-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0 lg:flex">
        <Section title="Regístrate y disfruta de beneficios" links={footerLinks.registro} align="start" />
        <Section title="Normativa" links={footerLinks.normativa} align="center" />
        <Section title="Atención al Cliente" links={footerLinks.atencion} align="end" />
      </div>

      {/* Mobile View */}
      <div className="flex flex-col lg:hidden">
        <AccordionSection title="Registro y Beneficios" links={footerLinks.registro} />
        <AccordionSection title="Normativa" links={footerLinks.normativa} />
        <AccordionSection title="Atención al Cliente" links={footerLinks.atencion} />
      </div>

      {/* Footer Bottom */}
      <div className="two-info-footer mt-5 flex flex-col items-center justify-between px-4 pt-4 sm:flex-row">
        <section className="container-footer-icon-social mb-4 flex justify-center space-x-4 sm:mb-0 sm:w-1/3 sm:justify-start">
          {footerLinks.social.map(({ href, icon, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={`SwaplyAr en ${label}`}
              className="transition-opacity duration-200 hover:opacity-75"
            >
              <FontAwesomeIcon icon={icon} className="text-2xl text-[#012D8A] dark:text-[#FFFFFF]" />
            </Link>
          ))}
        </section>
        <section className="mb-4 flex flex-grow justify-center filter dark:brightness-[0%] dark:invert sm:mb-0 sm:w-1/3 sm:justify-center">
          <Link href="/">
            <Image src={SwaplyArLogoSolo} alt="Cambiar saldo online" width={65} height={70} />
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

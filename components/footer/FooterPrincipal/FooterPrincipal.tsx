import React from 'react';
import { Section } from '../SectionFooter/SectionFooter';
import { footerLinks } from '../footerLinks';
import { AccordionSection } from '../AccordionSectionFooter/AccordionSectionFooter';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';

const FooterPrincipal = () => {
  return (
    <>
      <div className="one-info-footer hidden w-full flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0 lg2:flex">
        <Section title="Regístrate y Disfruta de Beneficios" links={footerLinks.registro} align="start" />
        <Section title="Normativa" links={footerLinks.normativa} align="center" />
        <Section title="Atención al Cliente" links={footerLinks.atencion} align="end" />
      </div>

      <div className="flex flex-col gap-5 lg2:hidden">
        <AccordionSection title="Regístrate y Disfruta de Beneficios" links={footerLinks.registro} />
        <AccordionSection title="Normativa" links={footerLinks.normativa} />
        <AccordionSection title="Atención al Cliente" links={footerLinks.atencion} />
      </div>

      <div className="two-info-footer mt-5 flex flex-col items-center justify-between pt-4 sm:flex-row">
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
          <p className="text-center font-textFont text-xs font-thin text-gray-600 dark:text-gray-400">
            Todos los derechos reservados © SWAPLYAR | Group OA
          </p>
        </section>
      </div>
    </>
  );
};

export default FooterPrincipal;

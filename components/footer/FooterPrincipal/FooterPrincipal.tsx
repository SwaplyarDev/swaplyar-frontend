import React from 'react';
import { Section } from '../SectionFooter/SectionFooter';
import { footerLinks } from '../footerLinks';
import { AccordionSection } from '../AccordionSectionFooter/AccordionSectionFooter';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoSwaplySVG from '@/public/LogoSwaplySVG.svg'

const FooterPrincipal = () => {
  return (
    <section className='relative pb-4'>
      <div className="one-info-footer hidden w-full flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0 md:flex">
        <Section title="Regístrate y Disfruta de Beneficios" links={footerLinks.registro} align="start" />
        <Section title="Normativa" links={footerLinks.normativa} align="center" />
        <Section title="Atención al Cliente" links={footerLinks.atencion} align="end" />
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        <AccordionSection title="Regístrate y Disfruta de Beneficios" links={footerLinks.registro} />
        <AccordionSection title="Normativa" links={footerLinks.normativa} />
        <AccordionSection title="Atención al Cliente" links={footerLinks.atencion} />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center mt-8 md:flex-row md:justify-between">
        <section className="hidden md:flex  justify-center gap-5 items-center ">
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
        <section className="w-full  md:hidden mb-4 flex flex-grow justify-center filter dark:brightness-[0%] dark:invert sm:mb-0 sm:w-1/3 sm:justify-center">
          <Link href="/">
            <Image src={LogoSwaplySVG} alt="Cambiar saldo online" width={65} height={70} />
          </Link>
        </section>
        <section className="md:hidden flex  justify-center gap-5 items-center ">
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
              <FontAwesomeIcon icon={icon} className="text-[20px] md:text-2xl text-[#012D8A] dark:text-[#FFFFFF]" />
            </Link>
          ))}
        </section>
        <section className="flex items-end justify-center sm:w-1/2 md:w-1/3 sm:justify-end">
          <p className="text-center font-textFont text-xs font-thin text-gray-600 dark:text-gray-400">
            Todos los derechos reservados © SWAPLYAR | Group OA
          </p>
        </section>
      </div>
    </section>
  );
};

export default FooterPrincipal;

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
      <div className="one-info-footer hidden w-full flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-0 navbar-desktop:flex">
        <Section title="Regístrate y Disfruta de Beneficios" links={footerLinks.registro} align="start" />
        <Section title="Normativa" links={footerLinks.normativa} align="center" />
        <Section title="Atención al Cliente" links={footerLinks.atencion} align="end" />
      </div>

      <div className="flex flex-col gap-4 navbar-desktop:hidden">
        <AccordionSection title="Regístrate y Disfruta de Beneficios" links={footerLinks.registro} />
        <AccordionSection title="Normativa" links={footerLinks.normativa} />
        <AccordionSection title="Atención al Cliente" links={footerLinks.atencion} />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center mt-8 navbar-desktop:flex-row navbar-desktop:justify-between">
        <section className="hidden navbar-desktop:flex justify-center gap-5 items-center ">
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
        <section className="w-full navbar-desktop:hidden mb-1 navbar-desktop:mb-4 flex flex-grow justify-center filter dark:brightness-[0%] dark:invert sm:mb-0 sm:w-1/3 sm:justify-center">
          <Link href="/">
            <Image src={LogoSwaplySVG} alt="Cambiar saldo online" className='w-[50px] navbar-desktop:w-auto' width={50} height={50} />
          </Link>
        </section>
        <section className="navbar-desktop:hidden flex  justify-center gap-5 items-center ">
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
              <FontAwesomeIcon icon={icon} className="text-[20px] navbar-desktop:text-[28px] text-[#012D8A] dark:text-[#FFFFFF]" />
            </Link>
          ))}
        </section>
        <section className="flex items-end justify-center sm:w-1/2 navbar-desktop:w-1/3 navbar-desktop:justify-end">
          <p className="text-center font-textFont text-xs font-thin text-custom-grayD dark:text-gray-400">
            Todos los derechos reservados © SWAPLYAR | Group OA
          </p>
        </section>
      </div>
    </section>
  );
};

export default FooterPrincipal;

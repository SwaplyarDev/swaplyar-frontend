import { SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Section } from '../SectionFooter/SectionFooter';
import { footerLinks, footerLinksBlog } from '../footerLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterBlog = () => {
  return (
    <div className="relative flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-0">
      <section className="order-2 mb-4 flex justify-center filter dark:brightness-[0%] dark:invert sm:mb-0 sm:justify-start lg:order-1">
        <Link href="/">
          <Image src={SwaplyArLogoSolo} alt="Cambiar saldo online" width={65} height={70} className='scale-90'/>
        </Link>
      </section>
      <section className="order-1 flex flex-col items-center lg:absolute lg:left-1/2 lg:top-1/2 lg:order-2 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <Section title="Regístrate y Disfruta de Beneficios" links={footerLinksBlog.linea1} blog={true} />
        <Section title="Normativa" links={footerLinksBlog.linea2} blog={true} />
      </section>
      <section className="order-3 flex flex-col items-center gap-4 lg:items-end">
        <div className="flex justify-center gap-2">
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
              <FontAwesomeIcon icon={icon} className="text-[28px] text-[#012D8A] dark:text-[#FFFFFF]" />
            </Link>
          ))}
        </div>
        <p className="text-center font-textFont text-xs font-thin text-gray-600 dark:text-gray-400">
          Todos los derechos reservados © SWAPLYAR | Group OA
        </p>
      </section>
    </div>
  );
};

export default FooterBlog;

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { SwaplyArLogoSolo } from '@/utils/assets/imgDatabaseCloudinary';
import { footerLinks } from './footerLinks';

function Footerblog() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 bg-gray-100 p-12 pt-40 dark:bg-[#323232] md:grid-cols-2 lg:grid-cols-3">
      {/* Logo */}
      <div className="flex justify-center dark:brightness-[0%] dark:invert lg:justify-start">
        <Link href="/">
          <Image
            className="h-[57px] w-[57px]"
            src={SwaplyArLogoSolo}
            alt="Cambiar saldo online"
            width={65}
            height={70}
          />
        </Link>
      </div>

      {/* Texto (Columna más grande en pantallas grandes) */}
      <div className="text-center text-lg font-semibold">
        <div className="flex flex-wrap items-center justify-center gap-2 font-textFont text-base font-light md:gap-4">
          <a href="#" className="text-[#2967fd] dark:text-darkText">
            Centro de Ayuda
          </a>
          <span className="text-black dark:text-darkText">|</span>
          <a href="#" className="text-[#2967fd] dark:text-darkText">
            Preguntas Frecuentes
          </a>
          <span className="text-black dark:text-darkText">|</span>
          <a href="#" className="text-[#2967fd] dark:text-darkText">
            Programa de Fidelización
          </a>
          <span className="hidden text-black dark:text-darkText md:inline">|</span>
          <a href="#" className="text-[#2967fd] dark:text-darkText">
            Términos y Condiciones
          </a>
          <span className="text-black dark:text-darkText">|</span>
          <a href="#" className="text-[#2967fd] dark:text-darkText">
            T&C Plus Rewards
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 lg:items-end lg:self-end">
        <section className="container-footer-icon-social mb-4 flex justify-center space-x-4 sm:mb-0 sm:w-1/3 sm:justify-end lg:self-end">
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
              <FontAwesomeIcon icon={icon} className="text-2xl text-[#012D8A] dark:text-darkText" />
            </Link>
          ))}
        </section>
        <p className="text-center font-textFont text-[8px] font-thin text-[#323232] dark:text-darkText lg:text-right">
          Todos los derechos reservados © SWAPLYAR | Group OA
        </p>
      </div>
    </div>
  );
}

export default Footerblog;

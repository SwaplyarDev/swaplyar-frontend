'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Usa next/navigation en lugar de next/router
import Image from 'next/image';
import Link from 'next/link';
import { Mantenimiento } from '@/utils/assets/img-database';

interface MaintenanceProps {
  params?: {
    section?: string;
  };
}

const MaintenancePage = ({ params }: MaintenanceProps) => {
  const section = params?.section;

  const [counter, setCounter] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (counter === 0) {
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      // setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, router]);

  return (
    <section className="relative m-auto flex w-full max-w-7xl flex-col items-start md:flex-row-reverse">
      {/* Contenedor del texto */}
      <section className="ml-2 flex w-full flex-col gap-3 pl-1 xs-mini-phone:ml-6 xs:pl-6 md-phone:min-w-[350px] sm-tablet:min-w-[440px] md-tablet:ml-12">
        <h1 className="hidden text-start text-5xl sm-phone:block">
          Sitio Web
          <br />
          en Mantenimiento
        </h1>
        <p className="text-[20px] sm:text-[20px] md:text-[25px] lg:text-[35px]">
          Disculpe las molestias
          <br />
          estamos trabajando
          <br />
          para mejorar el servicio.
        </p>

        <div>
          {section && (
            <p className="text-lg font-semibold">
              La sección <span className="text-blue-500 dark:text-blue-300">{section}</span> está en mantenimiento.
            </p>
          )}
        </div>

        <Link href="/">
          <div className="flex w-[165px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
            Redireccion en {counter}
          </div>
        </Link>
      </section>

      {/* Contenedor de la imagen */}
      <section className="relative flex min-h-[490px] w-full items-end xs:min-h-[530px] xs-phone:min-h-[550px] md-tablet:min-h-[630px]">
        <article className="absolute top-0 flex w-full items-center justify-center">
          <Image
            src={Mantenimiento}
            className="hidden px-8 md-phone:block xl-desktop:px-0"
            alt="Descripción de la imagen mantenimiento"
            width={1000}
            height={400}
          />
          <Image
            src={Mantenimiento}
            className="block px-6 xs:px-10 sm-phone:px-8 md-phone:hidden xl-desktop:px-0"
            alt="Descripción de la imagen mantenimiento"
            width={600}
            height={400}
          />
        </article>
      </section>
    </section>
  );
};

export default MaintenancePage;

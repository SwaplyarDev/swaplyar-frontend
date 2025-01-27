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
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, router]);

  return (
    <section className="m-auto flex w-full max-w-7xl flex-col items-start pb-24 sm:flex-row-reverse">
      {/* Contenedor del texto */}
      <section className="sm:640px md-phone:700px flex w-full flex-col px-5 py-11 sm:pr-[100px] sm:pt-[60px] md:pr-[110px] md:pt-[60px] lg:pr-[300px] lg:pt-[80px]">
        {/* Títulos */}
        <h1 className="hidden text-right sm:block sm:text-[28px] md:text-[35px] lg:text-[40px]">
          Sitio Web
          <br />
          en Mantenimiento
        </h1>

        <h1 className="block text-right font-['Inter'] text-[38px] font-medium leading-[45.60px] sm:hidden md-phone:text-5xl">
          Sitio Web
          <br />
          en Mantenimiento
        </h1>

        {/* Parrafo que aparece en pantallas grandes */}
        <p className="hidden text-right text-[20px] sm:block sm:text-[18px] md:text-[25px] lg:text-[30px]">
          Disculpe las molestias
          <br />
          estamos trabajando
          <br />
          para mejorar el servicio.
        </p>

        {/* Sección en mantenimiento */}
        <div>
          {section && (
            <p className="text-right text-lg font-semibold">
              La sección <span className="text-blue-500 dark:text-blue-300">{section}</span> está en mantenimiento.
            </p>
          )}
        </div>

        {/* Redirección */}
        <div className="hidden w-full text-right sm:block">
          <Link href="/">
            <div className="inline-flex w-[165px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
              Redireccion en {counter}
            </div>
          </Link>
        </div>
      </section>

      {/* Contenedor de la imagen */}
      <section className="relative flex min-h-[400px] w-full items-end xs:min-h-[400px] xs-phone:min-h-[400px] md-tablet:min-h-[740px]">
        <article className="absolute top-0 flex w-full flex-col items-center justify-center sm:left-[118px] sm:top-[104px] sm:z-50 md:left-[118px] md:top-[154px] lg:left-[285px] lg:top-[204px]">
          {/* Imagen para pantallas grandes */}
          <Image
            src={Mantenimiento}
            className="hidden sm:block sm:h-[395.77px] sm:w-[569px] xl-desktop:px-0"
            alt="Descripción de la imagen mantenimiento"
            width={1000}
            height={400}
          />

          {/* Imagen para pantallas pequeñas */}
          <Image
            src={Mantenimiento}
            className="block px-6 xs:px-10 sm:hidden xl-desktop:px-0"
            alt="Descripción de la imagen mantenimiento"
            width={600}
            height={400}
          />

          {/* Parrafo que aparece en pantallas pequeñas */}

          <p className="mb-5 mr-9 block w-full text-right text-[25px] sm:hidden">
            Disculpe las molestias
            <br />
            estamos trabajando
            <br />
            para mejorar el servicio.
          </p>

          <div className="mr-9 block w-full text-right sm:hidden">
            <Link href="/">
              <div className="inline-flex w-[165px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
                Redireccion en {counter}
              </div>
            </Link>
          </div>
        </article>
      </section>
    </section>
  );
};

export default MaintenancePage;

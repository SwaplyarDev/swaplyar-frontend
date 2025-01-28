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

  const [counter, setCounter] = useState(10);
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
    <section className="m-auto flex max-h-[600px] w-full flex-col items-start px-3 xs:max-h-[900px] xs-phone:max-h-[1000px] sm:flex-row-reverse lg:max-h-[800px] lg:max-w-7xl">
      {/* Contenedor del texto */}
      <section className="flex w-full flex-col">
        {/* Títulos */}
        <h1 className="hidden text-right font-titleFont font-bold sm:block sm:pr-4 sm:pt-4 sm:text-[30px] md:text-[38px] lg:pr-[185px] lg:pt-[90px] lg:text-[33px]">
          Sitio Web
          <br />
          en Mantenimiento
        </h1>

        <h1 className="block text-right font-titleFont text-[29px] font-bold leading-[1.2] xs-mini-phone:text-[35px] xs:text-[40px] xs-phone:text-[45px] sm:hidden">
          Sitio Web
          <br />
          en Mantenimiento
        </h1>

        {/* Párrafo para pantallas grandes */}
        <p className="lg:pt-[296px ] hidden text-right font-textFont text-[28px] sm:block sm:pr-4 sm:text-[25px] md:text-[30px] lg:pr-[185px] lg:text-[30px]">
          Disculpe las molestias
          <br />
          estamos trabajando
          <br />
          para mejorar el servicio.
        </p>

        {/* Sección en mantenimiento */}
        {section && (
          <p className="text-right text-lg font-semibold sm:pr-4 lg:pr-[160px]">
            La sección <span className="text-blue-500 dark:text-blue-300">{section}</span> está en mantenimiento.
          </p>
        )}

        {/* Redirección */}
        <div className="hidden w-full text-right sm:block sm:pr-4 lg:pr-[185px]">
          <Link href="/">
            <div className="inline-flex w-[165px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
              Redirección en {counter}
            </div>
          </Link>
        </div>
      </section>

      {/* Contenedor de la imagen */}
      <section className="relative flex min-h-[600px] w-full items-end xs:min-h-[650px] md:min-h-[600px] lg:min-h-[740px]">
        <article className="absolute top-0 flex w-full flex-col items-center justify-center sm:left-[80px] sm:top-[80px] md:left-[100px] md:top-[120px] lg:left-[180px] lg:top-[160px]">
          {/* Imagen para pantallas grandes */}
          <Image
            src={Mantenimiento}
            className="hidden sm:block sm:max-w-[500px] md:max-w-[600px] lg:max-w-[750px]"
            alt="Descripción de la imagen mantenimiento"
            width={1000}
            height={400}
          />

          {/* Imagen para pantallas pequeñas */}
          <Image
            src={Mantenimiento}
            className="block px-4 sm:hidden"
            alt="Descripción de la imagen mantenimiento"
            width={600}
            height={400}
          />

          {/* Párrafo para pantallas pequeñas */}

          <p className="mb-5 mt-4 w-full text-right font-textFont text-[25px] xs-mini-phone:text-[30px] xs:text-[35px] xs-phone:text-[43px] sm:hidden">
            Disculpe las molestias
            <br />
            estamos trabajando
            <br />
            para mejorar el servicio.
          </p>

          {/* Botón de redirección para pantallas pequeñas */}
          <div className="w-full text-right sm:hidden">
            <Link href="/">
              <div className="inline-flex w-[165px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
                Redirección en {counter}
              </div>
            </Link>
          </div>
        </article>
      </section>
    </section>
  );
};

export default MaintenancePage;

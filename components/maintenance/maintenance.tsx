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
    <>
      <section className="relative m-auto flex w-full max-w-7xl flex-col items-start md:flex-row">
        {/* Contenedor de la imagen */}
        <div className="relative flex h-[200px] w-[200px] items-end sm:mb-[332px] sm:mr-[43px] sm:mt-[50px] sm:h-[200px] sm:w-[500px] md:h-[472px] md:w-[678px] lg:mb-[555px] lg:mr-[450px] lg:mt-[150px]">
          <div className="absolute top-0 flex w-full items-center justify-center">
            <Image
              src={Mantenimiento}
              className="md:block xl-desktop:px-0"
              alt="Descripción de la imagen mantenimiento"
              width={678}
              height={472}
            />
          </div>
        </div>

        {/* Contenedor del texto */}
        <div
          className="absolute right-1 flex flex-col pl-1 text-end dark:border-l-darkText md:right-4 lg:right-72"
          style={{ marginTop: '50px' }}
        >
          <h1 className="font-['Inter'] text-[35px] font-medium leading-[48px] sm:text-[35px] md:text-[45px] lg:text-[55px]">
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

          <Link href="/" className="mt-auto self-end">
            <div className="flex w-[165px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
              Redireccion en {counter}
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default MaintenancePage;

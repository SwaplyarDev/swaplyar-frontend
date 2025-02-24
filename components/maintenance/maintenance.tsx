'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Usa next/navigation en lugar de next/router
import Image from 'next/image';
import { Mantenimiento } from '@/utils/assets/imgDatabaseCloudinary';
import RedirectButton from '../ui/RedirectButton/RedirectButton';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';

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
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, router]);

  return (
    <>
      <AnimatedBlurredCircles tope="top-[-175px]" />
      <section className="relative m-auto flex w-full max-w-7xl items-center gap-20">
        {/* Contenedor del texto */}
        <section className="flex w-full flex-col items-end px-4 xs-mini-phone2:px-5 xs-phone:px-9 md-phone:h-[570px] md-phone:px-1 sm-tablet:pr-[50px] md:pr-[50px] lg-tablet:h-[700px]">
          <article className="md-phone:flex-row-reverse lg-tablet:absolute lg-tablet:right-[135px] lg-tablet:top-[49px] lg2:right-[212px]">
            {/* Título único */}
            <h1 className="titleFont text-right text-[33px] xs-mini-phone:text-[36px] xs-mini-phone2:text-[37px] xs:text-[43px] xs-phone:text-[47px] sm:mr-6 lg:text-[40px]">
              Sitio Web <br />
              en Mantenimiento
            </h1>
          </article>

          <article className="flex w-full flex-col items-center gap-3 md-phone:absolute">
            <Image
              src={Mantenimiento}
              className="max-w-[310px] xs-mini-phone:min-w-[320px] xs-mini-phone2:min-w-[330px] xs:min-w-[350px] xs-phone:max-w-[400px] sm:max-w-[430px] md-phone:absolute md-phone:right-[158px] md-phone:top-[169px] md-phone:max-w-[500px] lg-tablet:right-[250px] lg-tablet:min-w-[600px] lg2:right-[320px]"
              alt="Descripción de la imagen mantenimiento"
              width={1000}
              height={400}
            />
          </article>
          <article className="flex w-full flex-col items-end justify-center xs:mr-3 xs-phone:mr-5 md-phone:z-20 md-phone:text-right lg-tablet:absolute lg-tablet:right-[135px] lg-tablet:top-44 lg2:right-[210px]">
            {' '}
            {/* Texto único */}
            <p className="titleFont text-right text-[26px] xs-mini-phone:text-[30px] xs-mini-phone2:text-[32px] xs:text-[34px] xs-phone:text-[38px] md-phone:text-[32px]">
              Disculpe las molestias,
              <br />
              estamos trabajando
              <br />
              para mejorar el servicio.
            </p>
            {/* Sección en mantenimiento */}
            {section && <p className="mt-2">La sección {section} está en mantenimiento.</p>}
            {/* Botón de redirección */}
            <RedirectButton counter={counter} />
          </article>
        </section>
      </section>
    </>
  );
};

export default MaintenancePage;

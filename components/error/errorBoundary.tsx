// import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Error_500_clear, Error_500_dark, Post1_500, Post2_500 } from '@/utils/assets/imgDatabaseCloudinary';
import { useRouter } from 'next/navigation';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import RedirectButton from '../ui/RedirectButton/RedirectButton';

interface ErrorBoundaryProps {
  reset: () => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ reset }) => {
  const [counter, setCounter] = useState(10);
  const router = useRouter();
  const { isDark } = useDarkTheme();

  useEffect(() => {
    if (counter === 0) {
      reset();
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter, reset, router]);
  return (
    <>
      <section className="relative m-auto flex w-full max-w-7xl flex-col items-start gap-20">
        <section className="md-table:max-h-[560px] relative flex min-h-[490px] w-full items-end mini-phone:min-h-[490px] xs-mini-phone:min-h-[540px] xs-mini-phone2:h-[544px] xs:h-[600px] xs-phone:min-h-[622px] md-phone:max-h-[510px] md-phone:min-h-[430px] md-tablet:max-h-[530px] lg:max-h-[580px] xl:min-w-[1244px]">
          <article className="absolute top-0 flex w-full items-center justify-center">
            <Image
              src={isDark ? Error_500_dark : Error_500_clear}
              className="ml-36 hidden max-w-[650px] md-tablet:block lg-tablet:max-w-[690px] lg:max-w-[780px] xl-desktop:max-w-[800px] xl-desktop:px-0"
              alt="Descripción de la imagen 500"
              width={987}
              height={578}
            />
            <Image
              src={isDark ? Error_500_dark : Error_500_clear}
              className="block xs-mini-phone2:min-w-[400px] xs-mini-phone2:max-w-[426px] xs:min-w-[426px] xs:max-w-[480px] xs-phone:min-w-[480px] xs-phone:max-w-[550px] md-phone:min-w-[550px] md-phone:max-w-[593px] xs-phone:md-tablet:hidden"
              alt="Descripción de la imagen 500"
              width={600}
              height={400}
            />
          </article>

          <article className="absolute z-20 ml-2 flex min-h-[200px] flex-col justify-center gap-3 border-l-2 border-l-buttonsLigth pl-6 dark:border-l-darkText xs-mini-phone2:ml-3 xs-mini-phone2:min-w-[240px] xs-phone:ml-8 sm:ml-20 md-phone:ml-12 sm-tablet:ml-14 md:ml-[65px] md:inline-flex md:justify-center md-tablet:ml-[57px]">
            <h1 className="titleFont hidden text-start text-4xl md-phone:block md-tablet:text-3xl">
              Ups...
              <br />
              Algo salió mal
              <br />
              en nuestro lado
            </h1>
            <h1 className="titleFont block text-start text-4xl xs-mini-phone:text-[36px] xs-phone:ml-7 md-phone:hidden">
              Ups...
              <br />
              Algo salió mal
              <br />
              en nuestro lado.
            </h1>

            <RedirectButton reset={reset} counter={counter} />
          </article>

          <article className="xs absolute top-32 flex w-full items-center justify-center xs-mini-phone:top-36 xs:right-2 xs:top-44 xs-phone:right-7 xs-phone:top-52 md-phone:items-end md-phone:justify-end sm-tablet:right-12 md:right-14 md-tablet:right-16 md-tablet:top-56 lg:right-12 lg:top-64 lg:p-1 xl-desktop:right-9 lg2:right-14 xl:right-32">
            <Image
              src={Post1_500}
              alt="Woman smiling with tablet"
              className="z-10 xs-mini-phone2:min-w-[400px] xs-mini-phone2:max-w-[426px] xs:min-w-[426px] xs:max-w-[460px] md-phone:min-w-[410px] md-phone:max-w-[420px] md-tablet:max-w-[460px] lg-tablet:max-w-[550px] lg:max-w-[600px] xl-desktop:max-w-[650px]"
              width={800}
              height={437}
            />
          </article>
        </section>
      </section>
    </>
  );
};

export default ErrorBoundary;

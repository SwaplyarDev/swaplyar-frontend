// import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Error_500_clear, Error_500_dark, Post1_500, Post2_500 } from '@/utils/assets/img-database';
import Link from 'next/link';
import { inter } from '@/config/fonts/fonts';
import { useRouter } from 'next/navigation';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';

const ErrorBoundary = () => {
  const [counter, setCounter] = useState(10);
  const router = useRouter();
  const { isDark } = useDarkTheme();
  // const isDark= true;

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
    <>
      <section className="relative m-auto flex w-full max-w-7xl flex-col items-start gap-20">
        <section className="relative flex min-h-[480px] w-full items-end xs-mini-phone:min-h-[540px] xs-mini-phone2:h-[544px] xs:h-[544px] md-phone:min-h-[475px] sm-tablet:min-h-[550px]">
          <article className="absolute top-0 flex w-full items-center justify-center bg-blue-300">
            <Image
              src={isDark ? Error_500_dark : Error_500_clear}
              className="hidden w-[400px] px-8 lg:block xl-desktop:px-0"
              alt="Descripción de la imagen 500"
              width={987}
              height={578}
            />
            <Image
              src={isDark ? Error_500_dark : Error_500_clear}
              className="block xs-mini-phone2:min-w-[400px] xs-mini-phone2:max-w-[426px] xs-phone:max-w-[500px] xs-phone:bg-red-500 lg:hidden"
              alt="Descripción de la imagen 500"
              width={600}
              height={400}
            />
          </article>
          {/* Texto------------------------------ */}
          <article className="z-20 ml-2 flex min-h-[200px] flex-col justify-center border-l-2 border-l-buttonsLigth pt-2 dark:border-l-darkText xs-mini-phone2:ml-3 xs-mini-phone2:min-w-[380px] xs:ml-12 xs-phone:ml-6 xs-phone:pt-5 sm-tablet:ml-8">
            <h1 className="titleFont ml-3 hidden text-start text-5xl font-bold md-phone:block">
              Ups...
              <br />
              Algo salió mal
              <br />
              en nuestro lado
            </h1>
            <h1 className="titleFont xs-phone: ml-7 block text-start text-4xl font-bold xs-mini-phone:text-5xl xs-phone:text-4xl md-phone:hidden">
              Ups...
              <br />
              Algo salió mal
              <br />
              en nuestro lado.
            </h1>

            {/* Botón */}
            <Link href="/">
              <button className="ml-3 flex w-[165px] justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
                Redireccion en {counter}
              </button>
            </Link>
          </article>
          {/* Imagen dos ........................ */}
          <article className="xs absolute top-32 flex w-full items-center justify-center xs-mini-phone:top-36 md-phone:right-4 md-phone:top-44 md-phone:items-end md-phone:justify-end sm-tablet:top-60 md-tablet:min-h-[630px]">
            <Image
              src={Post1_500}
              alt="Woman smiling with tablet"
              className="z-10 xs-mini-phone2:min-w-[400px] xs-mini-phone2:max-w-[426px]"
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

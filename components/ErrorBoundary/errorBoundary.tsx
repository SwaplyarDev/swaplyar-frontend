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
        <section className="relative flex min-h-[490px] w-full items-end xs:min-h-[530px] xs-phone:min-h-[550px] md-tablet:min-h-[630px]">
          <article className="absolute top-0 flex w-full items-center justify-center">
            <Image
              src={isDark ? Error_500_dark : Error_500_clear}
              className="hidden px-8 md-phone:block xl-desktop:px-0 xl:w-[700px]"
              alt="Descripción de la imagen 500"
              width={987}
              height={578}
            />
            <Image
              src={isDark ? Error_500_dark : Error_500_clear}
              className="block px-6 xs:px-10 sm-phone:px-8 md-phone:hidden xl-desktop:px-0"
              alt="Descripción de la imagen 500"
              width={600}
              height={400}
              style={{
                background: 'green',
              }}
            />
          </article>
          {/* Contenido principal */}
          <article className="ml-2 flex w-full flex-col gap-3 border-l-2 border-l-buttonsLigth pl-1 dark:border-l-darkText xs-mini-phone:ml-6 xs:pl-6 md-phone:min-w-[350px] sm-tablet:min-w-[440px] md-tablet:ml-12">
            <h1 className="hidden text-start text-5xl sm-phone:block">
              Ups...
              <br />
              Algo salió mal
              <br />
              en nuestro lado.
            </h1>
            <h1 className="block text-start text-3xl mini-phone:text-4xl sm-phone:hidden md-phone:text-5xl">
              Ups...
              <br />
              La página no
              <br />
              ha sido
              <br />
              encontrada
            </h1>

            {/* Botón */}
            <Link href="/">
              <button className="flex w-[165px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
                Redireccion en {counter}
              </button>
            </Link>
          </article>
          <article className="absolute flex min-h-[530px] w-full items-end justify-end pb-10 pr-2 mini-phone:mb-44 xs:pb-0 xs:pr-0 md-phone:items-center md:relative md:justify-center md:pr-14 md-tablet:min-h-[630px] lg:mb-0 lg:pb-0 lg:pr-0 xl-desktop:items-end xl:mb-0">
            <Image
              src={Post1_500}
              alt="Woman smiling with tablet"
              className="z-10 w-[310px] object-cover xs:w-[358px] md-tablet:w-[425px] xl-desktop:w-[800px]"
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

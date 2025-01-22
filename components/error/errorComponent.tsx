'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import {
  Enchufe_clear,
  Enchufe_dark,
  Error_404_clear,
  Error_404_dark,
  Post1_404,
  Post2_404,
  tlf_404_clear,
  tlf_404_dark,
} from '@/utils/assets/img-database';

const NotFoundComponent = () => {
  const { isDark } = useDarkTheme();
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
    <main>
      <section className="relative m-auto flex w-full max-w-7xl flex-col items-start gap-20">
        <section className="relative flex min-h-[490px] w-full items-end xs:min-h-[530px] xs-phone:min-h-[550px] md-tablet:min-h-[630px]">
          <article className="absolute top-0 flex w-full items-center justify-center">
            <Image
              src={isDark ? Error_404_dark : Error_404_clear}
              className="hidden px-8 md-phone:block xl-desktop:px-0"
              alt="Descripción de la imagen 404"
              width={1000}
              height={400}
            />
            <Image
              src={isDark ? tlf_404_dark : tlf_404_clear}
              className="block px-6 xs:px-10 sm-phone:px-8 md-phone:hidden xl-desktop:px-0"
              alt="Descripción de la imagen 404"
              width={600}
              height={400}
            />
          </article>
          <article className="ml-2 flex w-full flex-col gap-3 border-l-2 border-l-buttonsLigth pl-1 dark:border-l-darkText xs-mini-phone:ml-6 xs:pl-6 md-phone:min-w-[350px] sm-tablet:min-w-[440px] md-tablet:ml-12">
            <h1 className="hidden text-start text-5xl sm-phone:block">
              Ups...
              <br />
              La página no
              <br />
              ha sido encontrada
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

            <Link href="/">
              <div className="flex w-[165px] items-center justify-center rounded-full border border-buttonsLigth bg-transparent p-2 text-base font-bold text-buttonsLigth dark:border-darkText dark:text-darkText">
                Redireccion en {counter}
              </div>
            </Link>
          </article>
          <article className="absolute flex min-h-[530px] w-full items-end justify-end pb-10 pr-2 xs:pb-0 xs:pr-0 md-phone:items-center md:relative md:justify-center md:pr-14 md-tablet:min-h-[630px] xl-desktop:items-end">
            <Image
              src={Post1_404}
              alt="Man smiling with tablet"
              className="z-10 hidden w-[125px] md-phone:block md-tablet:w-[155px] xl-desktop:w-[195px]"
              width={195}
              height={220}
            />
            <Image
              src={Post2_404}
              alt="Woman smiling with a laptop"
              className="z-10 w-[170px] xs:w-[200px] md-tablet:w-[240px] xl-desktop:w-[300px]"
              width={300}
              height={220}
            />
          </article>
        </section>
        <section className="relative flex w-full items-center justify-center">
          <div className="absolute left-0 -ml-[calc((100vw-100%)/2)] mt-1 h-[11px] w-[calc(100%-245px)] min-w-[135px] bg-buttonsLigth dark:bg-darkText xs:w-[50vw]"></div>
          <div className="flex w-[485px] items-center justify-end">
            <Image
              src={isDark ? Enchufe_dark : Enchufe_clear}
              alt="Descripción de la imagen enchufe"
              width={400}
              height={100}
            />
          </div>
        </section>
      </section>
    </main>
  );
};

export default NotFoundComponent;

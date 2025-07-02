'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import {
  Enchufe_clear,
  Enchufe_dark,
  Post1_404,
  Post2_404,
  tlf_404_clear,
  tlf_404_dark,
} from '@/utils/assets/imgDatabaseCloudinary';
import RedirectButton from '../ui/RedirectButton/RedirectButton';
import { error404Clear, error404Dark } from '@/utils/assets/img-database';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';

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
    <main className="relative mx-4 overflow-hidden md:mx-8 lg:mx-4">
      <div className="absolute inset-0 -z-10">
        <AnimatedBlurredCircles tope="top-[0px]" />
      </div>
      <section className="relative m-auto flex w-full max-w-[1204px] flex-col items-start gap-20 lg:px-4">
        <section className="relative mb-10 flex min-h-[520px] w-full items-end overflow-hidden xs:min-h-[530px] xs-phone:min-h-[550px] md-tablet:min-h-[630px]">
          <article className="absolute top-0 flex w-full items-center justify-center">
            <Image
              src={isDark ? error404Dark : error404Clear}
              className="hidden w-full max-w-[1000px] md-phone:block xl-desktop:px-0"
              alt="Descripción de la imagen 404"
              width={1000}
              height={400}
            />
            <Image
              src={isDark ? tlf_404_dark : tlf_404_clear}
              className="block xs:px-10 sm-phone:px-8 md-phone:hidden xl-desktop:px-0"
              alt="Descripción de la imagen 404"
              width={600}
              height={400}
            />
          </article>
          <article className="flex w-full flex-col gap-3 border-l-2 border-l-buttonsLigth pl-1 dark:border-l-darkText xs:pl-6">
            <h2 className="text-titleFont hidden text-start text-[38px] font-medium sm:block lg:text-[40px]">
              Ups...
              <br />
              La página no
              <br />
              ha sido encontrada
            </h2>

            <h2 className="text-titleFont block text-start text-[38px] font-medium mini-phone:text-4xl sm:hidden md-phone:text-5xl">
              Ups...
              <br />
              La página no
              <br />
              ha sido
              <br />
              encontrada
            </h2>

            <div className="z-50 mb-2">
              <RedirectButton counter={counter} />
            </div>
          </article>
          <article className="absolute right-0 flex min-h-[530px] w-full items-end justify-end pb-10 xs:pb-0 xs:pr-0 md-phone:items-center md:relative md:right-8 md:justify-center xl-desktop:items-end">
            <Image
              src={Post1_404}
              alt="Man smiling with tablet"
              className="z-10 hidden h-[291px] w-[200px] object-cover md-phone:block md:h-[355px] lg:h-[475px]"
              width={400}
              height={220}
            />
            <Image
              src={Post2_404}
              alt="Woman smiling with a laptop"
              className="z-10 h-[291px] w-[185px] object-cover md:h-[355px] md:w-[350px] lg:h-[475px] lg:w-[400px]"
              width={300}
              height={220}
            />
          </article>
        </section>
      </section>
      <section className="relative mb-10 flex w-full items-center justify-center">
        <div className="absolute left-0 -ml-[calc((100vw-100%)/2)] mt-1 h-[11px] w-[calc(100%-245px)] min-w-[135px] bg-buttonsLigth dark:bg-darkText xs:w-[50vw]"></div>
        <div className="flex w-[485px] items-center justify-end">
          <Image
            src={isDark ? Enchufe_dark : Enchufe_clear}
            alt="Descripción de la imagen enchufe"
            width={400}
            height={110}
          />
        </div>
      </section>
    </main>
  );
};

export default NotFoundComponent;

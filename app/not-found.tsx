'use client';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import Image from 'next/image';
import Link from 'next/link';
import { Post1_404, Post2_404, Enchufe_clear_largo, Enchufe_dark_largo } from '@/utils/assets/img-database';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function NotFoundPage() {
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
    <div className="flex w-full justify-center overflow-x-hidden">
      <div className="container min-h-[100dvh]">
        <div className="relative flex h-full w-full bg-[url('/images/tlf_404_clear.png')] bg-contain bg-center-10px bg-no-repeat dark:bg-[url('/images/tlf_404_dark.png')] md:bg-[url('/images/dark-404.png')] md:bg-cover md:bg-center-80px md:dark:bg-[url('/images/dark-404.png')]">
          <AnimatedBlurredCircles tope="top-[0px]" />
          <div className="flex w-full items-center">
            <div className="flex h-fit w-full items-end">
              <div className="font-white md:text-4k absolute bottom-[30%] left-0 flex h-fit flex-col items-center gap-3 pl-1 text-xl font-normal sm:max-md:bottom-[15%] sm:max-md:text-2xl md:gap-5 md:max-lg-tablet:bottom-[23%] lg-tablet:max-lg:bottom-[22%] lg-tablet:max-lg:left-[6%] lg:max-xl:bottom-[22%] lg:max-xl:left-[14%] xl:max-2k:bottom-[21%] xl:max-2k:left-[18%] 2xl:max-4k:bottom-[22%] 2xl:max-4k:left-[19%] 4k:bottom-[20%] 4k:left-[4%] 4k:text-[130px] 4k:leading-[1.2]">
                <h1 className="block border-l-2 border-l-blue-700 pl-1 text-start md:hidden">
                  Ups... <br />
                  La página no <br />
                  ha sido encontrada
                </h1>

                <h1 className="hidden text-start md:block">
                  Ups... <br />
                  La página no <br />
                  ha sido <br />
                  encontrada
                </h1>

                <Link href="/">
                  <div className="flex items-center justify-center rounded-full border border-blue-700 bg-white pl-1 pr-1 text-[11px] font-bold text-blue-700 md:mr-5 md:p-1 md:text-[14px] lg-tablet:w-44 xl:w-40 4k:w-[900px] 4k:border-6 4k:p-4 4k:text-[90px]">
                    Redireccion en {counter}
                  </div>
                </Link>
              </div>
              <div className="flex h-fit justify-end">
                <Image
                  src={Post1_404}
                  alt="Man smiling with tablet"
                  className="3k absolute bottom-[30%] right-[13%] h-auto w-56 sm:max-md:bottom-[15%] sm:max-md:right-[18%] sm:max-md:w-64 md:max-lg:bottom-[33%] md:max-lg:w-[280px] md:max-lg-tablet:right-[17%] lg-tablet:max-lg:right-[21%] lg-tablet:max-lg:w-[300px] lg:max-xl:bottom-[31%] lg:max-xl:right-[25%] lg:max-xl:w-[320px] xl:max-2k:w-[350px] xl:max-2xl:bottom-[24%] xl:max-2xl:right-[27%] 2xl:max-4k:bottom-[26%] 2xl:max-4k:right-[30%] 2k:max-4k:bottom-[17%] 2k:max-4k:right-[26%] 2k:max-4k:w-[650px] 4k:bottom-[21%] 4k:right-[18%] 4k:w-[1000px]"
                  width={300}
                  height={220}
                />

                <Image
                  src={Post2_404}
                  className="absolute bottom-[30%] right-0 ml-20 h-auto w-56 sm:max-md:bottom-[15%] sm:max-md:w-64 sm:max-sm:right-0 md:ml-0 md:max-lg-tablet:bottom-[20%] md:max-lg-tablet:right-[-10%] md:max-lg-tablet:w-[280px] lg-tablet:max-lg:bottom-[23%] lg-tablet:max-lg:right-0 lg-tablet:max-lg:w-[300px] lg:max-xl:bottom-[19%] lg:max-xl:right-[5%] lg:max-xl:w-[320px] xl:max-2k:bottom-[14%] xl:max-2k:right-[8%] xl:max-2k:w-[350px] 2xl:max-4k:bottom-[14%] 2xl:max-4k:right-[12%] 2k:bottom-[2%] 2k:right-[13%] 2k:max-4k:w-[650px] 4k:right-0 4k:w-[1000px]"
                  alt="Woman smiling with a laptop"
                  width={300}
                  height={220}
                />
              </div>
              <Image
                src={isDark ? Enchufe_dark_largo : Enchufe_clear_largo}
                className="absolute bottom-[18%] left-[-32%] h-32 w-[4000px] sm:max-md:bottom-[1%] md:bottom-0 md:max-lg-tablet:left-[-42%] lg-tablet:max-2k:left-[-45%] 2k:max-4k:left-[-55%] 2k:max-4k:h-[300px] 4k:left-[-55%] 4k:h-[400px]"
                alt="Descripción de la imagen enchufe"
                width={4000}
                height={144}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

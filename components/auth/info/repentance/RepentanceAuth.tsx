'use client';
import React from 'react';
import FormAuth from './form/Form';
import { regretsPc } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { regretsPhone } from '@/utils/assets/imgDatabaseCloudinary';
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack';


const RepentanceFormAuth = () => {
  const { isDark } = useDarkTheme();

  return (
    <div className="flex-column flex w-full flex-wrap items-center justify-center lg:px-10">
      <section className="my-7 flex flex-col items-center justify-center px-4 md:px-8 lg2:px-4">
        <AnimatedBlurredCircles tope="top-[124px]" />
        <div className="flex flex-col gap-2">
          <h1 className="mx-auto max-w-[506px] text-center font-titleFont text-[38px] font-medium lg2:max-w-[592px] lg2:text-[40px]">
            Solicita tu reembolso de forma rápida y sencilla
          </h1>
          <p className="w-full font-textFont text-[21px] font-light lg2:mx-auto lg2:max-w-[637px]">
            Introduce los datos exactamente como aparecen en el email recibido.
          </p>
          <p className="mx-auto max-w-[679px] text-center font-textFont font-light lg2:max-w-[792px]">
            Completa los datos requeridos con precisión para iniciar tu solicitud de reembolso. Procesaremos tu pedido
            de forma segura y devolveremos el dinero a la cuenta de origen de manera eficiente y sin complicaciones.
          </p>
        </div>
        <div className="flex w-full flex-col lg2:max-w-[1004px] lg2:flex-row">
          <div className="mt-10 hidden min-h-full flex-1 flex-wrap justify-center lg2:block">
            <Image
              src={regretsPc}
              alt="regretsPc"
              width={650}
              height={0}
              className="h-full max-h-[557px] min-h-[557px] object-contain scale-90 drop-shadow-light dark:drop-shadow-darkmode"
            />
          </div>

          <div className="mx-auto mt-10 flex min-h-full w-full max-w-[506px] flex-wrap justify-center lg2:hidden">
            <Image
              src={regretsPhone}
              alt="regretsPhone"
              width={200}
              height={0}
              className="h-full object-contain drop-shadow-light dark:drop-shadow-darkmode"
            />
            <div
              className={`min-w-full flex-wrap justify-center border-t-2 lg2:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
            ></div>
          </div>

          <div
            className={`relative mt-10 flex h-full w-full flex-col items-center justify-center gap-4 border-0 lg2:mr-3 lg2:flex-1 lg2:after:absolute lg2:after:-left-3 lg2:after:top-5 lg2:after:h-[75%] lg2:after:w-[1px] lg2:after:bg-buttonsLigth lg2:after:content-[''] ${isDark ? 'lg2:after:bg-darkText' : ''}`}
          >
            <FormAuth />
            <ButtonBack route="/es/auth/centro-de-ayuda" isDark={isDark} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default RepentanceFormAuth;

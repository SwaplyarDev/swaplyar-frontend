'use client';
import React from 'react';
import Form from './form/Form';
import { regretsPc } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import { regretsPhone } from '@/utils/assets/imgDatabaseCloudinary';
import ButtonBack from '../ui/ButtonBack/ButtonBack';
import clsx from 'clsx';
import ShortButton from '../ui/NewButtons/ShortButton';

const RepentanceForm = () => {
  const { isDark } = useDarkTheme();

  return (
    <div className="my-[60px] lg2:my-[120px] w-full flex flex-col items-center justify-center px-4 md:px-8">
      <AnimatedBlurredCircles tope="top-[124px]" />
      <div className="flex flex-col md:gap-7">
        <div className="mx-auto mt-10 md:mt-[90px] flex min-h-full w-full max-w-[506px] flex-wrap justify-center md:hidden">
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
        <h1 className="mx-auto max-w-[506px] text-center font-titleFont text-3.5xl leading-[120%] md:text-[40px] font-medium md:max-w-[704px]">
          Solicita tu reembolso de forma rápida y sencilla
        </h1>
        <p className="mx-auto max-w-[679px] text-center font-textFont font-light lg2:max-w-[792px]">
          Completa los datos requeridos con precisión para iniciar tu solicitud de reembolso. Procesaremos tu pedido
          de forma segura y devolveremos el dinero a la cuenta de origen de manera eficiente y sin complicaciones.
        </p>
        <p className="mt-2 md:mb-2 w-full font-textFont text-center font-light md:text-xl lg2:mx-auto lg2:max-w-[637px]">
          Introduce los datos exactamente como aparecen en el email recibido.
        </p>
      </div>
      <div className="flex w-full flex-col lg2:max-w-[792px] md:flex-row">
        <div className={`relative mt-2 hidden min-h-full w-[302px] items-center justify-center md:block mr-10 md:content-center md:after:absolute md:after:right-[-20px] md:after:top-0 md:after:h-full md:after:w-[1px] md:after:bg-buttonsLigth md:after:content-[''] ${isDark ? 'md:after:bg-darkText' : ''}`}>
          <Image
            src={regretsPc}
            alt="regretsPc"
            width={152}
            height={400}
            className="h-[400px] w-[152px] ml-[35px] mr-[40px] object-contain scale-x-[-1] drop-shadow-light dark:drop-shadow-darkmode"
          />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center gap-4 border-0">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default RepentanceForm;

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

const RepentanceForm = () => {
  const { isDark } = useDarkTheme();

  return (
    <div className='mt-20'>
      <div className="my-7 flex flex-col items-center justify-center px-4 md:px-8 lg2:px-4">
        <AnimatedBlurredCircles tope="top-[124px]" />
        <div className="flex flex-col gap-10">
          <h1 className="mx-auto max-w-[506px] text-center font-titleFont text-[38px] font-medium lg2:max-w-[592px] lg2:text-[40px]">
            Solicita tu reembolso De forma rápida y sencilla
          </h1>
          <p className="mx-auto max-w-[679px] text-center font-textFont font-light lg2:max-w-[792px]">
            Completa los datos requeridos con precisión para iniciar tu solicitud de reembolso. Procesaremos tu pedido
            de forma segura y devolveremos el dinero a la cuenta de origen de manera eficiente y sin complicaciones.
          </p>
          <p className="w-full font-textFont text-[21px] font-light lg2:mx-auto lg2:max-w-[637px]">
            Introduce los datos exactamente como aparecen en el email recibido.
          </p>
        </div>
        <div className="flex w-full flex-col lg2:max-w-[792px] lg2:flex-row">
          <div className={`relative mt-10 hidden min-h-full w-[302px] flex items-center justify-center lg2:block mr-10 lg2:after:absolute lg2:after:right-[-20px] lg2:after:top-0 lg2:after:h-[400px] lg2:after:w-[1px] lg2:after:bg-buttonsLigth lg2:after:content-[''] ${isDark ? 'lg2:after:bg-darkText' : ''}`}>
            <Image
              src={regretsPc}
              alt="regretsPc"
              width={152}
              height={400}
              className="h-[400px] w-[152px] ml-[35px] mr-[40px] object-contain scale-x-[-1] drop-shadow-light dark:drop-shadow-darkmode"
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

          <div className="mt-10 flex h-full w-full max-w-[490px] flex-col items-center justify-center gap-4 border-0 lg2:ml-10 lg2:w-[490px]">
            <Form></Form>
            <div className="flex flex-row items-center justify-center gap-4">
                <ButtonBack route="/es/centro-de-ayuda" isDark={isDark} />
              <button
                type="submit"
                form="repentance-form"
                className={clsx(
                  'relative h-[44px] sm:h-[42px] lg:h-[48px] w-[474px] p-0 flex items-center justify-center rounded-3xl font-titleFont font-semibold text-[16px] leading-[20px] cursor-pointer transition-all duration-200',
                  isDark
                    ? 'border-darkText bg-darkText text-lightText hover:bg-darkText/90'
                    : 'border-buttonsLigth bg-buttonsLigth text-white hover:bg-buttonsLigth/90',
                  'disabled:border-disabledButtonsLigth disabled:bg-disabledButtonsLigth disabled:text-darkText dark:disabled:border-disabledButtonsDark dark:disabled:bg-disabledButtonsDark dark:disabled:text-darkText disabled:cursor-not-allowed'
                )}
              >
                Solicitar Reembolso
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepentanceForm;

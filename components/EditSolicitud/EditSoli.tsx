'use client';
import React from 'react';
import SeachRequest from './form/SeachRequest';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import HeaderSectionEditSoli from './HeaderSectionEditSoli/HeaderSectionEditSoli';
import Image from 'next/image';
import { EditorMobile, EditorPC } from '@/utils/assets/imgDatabaseCloudinary';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';

const EditSoli = () => {
  const { isDark } = useDarkTheme();

  return (
    <div className="my-[60px] lg2:my-[120px] w-full flex flex-col items-center justify-center px-4 md:px-8">
      <AnimatedBlurredCircles tope="top-[124px]" />
      <div className="flex w-full flex-col items-center lg2:gap-10">
        <div className="flex flex-col md:gap-7">
          <div className="size-[150px] w-full mx-auto flex flex-wrap justify-center md:hidden">
            <Image
              src={EditorMobile}
              alt="regretsPhone"
              width={140}
              height={150}
              className="h-full object-cover object-top drop-shadow-light dark:drop-shadow-darkmode"
            />
            <div
              className={`min-w-full flex-wrap justify-center border-t-2 lg2:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
            ></div>
          </div>
          <h1 className="mx-auto max-w-[506px] text-center font-titleFont text-3.5xl leading-[120%] md:text-[40px] font-medium md:max-w-[704px]">
            Modifica tu solicitud de forma rápida y sencilla
          </h1>
          <p className="mx-auto max-w-[679px] text-center font-textFont font-light lg2:max-w-[792px]">
            Ingresa el Número de Solicitud que aparece en tu comprobante para localizar y editar los detalles de tu
            solicitud de manera segura y eficiente. Asegúrate de verificar la información antes de guardar los cambios.
          </p>
          <p className="mt-2 md:mb-2 w-full font-textFont text-center font-light md:text-xl lg2:mx-auto">
            Introduce los datos exactamente como aparecen en el correo electrónico enviado.
          </p>
        </div>

        <div className="flex w-full flex-col md:max-w-[792px] md:flex-row md:items-center md:gap-4">
          <div className={`relative hidden min-h-full w-full max-w-fit items-center justify-center md:block`}>
            <Image
              src={EditorPC}
              alt="regretsPc"
              width={264}
              height={350}
              className=" object-contain"
            />
          </div>

          <div className="flex h-full w-full flex-col items-center justify-center gap-4 border-0">
            <SeachRequest />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSoli;

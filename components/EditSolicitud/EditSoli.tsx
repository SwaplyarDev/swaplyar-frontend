'use client';
import Image from 'next/image';
import React from 'react';
import { EditorMobile, EditorPC } from '@/utils/assets/img-database';
import SeachRequest from './form/SeachRequest';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';

const EditSoli = () => {
  const { isDark } = useDarkTheme();
  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <AnimatedBlurredCircles tope="top-[124px]" />
      <div className="flex w-auto flex-col lg:flex-row">
        <div className="flex flex-col flex-wrap content-center">
          <h1 className="w-full text-start text-3xl font-bold">Editar solicitud</h1>
          <p className="mt-2 text-justify text-lg font-bold">Ingrese los datos tal cual aparece en el email enviado</p>
          <div className="hidden flex-wrap lg:block">
            <Image
              src={EditorPC}
              alt="Imagen de Editor de solicitud de pc"
              width={1000}
              height={0}
              className="h-full object-cover"
            ></Image>
          </div>
          <div className="flex flex-col flex-wrap content-center">
            <div className="block flex min-h-full w-72 flex-wrap justify-center lg:hidden">
              <Image
                src={EditorMobile}
                alt="imagen del Editor de solicitud de mobile"
                width={200}
                height={0}
                className="h-full object-contain"
              />
              <div
                className={`block min-w-full flex-wrap justify-center border-t-4 lg:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
              ></div>
            </div>
            <div className="block w-72 flex-col items-start lg:hidden lg:w-2/6">
              <p className="mt-2 text-center text-lg">Ingresa los datos tal cual aparece en el email enviado</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`mr-0 flex h-auto w-full flex-col border-0 pt-32`}>
        <SeachRequest></SeachRequest>
      </div>
    </div>
  );
};

export default EditSoli;

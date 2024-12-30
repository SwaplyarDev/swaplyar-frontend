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
    <>
      <AnimatedBlurredCircles tope="top-[124px]" />
      <div className="mx-10 flex w-full flex-col justify-center gap-5 lg:flex-row">
        <div className="flex w-auto flex-col lg:flex-row">
          <div className="flex flex-col flex-wrap content-center px-0 md:px-10 lg:px-0">
            <h1 className="w-full text-start text-4xl font-bold">Editar solicitud</h1>
            <p className="mt-2 hidden w-80 text-justify text-xl font-bold lg:block">
              Ingrese los datos tal cual aparece en el email enviado
            </p>
            <div className="hidden flex-wrap lg:block">
              <Image
                src={EditorPC}
                alt="Imagen de Editor de solicitud de pc"
                width={1000}
                height={0}
                className="h-full object-cover"
              ></Image>
            </div>
            <div className="mt-5 flex flex-col flex-wrap content-center">
              <div className="block min-h-full w-full flex-wrap justify-center lg:hidden">
                <div className="flex items-center justify-center sm:gap-5">
                  <Image
                    src={EditorMobile}
                    alt="imagen del Editor de solicitud de mobile"
                    width={200}
                    height={0}
                    className="h-full object-contain"
                  />
                  <div className="hidden w-full flex-col items-center justify-center sm:flex">
                    <p className="mt-2 text-center text-lg">Ingresa los datos tal cual aparece en el email enviado</p>
                  </div>
                </div>
                <div
                  className={`block min-w-full flex-wrap justify-center border-t-4 lg:hidden ${isDark ? 'border-t-white' : 'border-t-buttonsLigth'}`}
                ></div>
              </div>
              <div className="flex w-full flex-col items-center sm:hidden sm:w-2/6">
                <p className="mt-2 w-72 text-center text-lg">Ingresa los datos tal cual aparece en el email enviado</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`mr-0 flex h-auto w-full flex-col border-0 lg:pt-32`}>
          <SeachRequest></SeachRequest>
        </div>
      </div>
    </>
  );
};

export default EditSoli;

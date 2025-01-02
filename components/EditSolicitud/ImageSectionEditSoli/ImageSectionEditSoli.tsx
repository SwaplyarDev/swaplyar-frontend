import React from 'react';
import Image from 'next/image';
import { EditorMobile, EditorPC } from '@/utils/assets/img-database';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const ImageSectionEditSoli = () => {
  const { isDark } = useDarkTheme();

  return (
    <>
      <div className="hidden flex-wrap lg:block">
        <Image
          src={EditorPC}
          alt="Imagen de Editor de solicitud de pc"
          width={1000}
          height={0}
          className="h-full object-cover"
        />
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
            className={`block min-w-full flex-wrap justify-center border-t-4 lg:hidden ${
              isDark ? 'border-t-white' : 'border-t-buttonsLigth'
            }`}
          ></div>
        </div>
        <div className="flex w-full flex-col items-center sm:hidden sm:w-2/6">
          <p className="mt-2 w-72 text-center text-lg">Ingresa los datos tal cual aparece en el email enviado</p>
        </div>
      </div>
    </>
  );
};

export default ImageSectionEditSoli;

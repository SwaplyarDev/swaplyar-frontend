import React from 'react';
import Image from 'next/image';
import { EditorMobile, EditorPC } from '@/utils/assets/img-database';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const ImageSectionEditSoli = () => {
  const { isDark } = useDarkTheme();

  return (
    <>
      <div className="hidden flex-wrap lg2:block">
        <Image
          src={EditorPC}
          alt="Imagen de Editor de solicitud de pc"
          width={1000}
          height={0}
          className="h-full object-cover"
        />
      </div>
      <div className="mt-5 flex w-full flex-col flex-wrap content-center">
        <div className="block min-h-full w-full max-w-[500px] flex-wrap justify-center lg2:hidden">
          <div className="flex w-full items-center justify-center sm:gap-5">
            <Image
              src={EditorMobile}
              alt="imagen del Editor de solicitud de mobile"
              width={200}
              height={0}
              className="h-full object-contain"
            />
          </div>
          <div
            className={`block min-w-full flex-wrap justify-center border-t-[1px] lg2:hidden ${
              isDark ? 'border-t-white' : 'border-t-buttonsLigth'
            }`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ImageSectionEditSoli;

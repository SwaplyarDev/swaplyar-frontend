import React from 'react';
import Image from 'next/image';
import { EditorMobile, EditorPC } from '@/utils/assets/imgDatabaseCloudinary';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const ImageSectionEditSoli = () => {
  const { isDark } = useDarkTheme();

  return (
    <>
      <div className="hidden lg2:flex lg2:justify-center lg2:items-center">
        <Image
          src={EditorPC}
          alt="Imagen de Editor de solicitud de pc"
          width={320}
          height={320}
          className="object-contain drop-shadow-light dark:drop-shadow-darkmode"
        />
      </div>
      <div className="mt-5 flex w-full flex-col flex-wrap content-center lg2:hidden">
        <div className="block min-h-full w-full max-w-[320px] flex-wrap justify-center">
          <div className="flex w-full items-center justify-center">
            <Image
              src={EditorMobile}
              alt="imagen del Editor de solicitud de mobile"
              width={200}
              height={200}
              className="object-contain drop-shadow-light dark:drop-shadow-darkmode"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageSectionEditSoli;

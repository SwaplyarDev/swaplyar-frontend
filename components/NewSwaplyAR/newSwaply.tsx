'use client';
import Link from 'next/link';
import React from 'react';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { FlyerGif } from '@/utils/assets/img-database';
import FlyerTrabajo from '../FlyerTrabajo/FlyerTrabajo';

const NewSwaply = () => {
  const isDark = useDarkTheme();
  return (
    <div>
      <div className="mt-10 text-center">
        <FlyerTrabajo imageSrc={FlyerGif}>
          <span className="">
            <p>¿Nuevo en SwaplyAr?</p>
            <p>
              Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma sencilla y segura. Haz
              click y aprende cómo usar SwaplyAr
            </p>
          </span>
          <div>
            <button
              id="bannerHTUButton"
              className={`trasntition-transform ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:border-selectBtsLight dark:border-darkText dark:bg-darkText dark:text-black ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <Link
                href={'/info/how-to-use'}
                className={`ease font-bold text-darkText transition-colors duration-300 ${isDark ? 'dark:text-lightText' : 'text'}`}
              >
                <h3>Como usar Swaplyar</h3>
              </Link>
            </button>
          </div>
        </FlyerTrabajo>
      </div>
    </div>
  );
};

export default NewSwaply;

'use client';

import React, { useEffect } from 'react';
import InfoBlock from '@/components/InfoBlock/InfoBlock';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import Link from 'next/link';
import ConversionInstructions from '../ui/Conversion-Instructions/ConversionInstructions';
import { FlyerGif, RecargaPaypal, UsdArs } from '@/utils/assets/imgDatabaseCloudinary';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import { useSystemStore } from '@/store/useSystemStore';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import LinkWithHover from '../ui/LinkWithHover/LinkWithHover';

export default function HomePage() {
  const resetToDefault = useSystemStore((state) => state.resetToDefault);

  useEffect(() => {
    resetToDefault();
  }, [resetToDefault]);

  const { isDark } = useDarkTheme();

  return (
    <main className="relative py-10">
      <AnimatedBlurredCircles tope="top-[-375px]" />
      <div className="w-full px-4 md:px-8 lg:px-4">
        <div className="m-auto flex w-full max-w-screen-phone flex-col items-center justify-center xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop">
          <div className="mt-8 flex w-full flex-col items-center justify-center">
            <ConversionInstructions />
          </div>
          <div className="relative mt-8 flex w-full items-center justify-center space-x-4">
            <InfoBlock
              title="Cambia USD o EUR de tu billetera virtual por la moneda de tu preferencia  con SwaplyAr"
              imageSrc={UsdArs}
              imageAlt="Cambia USD de PayPal por ARS"
              contentNode={
                <>
                  Realizá cambios de{' '}
                  <strong>
                    <LinkWithHover href="#">USD</LinkWithHover>
                  </strong>
                  ,{' '}
                  <strong>
                    <LinkWithHover href="#">EUR</LinkWithHover>
                  </strong>{' '}
                  o{' '}
                  <strong>
                    <LinkWithHover href="#">USDT</LinkWithHover>
                  </strong>{' '}
                  de tu billetera virtual a la moneda que necesitas de manera rápida y eficiente. Ofrecemos las mejores
                  tasas del mercado para que siempre maximices tus ganancias. Si necesitás transferir dinero desde{' '}
                  <strong>
                    <LinkWithHover href="#">PayPal</LinkWithHover>
                  </strong>
                  ,{' '}
                  <strong>
                    <LinkWithHover href="#">Payoneer</LinkWithHover>
                  </strong>
                  ,{' '}
                  <strong>
                    <LinkWithHover href="#">Wise</LinkWithHover>
                  </strong>
                  ,{' '}
                  <strong>
                    <LinkWithHover href="#">Pix</LinkWithHover>
                  </strong>
                  ,{' '}
                  <strong>
                    <LinkWithHover href="#">USDT</LinkWithHover>
                  </strong>
                  , o pesos Argentinos, lo depositamos directamente en tu cuenta bancaria local o internacional según
                  prefieras. Aumentá tus beneficios con{' '}
                  <strong>
                    <LinkWithHover href="#">SwaplyAr plus Rewards</LinkWithHover>
                  </strong>
                  .
                </>
              }
            />
            <InfoBlock
              title="Necesitás recargar tu cuenta de PayPal en USD o EUR, fácilmente en SwaplyAr tenés la solución"
              imageSrc={RecargaPaypal}
              imageAlt="Recarga PayPal"
              contentNode={
                <>
                  Es tan simple de colocar el monto que deseas en la calculadora en que{' '}
                  <strong>
                    <LinkWithHover href="#">Billetera Virtual</LinkWithHover>
                  </strong>{' '}
                  deseas el dinero, rellenar la solicitud y realizar el pago correspondiente y en menos de 15 minutos
                  procederemos con la transacción de manera rápida y segura. También nos puedes escribir a nuestro{' '}
                  <strong>
                    <LinkWithHover href="#">WhatsApp</LinkWithHover>
                  </strong>{' '}
                  y responderemos cualquier duda que tengas.
                </>
              }
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <FlyerTrabajo imageSrc={FlyerGif}>
          <p>
            ¿Nuevo en SwaplyAr? <br /> Conoce cómo funciona nuestra plataforma y comienza a transferir dinero de forma
            sencilla y segura.{' '}
          </p>
          <div>
            <button
              id="bannerHTUButton"
              className={`ease group mt-6 rounded-full border-2 border-buttonsLigth bg-buttonsLigth px-4 py-2 text-lg duration-300 hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-black ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <Link
                href={'/info/how-to-use'}
                className={`ease font-bold text-darkText transition-colors duration-300 ${isDark ? 'dark:text-lightText' : 'text'} `}
              >
                ¡Empieza ahora!
              </Link>
            </button>
          </div>
        </FlyerTrabajo>
      </div>
    </main>
  );
}

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
    <>
      <AnimatedBlurredCircles tope="top-[-375px]" />
      <section className="w-full px-4 md:px-8 lg:px-4">
        <article className="m-auto flex w-full max-w-screen-phone flex-col items-center justify-center xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop">
          <div className="mt-0 flex w-full flex-col items-center justify-center lg:mt-8">
            <ConversionInstructions />
          </div>
          <div className="relative mt-8 flex w-full max-w-[850px] flex-col items-center justify-center space-x-4">
            <InfoBlock
              title="Podes cambiar USD o EUR de tu billetera virtual por la moneda de tu preferencia"
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
              title="Te ayudamos a recargar tu cuenta de Paypal en USD o EUR"
              imageSrc={RecargaPaypal}
              imageAlt="Recarga PayPal"
              contentNode={
                <>
                  Es tan simple que lo podes hacer en tres pasos. Colocas el monto que deseas en la calculadora,
                  seleccionas en que Billetera Virtual deseas el dinero, rellenas la solicitud, realizas el pago
                  correspondiente y en menos de 15 minutos procederemos con la transacción de manera rápida y segura.
                  También nos podes escribir a nuestro WhatsApp y responderemos cualquier duda que tengas a la brevedad.
                </>
              }
            />
            <InfoBlock
              title="¿Buscas un intercambio seguro y rápido para tu dinero?"
              imageSrc={RecargaPaypal}
              imageAlt="Recarga PayPal"
              contentNode={
                <>
                  En SwaplyAr, ayudamos a freelancers y trabajadores remotos a cambiar sus pagos desde su billetera
                  virtual y/o criptomonedas de forma rápida, segura y con un tipo de cambio competitivo, a su moneda
                  local.
                  <br /> <br /> Sabemos lo importante que es recibir tu dinero sin complicaciones, por eso ofrecemos un
                  servicio transparente y confiable, eliminando los riesgos de estafas y demoras en transferencias a tu
                  banco local.
                  <br /> <br /> Tu tranquilidad y seguridad son nuestra prioridad.
                </>
              }
            />
          </div>
        </article>
      </section>
      <section className="mt-10">
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
      </section>
    </>
  );
}

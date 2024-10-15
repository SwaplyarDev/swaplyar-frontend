'use client';
import { useState, useEffect, useRef } from 'react';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import ContactForm from '@/components/ui/contact-form/ContactForm';
import {
  Ayuda1,
  Ayuda2,
  CentroDeAyuda,
  Contacto,
  PlusRewards,
  PlusRewardsDark,
  Ayuda1Dark,
  Ayuda2Dark,
} from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const HelpCenterPage = () => {
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);
  const { isDark } = useDarkTheme();

  return (
    <>
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        Estamos trabajando en las funciones de inicio de sesión y registro.
      </FlyerTrabajo>
      <main className="relative flex w-full flex-col items-center justify-center gap-20 py-10">
        <AnimatedBlurredCircles tope="top-[-360px]" />
        <div
          className="mx-auto grid max-w-[1000px] gap-12"
          style={{ margin: currentMargin }}
        >
          <section className="rs-wrapper-v4 p-4">
            <h1 className="text-center text-3xl font-bold md:text-left">
              Bienvenido al Centro de Ayuda de SwaplyAr
            </h1>
            <h3 className="text-xl">
              Comunicate con nosotros y responderemos cualquier consulta que
              tengas
            </h3>
          </section>

          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <span>
              <ContactForm />
            </span>

            <span className="flex items-center justify-center">
              <Image
                src={Contacto}
                alt="Contáctanos"
                width={400}
                height={300}
              />
            </span>
          </section>

          <section className="rs-wrapper-v4 grid grid-cols-1 gap-8 md:grid-cols-2">
            <span className="flex items-center justify-center">
              <Image
                // src={PlusRewards}
                src="/images/plus-rewards.png"
                alt="SwaplyAr Plus Rewards™"
                width={400}
                height={300}
                className="inline-block dark:hidden"
              />
              <Image
                src={PlusRewardsDark}
                alt="SwaplyAr Plus Rewards™ tema oscuro"
                width={400}
                height={300}
                className="hidden dark:inline-block"
              />
            </span>
            <span className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold">
                SwaplyAr Plus Rewards™ premia tu fidelidad, con el programa de
                fidelización
              </h2>
              <h5 className="mt-4 text-left text-lg md:text-center">
                Obtené beneficios exclusivos cada vez que realices un cambio de
                divisas con SwaplyAr Plus Rewards™.
              </h5>
              <button
                onClick={() =>
                  (window.location.href = 'programa-de-fidelizacion')
                }
                className={`dark:hover:bg- relative m-1 mt-4 h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 text-white hover:bg-buttonsLigth dark:border-darkText dark:bg-darkText dark:text-lightText ${isDark ? 'buttonSecondDark' : 'buttonSecond'} `}
              >
                Plus Rewards™
              </button>
            </span>
          </section>

          <section className="rs-wrapper-v4 grid grid-cols-1 gap-8 md:grid-cols-2">
            <span className="card-rawe flex flex-col rounded bg-gray-100 p-4 dark:bg-graytyc">
              <Image
                src={Ayuda1}
                alt="paso 1 de como cambiar tu dinero en SwaplyAr"
                width={210}
                height={150}
                className="inline-block dark:hidden"
              />
              <Image
                src={Ayuda1Dark}
                alt="paso 1 de como cambiar tu dinero en SwaplyAr tema oscuro"
                width={210}
                height={150}
                className="hidden dark:inline-block"
              />
              <h3 className="text-xl font-bold">Chateá con nosotros</h3>
              <div className="flex h-full flex-col justify-between">
                <p className="text-lg">
                  Comunicate con nuestro representante de Atención al Cliente
                  para recibir ayuda.
                </p>
                <p className="text-lg">
                  <LinkWithHover href="https://wa.me/+5491123832198">
                    WhatsApp.
                  </LinkWithHover>
                </p>
              </div>
            </span>
            <span className="card-rawe flex flex-col rounded bg-gray-100 p-4 dark:bg-graytyc">
              <Image
                src={Ayuda2}
                alt="paso 2 de como cambiar tu dinero en SwaplyAr"
                width={210}
                height={150}
                className="inline-block dark:hidden"
              />
              <Image
                src={Ayuda2Dark}
                alt="paso 2 de como cambiar tu dinero en SwaplyAr tema oscuro"
                width={210}
                height={150}
                className="hidden dark:inline-block"
              />
              <h3 className="text-xl font-bold">Otro motivo...</h3>
              <div className="flex flex-col justify-between">
                <p className="text-lg">
                  Si necesitás contactarnos por otro motivo, simplemente
                  envianos un email y atenderemos tu solicitud.
                </p>
                <p className="text-lg">
                  <LinkWithHover href="mailto:centrodeayuda@swaplyar.com">
                    Email.
                  </LinkWithHover>
                </p>
              </div>
            </span>
          </section>
        </div>
      </main>
      <FlyerTrabajo imageSrc={CentroDeAyuda}>
        <></>
      </FlyerTrabajo>
    </>
  );
};

export default HelpCenterPage;

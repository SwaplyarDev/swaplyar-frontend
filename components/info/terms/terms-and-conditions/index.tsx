'use client';
import React from 'react';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import { TerminosCondiciones } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { sectionTermsAndConditions } from '@/data/sectionTermsAndConditions';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="relative mx-auto lg:mt-[55px] flex w-[clamp(320px,92vw,1026px)] max-w-screen-xl flex-col items-center py-10 text-custom-grayD px-4 md:px-8">
      <AnimatedBlurredCircles tope="top-[-1675px]" />

      <section className="flex flex-col items-center md:flex-row md:items-center lg:items-center gap-2 w-full">
        <h1 className="flex-1 text-center max-w-[592px] w-full md:w-auto font-titleFont text-[28px] md:text-[40px] font-medium dark:text-darkText md:leading-tight">
          Términos y condiciones de uso y navegación del sitio SwaplyAr
        </h1>

        <Image
          className="hero-img mt-4 mx-auto hidden md:block w-full max-w-[401px] h-auto drop-shadow-light dark:drop-shadow-darkmode"
          src={TerminosCondiciones}
          alt="terminos-y-condiciones"
          width={401}
          height={385}
        />
      </section>

      <section className="mt-[40px] lg:mb-[60px] mb-0 flex flex-col gap-6 w-full">
        {sectionTermsAndConditions.map((item, i: number) => {
          const divideTitle = item.title.split('.');

          return (
            <section
              key={i}
              className="w-full md:max-w-[900px] mx-auto rounded-lg bg-custom-whiteD-900 p-4 shadow-md dark:bg-graytyc dark:text-darkText"
            >
              <h2 className="font-textFont text-[28px]">
                {divideTitle[0]}. <span className="text-4xl">{divideTitle[1]}</span>
              </h2>

              <p className="mt-4 indent-6 font-textFont font-light">
                {item.text.includes('Política de Privacidad') ? (
                  <>
                    {item.text.split('Política de Privacidad')[0]}
                    <LinkWithHover href="/politica-de-privacidad">Política de Privacidad</LinkWithHover>
                  </>
                ) : item.text.includes('Dirección General de Defensa y Protección al Consumidor.') ? (
                  <>
                    {item.text.split('Dirección General de Defensa y Protección al Consumidor.')[0]}
                    <LinkWithHover href="https://buenosaires.gob.ar/defensaconsumidor/direccion-general">
                      Dirección General de Defensa y Protección al Consumidor.
                    </LinkWithHover>
                  </>
                ) : (
                  item.text
                )}
              </p>

              {item.listLetters && (
                <div className="font-textFont font-light">
                  {item.listLetters.map((line, idx: number) => (
                    <p key={idx} className="indent-2">
                      {line}
                    </p>
                  ))}
                </div>
              )}

              {item.secondText && (
                <p className="mt-6 indent-6 font-textFont font-light">
                  {item.secondText.includes('centrodeayuda@swaplyar.com') ? (
                    <>
                      {item.secondText.split('centrodeayuda@swaplyar.com')[0]}
                      <LinkWithHover href="mailto:info@swaplyar.com">centrodeayuda@swaplyar.com</LinkWithHover>
                    </>
                  ) : item.secondText.includes('infodnpdp@just.gov.ar') ? (
                    <>
                      {item.secondText.split('infodnpdp@just.gov.ar')[0]}
                      <LinkWithHover href="https://www.argentina.gob.ar/aaip/datospersonales">
                        infodnpdp@just.gov.ar
                      </LinkWithHover>
                    </>
                  ) : (
                    item.secondText
                  )}
                </p>
              )}

              {item.list && (
                <ul className="mt-6 list-disc pl-4 font-textFont font-light">
                  {item.list.map((li, idx: number) => (
                    <li key={idx}>
                      {li.includes('Email:') ? (
                        <>
                          Email:{' '}
                          <LinkWithHover href="mailto:info@swaplyar.com">centrodeayuda@swaplyar.com</LinkWithHover>
                        </>
                      ) : li.includes('Plataforma de soporte:') ? (
                        <>
                          Plataforma de soporte:{' '}
                          <LinkWithHover href="/es/centro-de-ayuda">swaplyar.com/es/centro-de-ayuda</LinkWithHover>
                        </>
                      ) : (
                        li
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {item.thirdText && <p className="mt-6 indent-6 font-textFont font-light">{item.thirdText}</p>}
              {item.fourthText && <p className="mt-6 indent-6 font-textFont font-light">{item.fourthText}</p>}
              {item.fifthText && <p className="mt-6 indent-6 font-textFont font-light">{item.fifthText}</p>}
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default TermsAndConditions;
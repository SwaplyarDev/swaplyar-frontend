'use client';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import { TerminosCondiciones } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { sectionTermsAndConditions } from '@/data/sectionTermsAndConditions';
import { useLocalizedPath } from '@/i18n/useLocalizedPath';

const TermsAndConditions = () => {
  const getPath = useLocalizedPath();

  return (
    <div className="relative mx-auto flex max-w-[1000px] flex-col items-center px-4 py-10 text-custom-grayD md:px-8 lg:px-4">
      <AnimatedBlurredCircles tope="top-[-1675px]" />
      <section className="flex flex-col items-center md:flex-row md:items-start lg:items-center">
        <h1 className="flex-1 text-center font-titleFont text-[38px] font-medium dark:text-darkText lg:text-[40px]">
          Términos y Condiciones de Uso y Navegación del Sitio SwaplyAr
        </h1>
        <Image
          className="hero-img mt-4 h-[358px] w-[358px] drop-shadow-light dark:drop-shadow-darkmode md:h-[331px] md:w-[331px]"
          src={TerminosCondiciones}
          alt="terminos-y-condiciones"
          width={358}
          height={358}
        />
      </section>

      <section className="mt-[40px] flex flex-col gap-6">
        {sectionTermsAndConditions.map((item, i: number) => {
          const divideTitle = item.title.split('.');

          return (
            <section
              key={i}
              className="rounded-lg bg-custom-whiteD-900 p-[10px] shadow-md dark:bg-graytyc dark:text-darkText"
            >
              <h2 className="font-textFont text-[28px]">
                {divideTitle[0]}. <span className="text-4xl">{divideTitle[1]}</span>
              </h2>
              <p className="mt-4 indent-6 font-textFont font-light">
                {item.text.includes('Política de Privacidad') ? (
                  <>
                    {item.text.split('Política de Privacidad')[0]}
                    <LinkWithHover href={getPath('termsAndConditions')}>Política de Privacidad</LinkWithHover>
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
                  {item.listLetters.map((item, i: number) => {
                    return (
                      <p key={i} className="indent-2">
                        {item}
                      </p>
                    );
                  })}
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
                  {item.list.map((item, i: number) => (
                    <li key={i}>
                      {item.includes('Email:') ? (
                        <>
                          Email:{' '}
                          <LinkWithHover href="mailto:info@swaplyar.com">centrodeayuda@swaplyar.com</LinkWithHover>
                        </>
                      ) : item.includes('Plataforma de soporte:') ? (
                        <>
                          Plataforma de soporte:{' '}
                          <LinkWithHover href={getPath('helpCenter')}>swaplyar.com/info/help-center</LinkWithHover>
                        </>
                      ) : (
                        item
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

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MdDownloadForOffline } from 'react-icons/md';
import { useDarkTheme } from '../../../ui/theme-Provider/themeProvider';
import LinkWithHover from '@/components/ui/LinkWithHover/LinkWithHover';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { sectionTermsAndConditionsPlus } from '@/data/sectionTermsAndConditions';

const SaprTermsConditions = () => {
  const { isDark } = useDarkTheme();

  return (
    <div className="relative mx-auto flex max-w-[1000px] flex-col items-center px-4 py-10 text-custom-grayD dark:text-darkText md:px-8 lg:px-4">
      <AnimatedBlurredCircles tope="top-[-1675px]" />
      <section className="flex flex-col items-center md:flex-row md:items-start lg:items-center">
        <h1 className="flex-1 text-center font-titleFont text-[38px] font-medium lg:text-[40px]">
          Términos y Condiciones de Programa de Fidelización
        </h1>
        <Image
          className="hero-img mt-4 h-[179px] w-[332px] lg:h-[205px] lg:w-[380px]"
          src={`${isDark ? '/images/tycDark.png' : '/images/tycLight.png'}`}
          alt="terminos-y-condiciones"
          width={332}
          height={179}
        />
      </section>

      <section className="mt-[40px] w-full max-w-[1000px]">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-1">
          <section>
            {sectionTermsAndConditionsPlus.map((item, i: number) => {
              const divideTitle = item.title.split('.');

              return (
                <div
                  key={i}
                  className="mt-6 rounded-lg bg-inputDark p-[10px] shadow-md dark:bg-[#4b4b4b] dark:text-darkText"
                >
                  <h2 className="font-textFont text-[28px]">
                    {divideTitle[0]}. <span className="text-4xl">{divideTitle[1]}</span>
                  </h2>
                  {item.listLetters && (
                    <div>
                      {item.listLetters.map((item, i: number) => (
                        <div key={i} className="mt-4 font-textFont font-light">
                          <h2 className="indent-6">{item.title}</h2>
                          <p>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="mt-6 indent-6 font-textFont font-light">
                    {item.text &&
                      item.text
                        .split(/(swaplyar\.com\/info\/help-center|WhatsApp|centrodeayuda@swaplyar\.com)/)
                        .map((item, i: number) =>
                          item === 'swaplyar.com/es/centro-de-ayuda' ? (
                            <LinkWithHover key={i} href="/es/centro-de-ayuda">
                              swaplyar.com/es/centro-de-ayuda
                            </LinkWithHover>
                          ) : item === 'WhatsApp' ? (
                            <LinkWithHover key={i} href="https://wa.me/+5491123832198">
                              WhatsApp
                            </LinkWithHover>
                          ) : item === 'centrodeayuda@swaplyar.com' ? (
                            <LinkWithHover key={i} href="mailto:info@swaplyar.com">
                              centrodeayuda@swaplyar.com
                            </LinkWithHover>
                          ) : (
                            item
                          ),
                        )}
                  </p>
                </div>
              );
            })}
          </section>

          <div className="mb-4 flex justify-center">
            <Link
              href="https://swaplyar.com/SAPR-Terms-Conditions-ES%20.pdf"
              target="_blank"
              className={`relative m-1 flex h-[48px] items-center justify-center rounded-3xl border border-buttonsLigth px-[17px] py-[5px] font-titleFont font-semibold text-buttonsLigth dark:border-darkText dark:text-darkText ${isDark ? 'buttonSecondDark' : 'buttonSecond'}`}
            >
              <MdDownloadForOffline className="h-[38px] w-[38px]" />
              <h3>Descargar Términos</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SaprTermsConditions;

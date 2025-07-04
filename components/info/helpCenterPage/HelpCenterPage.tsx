'use client';
import ContactForm from '@/components/ui/contact-form/ContactForm';
import Image from 'next/image';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Link from 'next/link';
import { sectionBottomHelpCenter, sectionLinksHelpCenter } from '@/data/sectionHelpCenter';
import clsx from 'clsx';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import { FlyerGif } from '@/utils/assets/imgDatabaseCloudinary';

const HelpCenterPage = () => {
  const { isDark } = useDarkTheme();

  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center gap-20 px-4 py-10 md:px-8 lg:px-4">
        <AnimatedBlurredCircles tope="top-[-260px]" />
        <div>
          <div className="mx-auto max-w-[490px] lg2:max-w-[1204px]">
            <h1 className="mx-auto max-w-[592px] text-center font-titleFont text-[38px] font-medium lg2:text-[40px]">
              Bienvenido al Centro de Ayuda de SwaplyAr
            </h1>
            <div className="mt-10 flex flex-col gap-[31px] lg2:flex-row lg2:px-4">
              {sectionLinksHelpCenter.map((item, i: number) => (
                <Link
                  key={i}
                  href={item.href}
                  className="group relative flex flex-1 flex-col items-center lg2:after:absolute lg2:after:-right-4 lg2:after:h-full lg2:after:w-[1px] lg2:after:bg-buttonsLigth lg2:after:content-[''] lg2:after:last:hidden lg2:after:dark:bg-darkText"
                >
                  <Image
                    className="drop-shadow-light dark:drop-shadow-darkmode"
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                  />
                  <h2
                    className={clsx(
                      'w-full border-t-[1px] text-center font-textFont text-[28px] transition-all duration-300',
                      isDark
                        ? 'border-darkText group-hover:underline'
                        : 'border-buttonsLigth group-hover:text-buttonsLigth group-hover:underline',
                    )}
                  >
                    {item.title}
                  </h2>
                  <p className="text-center font-textFont font-light">{item.text}</p>
                </Link>
              ))}
            </div>
            <div className="mt-20 flex flex-col text-center font-textFont lg2:flex-row lg2:items-center lg2:justify-center lg2:gap-4">
              <p className="font-light">¿Sospechas que eres víctima de un fraude?</p>
              <Link
                href="/es/centro-de-ayuda/prevencion-y-fraude"
                className="block text-[28px] text-buttonsLigth underline dark:text-darkText"
              >
                obtén información aquí
              </Link>
            </div>
          </div>
          <section className="mx-auto mt-20 flex max-w-[996px] flex-col items-center">
            <ContactForm />
          </section>
          <div className="mx-auto mt-10 flex max-w-[918px] flex-col items-center gap-2 md:flex-row">
            <Image
              className="h-[320px] w-[332px] object-cover drop-shadow-light dark:drop-shadow-darkmode lg2:h-[386px] lg2:w-[388px]"
              src={isDark ? '/images/helpCenter4Dark.png' : '/images/helpCenter4.png'}
              alt="Imagen de SwaplyAr Plus Rewards"
              width={360}
              height={270}
            />
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-center font-textFont text-[36px]">
                SwaplyAr Plus Rewards™ premia tu fidelidad, con el programa de fidelización
              </h2>
              <p className="font-textFont font-light">
                Obtené beneficios exclusivos cada vez que realices un cambio de divisas con SwaplyAr Plus Rewards™.
              </p>
              <Link
                href="/es/programa-de-fidelizacion"
                className={clsx(
                  isDark
                    ? 'buttonSecondDark border-darkText bg-darkText dark:text-lightText'
                    : 'buttonSecond border-buttonsLigth bg-buttonsLigth',
                  'relative flex w-[300px] items-center justify-center rounded-3xl border px-[14px] py-3 font-titleFont font-semibold text-darkText',
                )}
              >
                Plus Rewards
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-10 flex max-w-[490px] flex-col gap-10 lg2:max-w-[989px] lg2:flex-row">
            {sectionBottomHelpCenter.map((item, i: number) => (
              <Link key={i} href={item.href} target="_blank" className="group flex flex-1 flex-col items-center gap-2">
                <Image
                  className="h-[250px] w-[320px] drop-shadow-light dark:drop-shadow-darkmode md:h-[347px] md:object-contain"
                  src={item.image}
                  alt={item.title}
                  width={320}
                  height={270}
                />
                <div className="flex flex-col items-center gap-2">
                  <h2
                    className={clsx(
                      'text-center font-textFont text-[28px] transition-all duration-300',
                      isDark ? 'group-hover:underline' : 'group-hover:text-buttonsLigth group-hover:underline',
                    )}
                  >
                    {item.title}
                  </h2>
                  <p className="font-textFont font-light">{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <section className="hidden md:block">
        <FlyerTrabajo
          imageSrc={FlyerGif}
          description="Encontrá respuestas a tus dudas"
          nameButton="Preguntas frecuentes"
          href="/es/centro-de-ayuda/preguntas-frecuentes"
        />
      </section>
    </>
  );
};

export default HelpCenterPage;
